---
title: "Multigigabit Ethernet 2.5 / 5.0Gbps NBASE-T Alliance"
date: 2015-02-02T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Multigigabit Ethernet 2.5 / 5.0Gbps NBASE-T Alliance"
signoff: Dave
categories:
- Multigigabit Ethernet
tags:
- Multigigabit Ethernet
---

#### Ethernet 2.0

The title above may seem a little odd given Ethernet’s long and healthy life. Keeping conversation to more recent Ethernet standards (10/100/1000/10000/40000/100000 Mbps) the transmission technology and encoding standards have come a very long way for Ethernet. I remember when 100Mbps ports were the absolute norm and when 1Gbps ports were spared for very special (high paying) customers often on a single line card on a router!!! A router!!!

Wind the clock forward about ten years and where are we? 10Gbps access ports to servers, 40Gbps uplink ports from top of rack switching and 1Gbps ports to wireless access points, vending machines and home devices such as printers and coffee machines. Wireless technology is flourishing and with the advent of 802.11ac (Gigabit wireless) the access layer is seeing rolling upgrades.

So if we imagine our access tier is formed of 1Gbps access ports to wireless access points, multiple 10Gbps uplinks often in a multi-chassis Ethernet LAG (MLAG/MEC/vPC/) bundle and core speeds at least at multiple 10Gbps if not 40Gbps speeds, what happens when wireless plays catch up? Introducing The 802.11ac Wave 2 standard which sees speeds that could exceed 6.8 Gbps. This unbelievable wireless speed has now over taken our trusty 1Gbps access tier. What was the industry response? Cisco in January 2015 announced pre-standard Multigigabit Ethernet.

![nbaset1](/images/blog/nbaset1.png#center)

#### Why could this be important?

As wireless access points go beyond the capability to deliver 1Gbps throughput to clients (aggregated), what choices do we have to fatten the access pipes? 10Gbps? That’s not exactly cost effective. With most of the world’s copper cabling being of the Cat5e or Cat6 variety, there is a serious investment in sweat mode. Sure – we swap out switching and routers every few years, but cabling? Every ten years? How do you fancy ripping cables out of walls, from under raised floors, or even worse, making more holes and strapping new cables on top of the now redundant cabling if you can’t be bothered to remove the old if you do no have the resources to remove the legacy.

![nbase-t](/images/blog/nbase-t.png#center)

Cisco in the traditional style have gone ahead and released the NBASE-T pre-standard technology of 2.5Gbps and 5.0Gbps Ethernet on the Catalyst 3560CX, 3850 and 4500E platforms. During the Cisco Live Europe 2015 Tech Field Day Extra, [Peter Jones](http://twitter.com/petergjones) the vice chairman of the NBASE-T Alliance, delivered a great presentation. It appears however that the NBASE-T Alliance is pitching against tight timelines with this technology. Below is a short history of the alliance along with some future ‘finger in the air’ events.

#### October 2014

* NBASE-T Alliance is formed by four initial companies.
* Enable 2.5Gb/s & 5Gb/s over installed base copper cable
* Create a full ecosystem to support deployment
* NBASE-T advocacy

#### November 2014

* IEEE 802.3 holds Call for Interest (CFI), accepts the problem, and votes to start standardisation
* The NBASE-T alliance adopts NBASE-T 1.0 specification

#### January 2015

* IEEE 802.3 Study Group adopts the documents required to move the project forwards
* The NGEABT Study Group IEEE Agenda can be found here

#### March 2015

* Form the task force

#### May 2015

* First task force meeting

More information can be found [here](http://www.nbaset.org/momentum-builds-nbase-t-nbase-t-alliance-releases-specification-ieee-takes-steps-toward-standardization/).

Just to add some more fun to the mix, the [NBASE-T Alliance](http://www.nbaset.org/momentum-builds-nbase-t-nbase-t-alliance-releases-specification-ieee-takes-steps-toward-standardization/) is not the only player in this party. The [MGBASE-T Alliance](http://www.mgbasetalliance.org/home.html) is also pushing this technology. There are political complexities to both and this post will not speculate, however Cisco is only taking part in one and Brocade is in both!!!

This next bit is an extract from [this](http://standards.ieee.org/develop/corpchan/studygrp.pdf) document, but knowing very little about the actual process myself before talking to Peter, it might prove useful!

<snip>

If the Study Group recommends developing a new standard, the Study Group shall also provide the following items to the Sponsor: Draft PAR

* Available information concerning intellectual property, as appropriate
* Recommendation for liaisons with other organizations, if appropriate
* Draft project schedule
* Draft budget, if applicable

The decision of whether to utilize an existing Working Group, or to establish a new Working Group to carry out recommended work items from the Study Group shall be made by the Sponsor with due consideration of advice from the Study Group.

</snip>

Tell me what I can do today!

Cisco have announced a small line up of access technology loaded with this pre-standard. A good read on multigigabit and Cisco’s product line up is [here](http://www.cisco.com/c/dam/en/us/solutions/collateral/enterprise-networks/catalyst-multigigabit-switching/transform-workspace-cisco-catalyst.pdf). The Catalyst 4500E has a new 48 port line card with 12 ports of multigigabit speeds (1/2.5/5/10 Gbps), the Catalyst 3850 will have a multigigabit version of 24 or 48 ports with 12 and 24 ports of multigigabit ports respectively and the 3560-CX, a 10 port fanless switch will have 2 ports capable of multigigabit. Interestingly you can mix and match the 3850 model device with multigigabit and non-multigigabit devices. Investment protection?! Methinks yes!

![cisco_line_up](/images/blog/cisco_line_up.png#center)

A good Q&A document is [here](http://www.cisco.com/c/dam/en/us/solutions/collateral/enterprise-networks/catalyst-multigigabit-switching/multigigabit-ethernet-technology.pdf) for NBASE-T and Cisco’s take, which includes good information on cabling support etc.

To add to this, the current line up of devices will deliver 60 watts of UPOE power and MACsec. Impressive enough for a first pass?

#### Think before you spend money on cabling

If you’re pricing up an upgrade in an enterprise and you want to deliver 802.11ac Wave 2 for breath taking speeds, think about the cost to deploy cabling before you decide to opt out of this NBASE-T technology without a second thought. It could cost hundreds of pounds/dollars/euros to drop in new single cabling runs to support higher access point speeds. The NBASE-T Alliance gives you the opportunity to support newer speeds on existing cabling. It might mean another 3-4 years sweating your cabling install and saving money on a contract you are delivering. Some cabling like that based on ocean cruise liners, office blocks or shared spaces might not present the luxury of a ‘rip and replace’. Some enterprises just don’t have the cash available in a given financial year for upgrades of this nature. Whilst it might seem an odd approach to begin with, there is some clever logic going on here.

#### Close Out

In addition to Peter ([@petergjones](https://twitter.com/petergjones)) being the chairman of the NBASE-T Alliance, he also lead the delivery of the Unified Access Data Plane (UADP) ASIC on the 3560 and 3850 platform which is a programmable chipset that delivers these five features:

* Microcode programmable pipeline
* 240G Stacking Interface
* On Chip Micro Engines Fragmentation / Reassembly, Encryption / Decryption (AES-128, CBC)
* High-Performance Recirculation Path (less than 1usec Recirculation Latency)
* Integrated On Chip Netflow 24K Entries

Being quite smug at this point, I’m now the proud owner of a UADP chip which Peter gave me for asking nerdy questions. Here it is in all of its glory!

![doppler](/images/blog/doppler.png#center)

To close out this post using the original title, this could be the era of flexible Ethernet standards that cover what we need to and when. We often think of Ethernet as 1Gbps and 10Gbps as building blocks. When 40Gbps came out, it hurt heads. When 25Gbps and 50Gbps was spoken about it also made people double take. We can thank servers build for hyper-virtualisation for these speed increases. End users and the prolific and ubiquitous mobile community want to consume data delivered by these servers so it’s only natural that the delivery pipeline continues to grow to meet demands. It could take up to January 2017 for this standard to be formalised but it’s already come along way. For a final high level sweep over NBASE-T, check [this](http://www.nbaset.org/moving-2-5gbase-t-5gbase-t-toward-standardization/) document out which runs through high level objectives.

Reference to linked documents (because there are a few!)
[http://www.nbaset.org/moving-2-5gbase-t-5gbase-t-toward-standardization/](http://www.nbaset.org/moving-2-5gbase-t-5gbase-t-toward-standardization/)

[http://www.cisco.com/c/dam/en/us/solutions/collateral/enterprise-networks/catalyst-multigigabit-switching/transform-workspace-cisco-catalyst.pdf](http://www.cisco.com/c/dam/en/us/solutions/collateral/enterprise-networks/catalyst-multigigabit-switching/transform-workspace-cisco-catalyst.pdf)

[http://standards.ieee.org/develop/corpchan/studygrp.pdf](http://standards.ieee.org/develop/corpchan/studygrp.pdf)

[http://www.ieee802.org/3/NGEBASET/public/jan15/agenda_ngeabt_01b_0115.pdf](http://www.ieee802.org/3/NGEBASET/public/jan15/agenda_ngeabt_01b_0115.pdf)

[http://www.nbaset.org/momentum-builds-nbase-t-nbase-t-alliance-releases-specification-ieee-takes-steps-toward-standardization/](http://www.nbaset.org/momentum-builds-nbase-t-nbase-t-alliance-releases-specification-ieee-takes-steps-toward-standardization/)

[http://www.ieee802.org/3/cfi/1114_1/CFI_01_1114.pdf](http://www.ieee802.org/3/cfi/1114_1/CFI_01_1114.pdf)