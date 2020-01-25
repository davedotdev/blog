---
title: "OpenStack Summit, Tokyo 2015, Thursday 29th – Show Notes"
date: 2015-11-03T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "OpenStack Summit, Tokyo 2015, Thursday 29th – Show Notes"
signoff: Dave
categories:
- OpenStack
tags:
- OpenStack
---

It’s Thursday, it’s 9am and…straight in to sessions. No keynote today, which is no bad thing considering these days are long!

The previous two days have consumed a huge amount of hours from sessions, keynotes and side meetings, some planned and some impromptu. This event really is the place to be if you want to speak to industry figure heads representing both vendors and consumers.

It was great to wander the market place hall, with some stands really paying attention to their interpreted understanding of the enterprises and their desire to access the OpenStack technology. This ranged from companies providing optimised tower (desktop style) servers, through to IBM showing off OCP blueprinted servers, which in turn provides a standard compute architecture. Not everyone company or organisation has a server room that wants to take advantage of OpenStack, nor do they necessarily have the skill to tie the components together. Interesting approaches all round!

*Miranits, Canonical and Red Hat were present, for each tip of the consumer triangle, being: instant access, guided automation and tool-box.*

![Fuel01](/images/blog/Fuel01.png#floatleft)

Instant AccessFuel

__Mirantis__ offer the easy access approach, or ‘low bar’ if that’s more familiar as an ‘easy’ term. As a set of steps: Install the ISO, launch a controller node via the [Fuel project](https://www.mirantis.com/products/mirantis-openstack-software/openstack-deployment-fuel/) and then via PXE boot, launch new nodes that Fuel adds to the ’stack’. You can get going with OpenStack fairly easily and you don’t need to know a whole lost about Linux or OpenStack with Mirantis. That said, with [version 7.0](https://www.mirantis.com/products/mirantis-openstack-software/what-is-new-in-7-0/) (OpenStack Kilo), lots more features are included like interop with NSX-v!

The negative’s to this being the networking is fairly simple out of the box, but it’s OpenStack underneath the Mirantis wrapped Fuel and automated build out of additional nodes. You can use Murano to roll out applications and Mirantis supports Kubernetes and Cloud Foundry too.

It’s took a while for Mirantis to get this far, but they now claim it’s enterprise class and enterprise stable.

![JuJu](/images/blog/JuJu1.png#floatleft)

Wide CustomisationJuJu

Canonical offer their ‘MaaS’ or [Metal-as-a-Service](http://maas.ubuntu.com/docs1.7/orientation.html#maas-in-brief), which provides the necessary control of hardware via a myriad of supported APIs including: IPMI, vmware, virsh, mscm, msftocs and ucsm. In summary MaaS provides the operational lifecycle support for a pool of hardware. Once MaaS has access, you can power up, power down and carry out lifecycle operations like BIOS upgrades with one interface. Each hardware unit can be placed in to a region or pool too.

Canonical also have [JuJu](https://jujucharms.com/), their canvass system. Once MaaS knows how to bootstrap the hardware, your customised OpenStack architecture is dragged and dropped in to place via JuJu, which in turn orchestrates the nodes. Relationships also by drag and drop, are made between components (with some opinionated defaults) and the items that are dragged on to the canvass are called charms. JuJu has been around since 2010, so it’s hardly new, however, for a market wanting ‘low bar’ access to OpenStack, MaaS and JuJu could offer many, just that.

Negatives being that charms have opinionated relationships to other charms, so at some point and possibly way further down the line, customisation knowledge will be required.

Kilo is supported today.

#### Tool Box

Red Hat as always come in with a myriad of tools and including Ansible no less, which was acquired a couple of weeks before this Tokyo 2015 OpenStack summit. RHEL (Red Hat Enterprise Linux) is the de-facto paid for distribution of Linux in enterprises globally and Red Hat also provide a huge amount of developers to the community. With regards to assisted deployment, RedHat OpenStack can be deployed using [Foreman](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux_OpenStack_Platform/4/html/Installation_and_Configuration_Guide/chap-Foreman_Overview_and_Installation.html#Overview13), the [Red Hat Enterprise Linux OpenStack Platform director](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux_OpenStack_Platform/7/html/Director_Installation_and_Usage/index.html), [Puppet](https://puppetlabs.com/download-puppet-enterprise-all) and [Ansible](http://www.ansible.com/openstack) to name but a few options.

Ansible also provides [OSA (formerly OSAD)](https://github.com/openstack/openstack-ansible) – expanded to OpenStack Ansible playbooks. As per the obvious name, this is a set of playbooks created by RackSpace that places the OpenStack projects into containers (LXC), configures them and provides a working OpenStack architecture that is in turn fully customisable. This is better than the DevStack approach, where the components are tightly coupled together and reliability is quite low. Using containers, developers can adjust the OpenStack code, make a huge mess of it, destroy the mess and spawn a replacement virgin container without having to take down the entire stack, or know the workarounds using screen. If you’re experimenting with building out your OpenStack architecture, it’s potentially a perfect way to get started as errors can be quickly rectified.

Kilo is supported today and delivered by one tool or another.

#### BreakOut Sessions (Note Worthy)

There were many sessions as per the previous two days to mention, however the OSA and cloud-init sessions were of particular interest. The OSA session was mainly a grounding and an introduction with how-to guide delivered by Walter Bentley (RackSpace). The information allowed attendees of the session to from zero to running in about 30 minutes. Wireless issues caused the group some problems, but the material was available to take away, so no real loss. Getting started is often the issue so the guidance was great to see. Materials for the session are [here](https://goo.gl/yzzA0O).

 

The Cloud-Init session was delivered by  Florian Haas and Syed Armani (Hastexo). This session went in to detail on how to use a full stack tool like Puppet alongside Cloud-init to get your nodes, provisioned and running via Heat. A joining of tools to ease the provisioning of infrastructure. Check this repo out for session information which you may find valuable: [https://github.com/hastexo/openstacksummit2015-tokyo-handson](https://github.com/hastexo/openstacksummit2015-tokyo-handson) and the reveal.js slide show (presentation) which can be navigated via GitHub pages: [http://hastexo.github.io/openstacksummit2015-tokyo-handson/#/](http://hastexo.github.io/openstacksummit2015-tokyo-handson/#/)

Finally, the recording of the Hastexo session: [https://www.openstack.org/summit/tokyo-2015/videos/presentation/rsvp-required-heat-cloud-init-and-cloud-config-openstack-orchestration-deep-dive-hands-on-lab](https://www.openstack.org/summit/tokyo-2015/videos/presentation/rsvp-required-heat-cloud-init-and-cloud-config-openstack-orchestration-deep-dive-hands-on-lab) 

#### Thursday Notes

With Thursday being the last full day for the operators part of the summit (or main event), many people made the most of the last day and the sessions were quite literally heaving with people. Get in early and quick!

#### Week Close

The whole week was action packed and it would be shameful not to mention the [vBrownBag sessions](https://twitter.com/hashtag/vBrownbag?src=hash), which provided guest speakers 15 minutes to jump on the stage and deliver a talk that didn’t make the main event roster. It wasn’t a case of the talks being poor quality, it was a quantity issue! So many talks were submitted and only a few can make it on to a given schedule. Lauren Malhoit ([@malhoit](https://twitter.com/malhoit?lang=en)) appeared to run the event in one of the rooms and it was great to see the room was almost liquid with people flowing in and out as the sessions began and ended.

The venue itself provided great facilities, although the rooms were a little on the small side for some of the talks. Predicting popularity is difficult so kudos to the event organisers who did a great job.

It was halloween as we left and needless to say, the Japanese celebrate this massively with almost equal numbers of zombies and Super Mario Bro’s walking around! Thanks Japan for a humbling and entertaining if not tiring week.

#### Hiroshima

On the Friday and after clocking up a serious amount of hours during the week, Matt Oswalt (@Mierdin) and myself headed to Hiroshima via the Shinkansen (bullet train!). This place was on both of our bucket lists to visit and I can only hint at the surreal feeling felt when visiting. Needless to say, if it’s within your means to visit, then visit you should. The ‘Atomic Dome’ or prefect building it’s colloquially known, is still standing. The first atom bomb used against human kind, detonated 600 meters above the building on August 6th 1945. This left the prefect building scorched and mangled, turning everything in a 2km radius in to ash. As the detonation was directly overhead, the building would have felt immense forces downwards, but not enough sideways force to demolish the building. There were amazing stories of survivors who were in basements at the time, but an overwhelming sense of sadness and tragedy surrounds the place. Needless to say, both of us were severely touched by this experience. Also, with it being the 70 year anniversary, mobs of unattended school children were roving around asking questions to unsuspecting non-locals, passing on messages of peace via their studies. I’ll leave you with this.

![Mierdin_davidjohngee](/images/blog/Mierdin_davidjohngee.jpg#center)