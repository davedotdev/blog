---
title: "Handling Commits in Terraform"
date: 2021-11-29T02:00:00+00:00
image: images/blog/graphops_header.png
author: David Gee
description: "How to handle commits in Terraform"
signoff: Dave
mermaid: true
categories: 
- IaC
tags:
- IaC
- Operations
- GraphOps
---

Since 2018, I've been working in the guts of Terraform, trying to find wide encompassing ways of building providers for Junos. Back then I hand wrote a simple provider, put it on a browser-based cloud lab (NRElabs) and worked with Juniper engineering to find a solution to automatically build providers from YANG models.

### Dealing with Commits

Junos like other network operating systems has the notion of a commit-based approach to making configuration additions, changes and deletions. In a hyper-media API like REST, the API RPC is encapsulated with a beginning and end. When you post a resource, you don't have to go back with an ID and tell the post to commit to a data store. It normally just happens for a single resource. Anyone building back-ends to front-ends knows this. Networking doesn't *normally* follow this paradigm, however. Whether the user interacts with the network element via REST, CLI or NETCONF (some API - yes, even the CLI is considered an API), what happens is this:

1.  The user performs a move/add/deletion
2.  Junos creates a candidate configuration in memory
3.  The candidate contains the data wrapped by the operator (add data, remove data, change data etc)
    1.  The underlying data model presents a structured API, so any RPC must match the pattern the API is expecting
    2.  Junos will manipulate the candidate data tree appropriately depending on the data and operator
4.  After one or more Create/Read/Update/Delete transactions, the operator will finalise the desired state by issuing a commit.
5.  Junos merges the candidate with the non-volatile configuration inside the datastore
    1.  This configuration is now activated and has an effect on the network element. This could be bringing up a new interface etc.
    2.  If there are any errors, the commit RPC will fail, however the candidate config will remain in memory
    3.  Upon failure, the expectation is for any issue to be resolved by the user, or for the candidate to be blown away

Terraform doesn't have any concept of commits. It wasn't designed for them and so, you have a couple of options:

1.  Push a PR to Terraform leaking through events like a graph exit event into the CRUD functions for each implementation of a resource in each provider. This is ugly and like smashing an egg with a brick. I know, because I did this on a fork, and it was messy. Brick meeting egg was a regret.
2.  Handle commits as resources with dependencies.

The latter is where I went for Junos. The idea is that each provider generated has two types of commit resources, a `create commit` and a `destroy commit`. The commits do nothing more than set an id in the local Terraform state and perform an RPC on the network element. 

Each commit resource can be described as such:
1.  The `create commit` CRUD functions are empty, barring the Create function sets the local ID of the commit and runs the remote RPC commit on the network element.
2.  The `destroy commit` CRUD functions are empty, barring the Delete function runs the remote commit RPC.

This positive and negative logic enables commits to happen on `apply` and `destroy` phases within Terraform.

It's essential you handle the ordering of commits properly. If you trigger a commit at the wrong time, then you've done nothing but cause chaos. We use `depends_on` with modules to ensure that a commit is triggered at the right part in the DAG (Directional Acyclic Graph) that is formed in memory when Terraform runs.

{{<mermaid>}}
flowchart TD;
  id1(["resource: create commit"]) --> | depends_on| id2
  id2(["module: with resources"]) --> | depends_on | id3
  id3(["resource: destroy commit"])
{{</mermaid>}}

The order of events when Terraform apply is executed:

1.  The `destroy_commit` resource Create function is executed. All we do is set the local state id to make Terrform believe something happened.
2.  All of the create functions are executed for any resources contained in the Terraform HCL module. There might be other `depends_on` dependencies in that module. Despite Junos accepting an unordered list of resources, it might make sense to put guard rails on some of the resources. For instance, an `irb` interface might rely on a `vlan`. Good to put that dependency there; think belts and braces etc.
3.  After the DAG for the module is complete within Terraform, the `create commit` Create function is executed, in which the local Terraform state id is set and the remote RPC for commit is executed.

The remote state now looks like the local state and even better, Terraform reads the remote state and compares it to the local state. If there is an issue, we know before Terraform exits. This can alleviate the need to have extra management-plane tests because Terraform has already checked that the new configuration is in place (at the management-plane level).

The order of events when Terraform destroy is executed:

{{<mermaid>}}
flowchart TD;
  id1(["resource: destroy commit"]) --> | depends_on| id2
  id2(["module: with resources"]) --> | depends_on | id3
  id3(["resource: create commit"])
{{</mermaid>}}

1. The `create commit` resource Delete function is executed. Nothing happens to the network element, but the local state (id) for the commit previously set by Terraform is deleted.
2. The resources contained inside the Terraform HCL module have their Delete functions invoked. All of the local state is removed, and the remote candidate has delete markers placed on each configuration group (containing the remote state). Note, no commits happen here, this is purely to the remote candidate config.
3. The `destroy commit` resource Delete function is executed. The local state (id) for the commit previously set by Terraform is deleted and a commit RPC is called on the remote network element. 

## What about resource deletions or updates?

Ahhh, mutability, our old friend. IaC is great, but massively assumes we're doing lots of immutable infrastructure. Networking devices are rarely immutable, and we need to make changes weekly, daily or hourly.

An issue is raised when you want to modify or delete one or more resources in a Terraform module. One graceful way is to taint the `create commit` resource using the Terraform command `terraform taint $terraform_resource.address`. When terraform apply is ran after the taint, the commit is automatically applied. Seeing as you're mutating the state anyway, if you forget the commit, no big deal. Just taint the resource/s you just modified and the commit, re-run Terraform and you're fine. That assumes you check the network operating system for signs of a commit!

## Conclusion

To solve this problem longer term, I believe we need a feature in Terraform I've vaguely called `auto_taint` which if a dependency is marked as changed, then the resource that is upstream will automatically be tainted. Here is the reference on GitHub: https://github.com/hashicorp/terraform/issues/30045 

You can see an example Terraform module using the commit approach for Junos here: https://github.com/Juniper/junos-terraform/tree/master/Samples/tf_module_template/module 
