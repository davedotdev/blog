---
title: "OpenStack Summit, Tokyo 2015, Tuesday 27th – Show Notes"
date: 2015-10-27T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "OpenStack Summit, Tokyo 2015, Tuesday 27th – Show Notes"
signoff: Dave
categories:
- OpenStack
tags:
- OpenStack
---

It’s Tuesday morning, it’s 9am and the keynote started off in a blaze of glory.

Over 5000 attendees are present, from 56 countries. The opening presenter with a huge amount of energy stated:

> OpenStack is the greatest open source project!

Can we argue with that? The obvious one being Linux, but a second place isn’t to be argued with.

__Egle Sigler, Principal Architect, RackSpace, OpenStack Foundation Board Member:__ Use devstack, which provides visibility against usability for [defcore](https://wiki.openstack.org/wiki/Governance/DefCoreCommittee). The more it’s used, the better the visibility. All goes to the common good.

> DefCore sets base requirements by defining 1) capabilities, 2) code and 3) must-pass tests for all OpenStack products. This definition uses community resources and involvement to drive interoperability by creating the minimum standards for products labelled "OpenStack."

__Lachlan Evenson: Lithium Technologies__: Highly energetic Aussie, spoke about rapid development and deployment. Via the presentation, Lachlan showcased a realtime app built on Google tech; containers in OpenStack using Kubernetes and a five "minute deployment". Also demonstrated a home grown dashboard with honeycomb visualisation for each type of OpenStack project. Also via Slack, he showed the use of Kubot (A Kubernetes Slack ‘bot’) to talk to Kubernetes and scale up a funny application/game, with lazers, fish, boats and crocodiles, which can be found here: [http://crock-hunter.lcloud.com](http://crock-hunter.lcloud.com)

The summary from this was that CapEx can remain static and developers can rapidly react.

__Takuya Ito, Yahoo Japan: Sr. Manager Infrastructure Engineering, OpenStack Blackbelt__

Takuya presented energetically about what Yahoo in Japan are doing. Here are some of the bullet points he went through:

64.99 billion page views a month 270+ million apps downloaded 100+ services 50000+ instances 6 times more traffic density than physical env 20PB data 20+ clusters operating Doubled infrastructure in 1 year from 50 racks to 100
Post opener, he showed a spikey graph and asked the audience to what it represented? Imagine a huge spike in an otherwise fairly clean line graph going horizontally with a few slopes, here’s ,my ASCII representation: ___|__…___

Turns out the graph was that of datacenter load vs time during the window an earthquake struck. Yahoo offer news services around tsunami, volcano, weather and other important sources of information. Takuya then spoke about enterprise usage of OpenStack and referenced the relationship between usability and deployment of the applications and stability of the technology. 

Interoperability and API stability is the key to operation. This means consistent abstraction is possible across an infrastructure. Backwards compatibility is no easy thing to achieve however but it’s worth it given what is gained.

Takuya spoke of “Continuous Data Centre Lifecycle” as the ability to aggressively consume infrastructure technology. Great – BUT the culture of the organisation has to allow for failing attempts at consumption, as well as rapid turn around in the event of issues. This is the kind of thinking that empowers IT departments to deliver the services that are needed as opposed to what they think satisfies the requirements based on technical limitation, which is oft tied to budget.

Why Yahoo uses OpenStack? Community and evolving technology was the TL;DR. The community provides core and foundation functionality. This is a DevOps focussed approach, with the fail fast approach being harnessed more than ever. 

OpenStack is operated as an infrastructure to support the people. Everyone’s efforts create opportunities and activities in the community support the important applications.

Need there be more said? OpenStack – for the people whom consume the applications.

__Erica Brescia: COO Bitnami__

RTFM is truly dead. Some customers have asked her to ‘fax in’ information around onboarding! Jokingly (maybe?) referred to this as 1940s technology. Partnering is key for Bitnami and enterprises require finished operational technology. For example, for providing a curated library, standard images are key. Murano and Heat are a great start, but need populating. The underlying message is to partner partner partner.

Erica spoke about ‘banishing the shadow cloud’, or in other words, stop your corporate citizens from mining out of your castle, avoiding corporate and in some cases legal compliance by using public cloud to address dire need. 

Erica was a great speaker and had stage presence.

__Imad Sousou, Intel VP and GM, Open Source Technology Center: __

Spoke of the innovation centre, the largest OpenStack upstream engineering team, in partnership with RackSpace. The Intel development model ties engineer output to working group of OpenStack foundation, encouraging more output. Encouraging news!

Imad also spoke of the partnership with Mirantis, to make sure OpenStack is Enterprise ready. This is a great move and Intel are in a great position to drive consumption. Especially given the high bar set by VMware, OpenStack has a way to go yet with some easier forms of provisioning and operation. 

With regards to more standardisation, SuperMircro has joined the Intel partnership for ‘OpenStack enabled box’ and ‘enterprise in a box’.

To make OpenStack carrier grade, Intel have the ‘Network Builders Fast Track programme’, which Red Hat have joined, to deliver the underlying philosophies: Optimisation Integration and Interoperability

__Jonathan Bryce Exec Director__ – [@jbryce](https://twitter.com/jbryce?lang=en) – OpenStack Foundation went through the Liberty project, the twelfth release of OpenStack. He spoke of the common baseline, devcore and interop.

Jonathan spoke about the maturation of technology and provided a quote (which I’ve condensed): "Most technologies start out as an experiment, those that make it become mature”. Various quadrant charts were displayed with the various projects and where they sit between the axis of maturity and adoption.

![openstack1](/images/blog/openstack1.png#floatleft)

Needless to say, these projects are maturing, with the timeline extending up to about five years, given the oldest (which was Swift).

The OpenStack Administrator accreditation will be available in 2016 and delivered virtually, which has been developed by multiple parties. I was expecting to hear about this and so it didn’t disappoint.

Education is huge right? It brings awareness, confidence and progression!

In Kilo, the Federated Identity was released, which provides shared federated identity between OpenStack clouds. Now this is down-streamed and productised by Open Stack Foundation partners and corporate entities building products around the OpenStack ecosystem.  An example of how the community evolves.

__BreakOut Sessions (Note Worthy)__

Miguel Grinberg (well known for his blog and the O’Reilly book on Flask) session on OSA (OpenStack-Ansible playbooks, previously OSAD) was pretty cool. Miguel is a great presenter and truly at ease with his audience. He went through a canned install of OpenStack using OSA, which was pretty impressive. OSA deploys the OpenStack components into containers and does the hard stuff so you don’t have to. If you do some dev work, trash the container (or project), OSA makes it easier to re-deploy the broken component and try again. He went in to the useful details around OSA and left us with this link: [https://asciinema.org/a/28461](https://asciinema.org/a/28461) which is effectively an ASCII playback of his command line for the install. He also leaves comments on bash using #. Thoughtful as ever.

BGP is often used as a reliable means of providing NLRI and the use case in virtual routing is growing. Project Calico attack this a different way, but the afternoon session on using BGP with Neutron presented several use cases, which mostly manifested as a way of tracking hosts within an infrastructure that has been built using summarisation of IP subnets which in turn provides scalability. Using host routes is nothing new and Cisco with OTV, Juniper with EoMPLS and VRRP, or $some_l2_tech coupled with $some_l3_gateway_redundancy_tech has been around a long time. Harnessing BGP at the access layer for virtual guests, means that the intelligence lives in an easily configured layer as opposed to the top of rack switching which is normally tied directly to the networking team if you have the traditional silos. 

*Some would call this SDN. The reality is, it’s networking for Linux thinking…just because it can be automated doesn’t mean it’s SDN!*

A breakout session around troubleshooting Neutron was attended instead of Ben Pfaff’s session on OVN. Bad choice on my part. I should have gone to the OVN session. Troubleshooting on Neutron boils down to the following:

Figure out if packets are leaving the VM Figure out if packets are traversing Veth interfaces Figure out of packets are traversing tap interfaces Ensure your Linux bridge is working Ensure OVS has the right forwarding instructions for your type of traffic Summary: Check each interface and each bridge between the source and destination of your flow
Wireshark is your friend along with -v (verbose) commands for Linux. The Linux bash shell is the power tool here and surprise surprise, make sure you know what you’re doing.

__Tuesday Notes__

Thanks to Rob Sherwood for not minding being ‘corridor conversationed’.

OpenStack Project Navigator link [https://www.openstack.org/software/project-navigator/](https://www.openstack.org/software/project-navigator/)

Many people keep saying: OpenStack is a young technology! I’m pretty sure this is just sustaining the notion that it’s new. Stop it. It really isn’t that new anymore. Ok, so there is a skill gap around provisioning and usage, but using the excuse of ‘new’ is beginning to look worn.

The obligatory comedy shot!

![openstack2](/images/blog/openstack2.jpg#center)


