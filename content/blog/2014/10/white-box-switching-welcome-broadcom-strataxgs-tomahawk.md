---
title: "White Box Switching: Broadcom StrataXGS Tomahawk"
date: 2014-10-07T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "White Box Switching: Broadcom StrataXGS Tomahawk"
signoff: Dave
categories:
- Chips
tags:
- Chips
---

A [previous post](/blog/2014/09/white-box-switching-cavium-xpliant/) listed the excitement I felt when reading through the Cavium XPliant announcement. Programmable fast packet forwarding hardware? Awesome! In a previous life I worked with embedded electronics and wrote several interesting algorithms in C and assembly for applications from noise filtering for AD conversion, LCD screen drivers and TCP/IP stacks (which was fun). This kind of thing really excites me. Nuff said.

So I was more than happy to read the announcement from Broadcom announcing their latest child, the StrataXGS® Tomahawk™. This chipset is formed from more than 7 billion transistors, can forward packets at 3.2Tbps and is optimised for SDN and high port density devices, not to mention it is an authoritative chipset for 25GE and 50GE Ethernet and provides sub 400ns port-to-port operation. Sound good? It’s the next evolutionary step from Trident II and matches the offering from Cavium with their [XPliant](/blog/2014/09/white-box-switching-cavium-xpliant/) child.

The Broadcom StrataXGS® Tomahawk™ can deliver 32x 100GE, 64x 40/50GE or 128 ports of of 25GE on a single chip. SINGLE CHIP! This all boils down to 25Gbps per-lane interconnections. Bit of a waste perhaps for 40GE? Which is good considering this chipset is based on upgrading switches with 10GE host ports with 40GE uplinks to 25GE host ports with 100GE uplinks without increasing footprint or cabling complexity.

Broadcom have also implemented the FleXGS packet processing engine, which provides flow processing, security, network virtualisation, measurement, monitoring, congestion management, traffic engineering and “rich” load balancing.

With link telemetry being a major part of the Cisco ACI offering, it’s only natural that Broadcom provide this. They have done that too with their “BroadView” instrumentation which provides link telemetry. This chipset includes OpenFlow 1.3+ support with the OpenFlow-Data Path Abstraction (OF-DPA) software which allows the internal architecture of the chipset to be programmed via OpenFlow. More information on OF-DPA can be found below. This can be viewed as a mapping of OpenFlow 1.3 functionality to the chip architecture. Don’t confuse this with just “OpenFlow”.

[Broadcom OF-DPA Overview](http://www.broadcom.com/products/Switching/Software-Defined-Networking-Solutions/OF-DPA-Software)
[Broadcom OF-DPA code](https://github.com/Broadcom-Switch/of-dpa)
[CV PDF DownloadBroadcom OF-DPA 1.3 Pipeline](http://www.broadcom.com/collateral/pb/OF-DPA-PB100-R.pdf)
[CV PDF Download  Broadcom OF-DPA Abstraction Information](http://www.broadcom.com/collateral/etp/OFDPA_OASS-ETP101-R.pdf)
[CV PDF Download  Engineering Elephant Flows](http://www.broadcom.com/collateral/wp/OF-DPA-WP102-R.pdf)

Finally, this chipset naturally supports VXLAN, NVGRE, MPLS, SPB and the like in addition to so called Smart-Hash™ load balancing modes that help to avoid leaf-spine congestion and management for mice and elephant flows. Interestingly it also appears that this chipset supports scalable chassis applications (virtual chassis/stacks etc) through “multi-chip HiGig™” technology.

#### Close Out

Whilst all of these features are impressive, it’s down to the ODM manufacturers to implement designs using this chipset for the features to be exposed for the software that’s loaded on to the device. With the right driver functionality coverage, these features are there to be wielded. Obviously it’s down to availability of the driver and implementation within software from Cumulus and Switch Light. The same goes for any chipset for the record, including the challenging Cavium XPliant device.

Check out the original Broadcom news announcements below.

[StrataXGS® Tomahawk™ Announcement](http://www.broadcom.com/press/release.php?id=s872349)
[StrataXGS® Tomahawk™ BCM56960](http://www.broadcom.com/products/Switching/Data-Center/BCM56960-Series)