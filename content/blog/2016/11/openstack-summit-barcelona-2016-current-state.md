---
title: "OpenStack Summit Barcelona 2016: Current State"
date: 2016-11-03T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "OpenStack Summit Barcelona 2016: Current State"
signoff: Dave
categories:
- OpenStack
tags:
- OpenStack
---

It’s October in the UK and blimey charlie, it’s a bit chilly. Good news then that the OpenStack Summit is in Barcelona! In comparison to Canada or Japan, it’s on my doorstep! Spain being the home of English holiday makers, the smell of sun cream, sangria and chicken nugget dinners awaits.

It Felt Different

Needless to say, I play investigator at these summits. Whether it’s the SDN congress, OpenStack or other networking events, the cynical grump hat is donned. Before I even managed to investigate anything, I felt something different. The hype lever was set to average and this show felt almost corporate. Good news or bad news? Something I’ve struggled to quantify all week and even now as I sit on the home bound flight to Blighty, I continue to ponder.

Big bang news was lacking like previous shows. Realistic use cases, real commentary and on-stage demos made this feel different. One of the demos made me both cringe and chuckle as Mark Collier played real life chaos monkey, pulling fibres and eventually even cutting through them during an EPC demo which included OPNFV Doctor and Vitrage. This demoed OpenStack’s capability to integrate with monitoring and life cycle tooling. Find that demo here or directly below. Maybe the shift is due to a huge focus from telcos? OpenStack seems to have been elected by various organisations to be their NFV platform, which reflects offerings from the likes of Netronome, who offer hardware offload cards. Nothing new, but in the scope of NFV with OpenStack? Quite a powerful offering providing Netronome stay around long enough.

{{<youtube Dvh8q5m9Ahk>}}

#### So What Was Different?

In an attempt to figure out what that niggly feeling was, a rough and probably terrible list was made:

* Is it running out of cash injections? < Possibly, but don’t know for sure
* Do investors now want their money back or before agreed timelines?? < Every investor wants profits. Maybe they’ve lost the faith?
* Are new user consumption levels flat? Has a realistic market cap been reached? Is that even a thing? < Consumption is still growing and no market cap appears to have been reached looking at the statistics
* Has it turned in to an un-maintainable monster? < Possibly! More on that below
* Do people care anymore? < For NFV, people care. Not sure about generic private cloud
* Has it reached enterprise level (therefore just not exciting) and is now a silver piece of junk that receives polish from time to time? < Not there yet. Lots of unconscious slips from the OpenStack management team were said on stage…they know it’s still difficult to manage

Taking a snapshot of the industry and taking a good hard look, it’s clear that RedHat, Mirantis and Canonical are still the three kings. All three are approaching installation differently, with some differentiators around operations. Red Hat has [OpenStack Director](http://redhatstackblog.redhat.com/2016/07/25/introduction-to-red-hat-openstack-platform-director/), Mirantis rely on [Fuel](https://wiki.openstack.org/wiki/Fuel) for installations (also allows feature install from packages) and Canonical have [JuJu](https://www.ubuntu.com/cloud/juju), the Ubuntu canvass tool that provides a drag-and-drop set of capabilities for building out services. Canonical also has [MAAS](http://maas.io/), providing bare metal services. All three make regular improvements and contributions and it’s too early to tell if any of these will vanish due to lack of funding or market saturation and low caps.

i)  [RedHat OpenStack Director](http://redhatstackblog.redhat.com/2016/07/25/introduction-to-red-hat-openstack-platform-director/)
ii)  [Mirantis Improvements in 9.x](https://www.mirantis.com/software/mirantis-openstack-software/what-is-new-in-9-1/a)
iii)  [Ubuntu JuJu Store](https://insights.ubuntu.com/2016/07/22/introducing-the-new-juju-store/) and [JuJu improvements for 2.x](https://jujucharms.com/docs/stable/reference-release-notes)

Talking briefly about trends, the ‘Telco Hammer’ however has been wielded and it struck at this show. Lots of NFV talk and networking additions which makes it a viable play for some operators with a thirst for skilling up. What with VxLAN-GPE, NSH and SFC, there is a lot to learn in order to take advantage of this technology, but once it’s mastered by a group of skilled employees or mercenaries, major advantages exist.

People still care about the project/s even though the hype is dying down. Lots of great sessions were delivered this week and some involved current contributors passing their tacit knowledge down to potentials. With regards to the un-maintainable monster, some noise is being made around culling some of the projects (see the close out section below) but the reality is, it’s becoming more usable. [Platform 9](https://platform9.com/) demonstrated a driver system allowing a user to control AWS using the OpenStack tooling, put it another way, an OpenStack abstraction for public clouds. Great for simple coupling to a range of back ends. You can find the Platform 9 OpenStack Omni project [here](https://github.com/platform9/openstack-omni).

#### Good Stuff

Reading through as I write, some of this sounds negative. On the contrary, there is something nice about technology that is useful but seems boring. It means it’s realistic and usable. Maybe we’ve gone in to the trough of disillusion but with a hint of “ok, it’s not new anymore and we’re willing to risk it”.

This show seemed to be focussed heavily on networking. No mention of Neutron being the king of contribution, but lots of nice networking things going on including OVN, SFC, NSH, VxLAN-GPE and ODL integration (a mish mash of buzz phrases!)

* [FD.io](http://fd.io/) made lots of appearances
* The OVN team had a good update session (Ben Pfaff, Justin Petit and Russell Bryant) which is a great simple solution for virtual networking if you’re not familiar already. Check [here](https://www.openstack.org/videos/video/ovn-moving-into-production-1) for the video which is more of using it in production, but an update never the less
* BGP seems to be coming more common place around the edge as the community gets comfortable, check out the [BaGPipe project](http://docs.openstack.org/developer/networking-bgpvpn/bagpipe/index.html) with the BGP driver. This also includes a simple MPLS deployment option
* Lots of MANO and VNFM sessions were scheduled through the week, which included NSH, SFC and dealing with legacy components in an ever more integrated world. The best one delivered by the Tacker team is here: [https://www.openstack.org/videos/video/orchestrating-vnf-forwarding-graphs-and-sfc-using-opendaylight-neutron-and-tacker](https://www.openstack.org/videos/video/orchestrating-vnf-forwarding-graphs-and-sfc-using-opendaylight-neutron-and-tacker)
* The [Neutron L2 gateway](https://www.youtube.com/watch?v=-iVSw-R-BZ8&feature=youtu.be) has had some improvements and now scales to 800 nodes, which is better than the previous effort
*  [Tacker](https://wiki.openstack.org/wiki/Tacker), the VNFM has had some serious work done to it over the last 12 months since I took a proper look at it. It shows promise as a great joint NFVO and VNFM. It now offers SFC capabilities as well as an improved monitoring framework.

#### Close Out

As I had breakfast this morning (Friday) , [this](https://www.computerworlduk.com/cloud-computing/mark-shuttleworth-on-openstack-hpe-layoffs-prove-bs-as-service-theory-3648336/) article caught my attention from Mark Shuttleworth. A call to remove projects (BSaaS) from the core due to clutter has been raised which may help to make OpenStack feel more approachable and also realistic as some of the hype dies down. Adding projects to the big-tent or constantly creating new projects to add minor functionality to existing projects is a bit foolish. On this subject, myself and a Brocade colleague attended a design summit session on participation. It seems the governance is attempting to stem the flow of ‘projects for the sake of it’ and naviagte the waters to the right port of safety.

All in all, a good show. Great to meet people in real life like[ @networksherpa](https://twitter.com/networksherpa) (John Harrington) and [@djspry](https://twitter.com/djspry) (heh, DJ Spry), catch up with good friends like [@BigMStone](https://twitter.com/bigmstone) (Matthew Stone) and others that shall not be named!

If you’re a networker and want to cut to the chase, the videos most worth watching in my humble opinion are littered through this post. OpenStack is becoming a great set of components to build for networking and telco’s are now embracing it properly instead of poking it with an exrement covere stick and complaining!
