---
title: "VXLAN MTU vs IP MTU Consideration"
date: 2014-06-22T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "VXLAN MTU vs IP MTU Consideration"
signoff: Dave
---

#### Audience

This post is for anyone who’s thought about deploying VXLAN on their network and who like me thinks deeply about stuff, to the point of utter confusion, which hit me on a very hot sunny afternoon. The good news with confusion is, once you’ve cracked the issue (normally one’s correct understanding), the clouds clear and the birds sing.

#### VXLAN

Virtual Extensible Local Area Network functionality is beginning to hit a wide range of vendor devices. VXLAN provides 16 million (and then some) segments for Layer 2 networks. Some organisations, especially those providing cloud infrastructure currently have or will have problems with the number of VLANs available in 12 bits, which is 4096. In that 4096 number, some are not usable either are reserved for certain things like token-ring and platform specific internal communication.

![i_vnet_vxlan_multiple_tunnels](/images/blog/i_vnet_vxlan_multiple_tunnels.png#center)

VXLAN is a simple encapsulation method or a tunnel. It encapsulates the original payload in to UDP packets for transit across an IP network and adds another 50 bytes on to the header tax. At a very high level, VXLAN can be deployed in multicast mode and with unicast. Virtual Network IDs (VNIDs) represent VXLAN segment identifiers. In order to gain connectivity, a network construct like a VLAN or an Ethernet ‘port’ is bound to a VXLAN segment. Broadcasts, Unknowns and Multicasts are also encapsulated in to VXLAN, so there really isn’t much of a difference from what you’re used to with VLANs. Virtual Tunnel End Points (VTEPs) is what we call end points that do the encapsulation and decapsulation. Not much more to it than that! Maybe one word about VXLAN routing; do not get this mixed up with the routing of VXLAN encapsulated payloads. VXLAN routing is the concept of routing between concepts, similar to routing between VLANs.

#### So why the post if it’s so easy?

So, here’s the thing. If you need to understand why things are and just don’t accept them, you might run in to this issue from time to time. Looking back now it was quite funny, but at the time I was utterly confused and sought guidance from Ivan Pepeljnak.

#### Enter the MTU (cue: Cowboy Wild West whistling)

If you want to deploy VXLAN, it’s recommended in order to support 1500 byte payloads to increase the MTU to 1550. Fine. So what about IP MTU? Referring to  [Ivan’s post here](https://blog.ipspace.net/2007/10/tale-of-three-mtus.html) (for those who haven’t considered this), the three MTUs that most people worry about are:

- Physical MTU (also known as chassis or system MTU)
- IP MTU
- MPLS MTU

Physical MTU being the highest maximum transmittable unit (frame) that an interface can accept without fragmentation. IP MTU being the maximum transmittable unit (packet) of the payload and the IP header. MPLS MTU being that of the payload and MPLS headers, normally 1508, giving 2x MPLS labels worth of header bspace, which is enough for Layer 3 VPN deployments.

Cisco as we all know do things their own way. However, they’re often the first ones out of the stable doors, so you can’t really complain if you want the features. Cisco include by *magic* the MTU for Ethernet headers on the system MTU for IOS, NX-OS and IOS-XE. If you set 1500, what really gets pushed to the Ethernet controller hardware is 1524 (or 1522 for XE). This allows a 1500 byte payload and up to an additional 24 bytes of Ethernet headers and trailers. Juniper do things slightly differently and assume you know what you’re doing so allow you total control. What you configure is what you get.

So what about Cisco IP MTU? IP MTU includes the payload and the IP header. A setting of 1500 therefore varies for the actual payload. In the case of ICMP, the biggest payload of a 1500 byte IP MTU setting would be 1472, which is the IP header of 20 bytes, plus the ICMP header of 8 bytes, deducted from the IP MTU! No magic here.

Suppose then you read ‘VXLAN requires 50 bytes of additional header space’. My initial thought is how it looks at the wire. Is this IP MTU or physical MTU? Logic dictates that the physical MTU would be more like 1574 for VXLAN and the IP MTU would be 1550 (at least on a Cisco device anyway).

Ok, some clarity is required. Let’s check out the Nexus 9000 data sheet which references VXLAN!
![http://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-729383.html](http://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-729383.html)

![Cisco VXLAN](/images/blog/cisco_vxlan.png#center)

First thoughts? If the outer Ethernet header is taken care of by Cisco, then here’s our calculation:

- 1500 byte payload
- 8 byte VXLAN header
- 8 byte UDP header
- 20 byte IP header

= 1536 bytes. Not 1550? Does this make sense? Surely? Right? Mrrmmm…Ivan…can you help?

Here’s a brief list of events just after reaching the point of criticality:

1. Wrote email to Ivan with content of “Does this make sense? I should read the specs, but I’m confused”.
2. As soon as I hit send on the email, I read the VXLAN draft then realised I should have done so immediately.
3. Acknowledged I had gone completely down a rabbit hole and instantly felt foolish.

#### So what did we learn at school today? When faced with confusion, go back to the basics

Well, needless to say, a combination of a long commute, hot day and working intensively lead me to this crazy number. The actual VXLAN draft says this:

- 1500 byte payload which includes the original IP header/s.
- 14 byte inner Ethernet header
- 8 byte VXLAN header
- 8 byte UDP header
- 20 byte IP header

= 1550. Darn it. 

The diagram was as clear as mud and I bought it. The outer Ethernet header is magically taken care of if we set both the system and IP MTU at 1550 if we run IOS, NX-OS or IOS-XE, so we don’t need to include it. Thanks Cisco!

Why am I admitting this faux par? Well, it’s good to be reminded I’m human and like most humans can become so focussed on trying to understand one thing, that base logic goes out of the window. Anyone who’s studied for the CCIE lab will recognise this trait and it can burn serious amounts of time. My normal work flow is to consume the draft first then vendor documentation second. Post spending a day reading Cisco docs, I took the easy option and clicked on a link instead of following the proven die hard method.

Will I do this again? Of course. Am I pleased this happened? Yes. Thanks Ivan for being kind.