---
title: "Cloud Native: Upgrading a Workflow Engine or Orchestrator"
date: 2017-10-17T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Cloud Native: Upgrading a Workflow Engine or Orchestrator"
signoff: Dave
categories:
- Cloud Native
tags:
- Cloud Native
---

On a train this morning, I read [Ivan Pepelnjak’s Twitter stream](https://twitter.com/ioshints) (because what else is there to do whilst relaxing with a coffee?), I came across this blog post on [upgrading virtual-appliances](http://blog.ipspace.net/2017/10/upgrading-virtual-appliances.html).

Couldn’t agree more with the approach, but what about upgrading a workflow engine or orchestrator? I’ll call this entity a ‘wfeo’ just to make typing this article easier.

The perceived turmoil in undertaking this kind of an upgrade task is enough to make new born babies cry. Fear not. Any half decent wfeo contains it’s gubbins (workflows, drivers, logic, data) in a portable and logical data structure.

Taking [StackStorm](https://stackstorm.com/) as an example, each integration (official parlance; ‘pack’), is arranged into a set of directories.
Within each directory are more directories with special names and a set of files like READMEs, configuration schemas and pack information. These top level directories that contain the pack, are portable between install bases of StackStorm giving us the power to easily clone installations, repair logic in case of a troubled upgrade and install logic freshly for new installations.

As with any platform, some syntax might change so always read the release notes for the platform and packs.

Ivan’s point is that you do not treat virtual appliances as special creatures because they are not.

So when it comes to our wfeos, what do we do? We could upgrade or we could just install the new version and port our logic across.

Going for the upgrade route (if you cannot easily just re-deploy a new virtual-machine), our portable logic provides us a safety net to re-install if it goes wrong.
If you can deploy a new virtual-machine, then this is the cleanest route. Simply deploy, copy your logic across (contained in a pack), install the packs that your logic depends on and configure them.

There is one advantage to upgrading wfeos that you do not have with virtual network appliances. That is they deal with the control-plane and you can test them easily before making them live.
The hardest bit is bringing the new wfeo into production. That could be just changing an IP address or DNS record when you’re ready, then pushing the old one to rapidly available storage once you are happy that things are behaving correctly ~~in case it all goes wrong~~.

Workflow engines and orchestrators are no different to any other virtual network appliance or virtual network function (VNF), so don’t treat them any differently.

Using Ivan’s closing statement, go through the process once, then automate it!