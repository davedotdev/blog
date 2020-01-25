---
title: "OpenStack Summit, Tokyo 2015, Wednesday 28th – Show Notes"
date: 2015-11-02T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "OpenStack Summit, Tokyo 2015, Wednesday 28th – Show Notes"
signoff: Dave
categories:
- OpenStack
tags:
- OpenStack
---

It’s Tuesday, it’s 9am and most people have hangovers from the numerous evening events going on in and around Takanawa. 

The opening keynote seemed to revolve around Neutron and the great work Kyle ([@mestery](https://twitter.com/mestery)) has been doing as the project technical lead (PTL) of Neutron. Seriously, Neutron has the highest activity rate of all projects. Some argue that Neutron is too complicated and previous to attending the summit, rumours were rife around increasing support for simplifying Neutron to replacing it with Open Daylight. Needless to say, there are parties out there that want to see Neutron dead and claim it’s just too complicated to use.

So, to some keynote ‘framing’ figures: In 2014, 68% if OpenStack users (at least of those reporting) were making use of Neutron. Just one year later and it’s jumped to 89%! Maybe this can be attributed to OpenvSwitch and OVN, but either way, usage is increasing. This could also be attributed to new users not wanting to veer away from the popular projects.

With regards to the ever standing argument of “OpenStack isn’t ready for wide adoption”, which is self perpetuating, the guest speakers who were part of the keynotes, seemed to be following a pattern which went something like this:

1.     Welcome! We’re $INSERT_COMPANY and we’re cool!

2.     This is how many nodes services we ran on OpenStack last year, this is how many we run this year >>>$SLIDE

3.     We didn’t have any problems!

4.     During this $INSERT_HIGH_LOAD_EVENT, we ran critical services on OpenStack. It’s totally fine. Did we say we’re cool?

This self perpetuating pattern of “It’s not ready” really has to stop, but the approach of every keynote guest presenting on this pattern got a little monotonous. Great to see adoption climbing, but focus has to be on the SMB market with real focus on how they lowered CAPEX and OPEX by using the partners of the OpenStack Foundation. Use cases around Mirantis, RedHat and Canonical would have been great to see, as their markets that need a technological shake up to embrace agility and the (dare I say it) agile way of thinking.

NFV, ([Peter Willis](https://www.linkedin.com/pub/peter-willis/0/a81/3a4)’ naming gift to the world) was also talked about in the keynote of day two, with guests from NTT Resonant, SK Telekom and RackSpace. Given that Neutron was the project with the most amount of activity, it was no surprise that NFV would be such a huge focus. With ETSI MANO taking such a hammering in the networking news recently ([Scott Ranovich’s article](https://www.sdxcentral.com/articles/news/etsi-nfv-mano-mania/2015/09/)), it was no surprise to see many MANO plays with both ‘Open’ attempts at making VNFM and VNFO components along with closed offerings. There were some great breakout sessions on NFV as well as some not so great. It was clearly between commercial vs closed, or ‘carrier grade vs. play things’ as some of the commercial voices would have you believe.

[Tacker](https://wiki.openstack.org/wiki/Tacker) (an OpenStack coupled project) was presented throughout the event and is headed up by Sridhar Ramaswamy (who coincidently  works at Brocade). Today [Tacker](https://wiki.openstack.org/wiki/Tacker) is a VNFM, but with the maturation of the [Oasis TOSCA](https://www.oasis-open.org/committees/tosca/) language (Topology and Orchestration Specification for Cloud Architecture), the Network Service Descriptor (NSD) functionality will be implemented along with Service Function Chaining (SFC), yielding VNFO capability along with VNFM. It inherited originally the ‘service-vm’ project, but with Sridhar’s guidance, the project along with the committed contributors (pun intended), is moving along nicely. The Liberty release now has a monitoring framework which is similar to the way the management drivers (configuration) framework is implemented. This change effectively means that monitoring can be custom along with the configuration aspect, which suits the general function of the VNFM and soon to be VNFO. With the massively misunderstood use of ‘reference points’ within the MANO architecture, being able to design the drivers for both monitoring and configuration means the flexibility exists to move along at the same rate as the evolution of MANO itself. Today it might be NETCONF for configuration and ICMP echoes for monitoring but tomorrow, the VNF could join a message queue (a crazy or not so crazy idea? One would argue for IoT and [MQTT](http://mqtt.org/) this is not such a crazy idea).

#### BreakOut Sessions (Note Worthy)

Wednesday was action packed and the sessions were well balanced between end user, operator, experimenter and telco.

![neutron_am_openstack](/images/blog/neutron_am_openstack.png#floatleft)

A Neutron AM session was quite useful that discussed real world Neutron usage which included updates, upgrades and general “gotchas”. The session hosts from Time Warner Cable also spoke about how they had packaged OVN (OVS project) as the *nix distributions they use hadn’t built them yet. Nice to go from experimental, to production to packaging for rapid deployment!!! They were humble hosts and referred the whole audience back to the talk that Ben Pfaff, Justin Pettit, Kyle Mestery and Russell Bryant: [https://www.openstack.org/summit/tokyo-2015/videos/presentation/ovn-feature-complete-and-ready-to-test](https://www.openstack.org/summit/tokyo-2015/videos/presentation/ovn-feature-complete-and-ready-to-test)

Needless to say, the sessions were packed out. If you didn’t get a seat early, it was standing only, or worst case, trying to listen and watch from beyond the doors!

Wednesday Notes

Check out the Tacker project here: [https://wiki.openstack.org/wiki/Tacker](https://wiki.openstack.org/wiki/Tacker)

The Scott Raynovich SDXCentral article: [https://www.sdxcentral.com/articles/news/etsi-nfv-mano-mania/2015/09/](https://www.sdxcentral.com/articles/news/etsi-nfv-mano-mania/2015/09/)

ETSI MANO: [http://www.etsi.org/deliver/etsi_gs/NFV-MAN/001_099/001/01.01.01_60/gs_nfv-man001v010101p.pdf](http://www.etsi.org/deliver/etsi_gs/NFV-MAN/001_099/001/01.01.01_60/gs_nfv-man001v010101p.pdf)

Oasis TOSCA simple profile for NFV: [http://docs.oasis-open.org/tosca/tosca-nfv/v1.0/csd02/tosca-nfv-v1.0-csd02.pdf](http://docs.oasis-open.org/tosca/tosca-nfv/v1.0/csd02/tosca-nfv-v1.0-csd02.pdf)