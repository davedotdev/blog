---
title: "Cisco ME3750 – EoMPLS over ES ports"
date: 2012-09-20T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "A post on EoMPLS over ES ports - Cisco ME3750"
signoff: Dave
---

The Cisco ME3750 is an Ethernet services switch compliant to MEF 9 and 14 and can serve in a multitude of roles from delivering Martini draft L2 connectivity, provide H-QOS, VLAN re-writes, QinQ, CFM (OAM) and more.

![Cisco ME3750](/images/blog/Cisco_3750_Metro.jpg#floatleft)

 It will also provide L3 MPLS IP-VPN functionality, limited by throughput (due to tiny CPU), single hardware label handling and limitation on number of routes (It’s a small switch right?!).The ME3750 and ME3400 are used everywhere you can imagine and like the ME3400, they’re considered bread and butter stuff for many service providers globally. Downsides? They do NOT stack (everyone knows a 3750 stacks!!!) and they only have two Gigabit ports which Cisco have defined as ES or Enhanced Services ports. The others are Fast Ethernet only. It kind of limits you to delivering 100Mbps circuits, which for WAN/MAN isn’t a great issue. DCIs over that speed is another issue. Also, it’s worth mentioning they’re now EOS. It’s normal for companies to use kit until it just doesn’t work and I expect the ME3750 not to be going anywhere fast whilst the feature set meets expectations.

 I, like many people, tend to cable things up in a method which allows for service delivery without constant repatching. I accept there is a difference between throughput and function, but for the majority, delivering a 2Mbps CIR EoMPLS link over a VLAN which traverses the two Gigabit ports is a no brainer.  Cable it up and forget.  Our desired solution is this image:  We want a single VLAN to traverse two sites and transport the Ethernet frame contents with it. The configuration (again looking a little like below – although simplified) was applied. Please note, this configuration is not complete, it lacks any MPLS/IGP/BGP/RSVP/LDP configuration, but in this example, accept they work for other services utilising the aforementioned technologies.

![ME3750](/images/blog/ME3750_11.png#center)

```bash
int gig 1/1/1 switchport mode trunk
description **ES-Port Config allowing all configured VLANs to traverse**
switchport trunk allowed vlan add 100
!
int vlan 100
description **EoMPLS for VLAN 100**
no ip address
xconnect x.x.x.x 100 encapsulation mpls pw-class VLAN-EoMPLS
!
pseudowire-class VLAN-EoMPLS
encapsulation mpls
interworking vlan
```

Result? Doesn’t work 🙁 Bummer! Why not? The closest explanation was one I found in a Cisco guide doc stated you can’t run EoMPLS over the same ES ports that run MPLS. The way I interpret this is even if a VLAN traverses the ES port that has MPLS enabled on it. As a result I patched in another couple of cables between the L2 aggregation switches and the ME3750’s to the FE ports then moved the config. Did it work? As expected, yes. Just make sure you disable any spanning-tree safety features on the UNI port. I did have a couple of errdisables.

If anyone else has a different experience, I would like to hear it. This could be specific to software version 122-54.SE but I do not have any spare kit to test to otherwise test my theory. The other question could be, is it worth it? Well, in this tough economy, using these devices in this manor might save your company a lot of money.