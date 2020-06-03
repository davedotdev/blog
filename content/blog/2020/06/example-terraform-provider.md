---
title: "Terraform Example Provider"
date: 2020-06-03T11:00:00+00:00
image: images/blog/terraform_go_header.png
author: David Gee
description: "An example Terraform provider to test combinations of input variables."
signoff: Dave
categories: 
- Software Design
- Terraform
- IaaC
tags:
- Terraform
- IaaC
---

A requirement came up to extract a schema from a Terraform provider in JSON, which Terraform offers as a native feature as of version 0.12.12. From that schema, the task is to then generate a ‘canonical example’ of a `x.json.tf` file for example usage. That meant creating a TF Schema JSON walker that in turn, creates a tree with arbitrary data that can be serialised in JSON. More on that in a different post.

In order to create the walker and ensure it covers every type of value, I started looking at the more complex Terraform providers and started with AWS. After spending thirty minutes or so on this task, I decided using an existing provider was too much trouble and decided to write a skeleton provider that exercises every kind of of input value, which can be listed as:

- set
- map
- list
- string
- int
- float

You can also nest these types and so, this becomes a tree recursion challenge due to unknown depths. This project helped me create my arbitrary JSON generator algorithm from the Terraform schemas and logic dictates, if this provider exercises every combination possible with multiple depths, it's proof that my algorithm works.

Anyway, these schema types live in the Go code for the Provider schema itself. [Here is a link](https://github.com/davedotdev/canonicaltfprovider/blob/master/resource_canonical.go#L52) to a code blob showing this.

I figured a skeleton provider that doesn’t do anything, but exercises inputs is a great start to make sure my walker logic is sound! You can also create a `x.json.tf` file and feed it into the provider to validate your JSON config. Just to say it one more time, this provider doesn’t do anything other than demonstrate the kinds of input keys and values and combinations that are possible. A `terraform plan` therefore won’t work, but a `terraform validate` absolutely will.

#### Programmatic Handling with Terraform

Dealing with Terraform programmatically is possible via a couple of ways; one using the provider API mechanism (gRPC) directly and the other, interacting with the `terraform` binary and passing flags so that output data is JSONified. If you're interested in driving the providers directly without Terraform, [here is a link](https://github.com/hashicorp/terraform/tree/master/docs/plugin-protocol) which may help you. This one is also useful perhaps for some projects where you do not want to reinvent the wheel. My use case also requires Terraform’s graphing capability, so interacting with the providers directly isn’t of value. 

My skeleton project includes the provider code (based on the old SDK, I need to update this) and an example input config file for the provider itself. I'm sharing here because it might be useful for one other person on the planet.

```bash
# Usage instructions
git clone https://github.com/davedotdev/canonicaltfprovider.git

cd ./canonicaltfprovider

go mod download

source build.sh

terraform validate
```

The `build.sh` file also does the `terraform init` (if you thought it was odd it was missing). The `example.tf.json` file is then validated against the provider that was created from the `build.sh` script.

Enjoy.
