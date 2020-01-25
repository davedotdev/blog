---
title: "Big Switch Tap Fabric"
date: 2014-09-25T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Big Switch Tap Fabric"
signoff: Dave
---

Before we go in to observed trends, let’s put some context on this post and definitions around monitoring. Network monitoring and tapping, this can be described as “packet capture, packet and session analysis and NetFlow generation with analytics”. Tap fabrics typically provide a means of extracting packets from a network but not so much the analysis. Tools like Wireshark, Lancope’s Stealth Watch and a good IDP solution are still required.

#### Current Situation and Legacy Methodology

In days of past (and most current networks), if you want/ed to harvest packets from a network the quickest route was to mirror a port to a server running Wireshark and filter the results to make sense of what was going on from a protocol and application point of view. Cisco have tools like the NAM, which comes in several forms such as a server, Catalyst 6500 switch module and ISR module. The NAM allows you to visually observe network trends and network conversations via generated graphs but also inspect by download the PCAP files. Probably one of the most pleasant experiences most people have in addition to Wireshark.

Some shortcomings exist with this approach in so much as the device that receives the mirrored packets can become overwhelmed. Even if you filter on Wireshark, the device NIC is still receiving every packet that’s thrown at it. This takes a reasonable server and good NIC to keep up. Also, if you run several analysis tools, it means configuring multiple port mirrors. Hammer to crack an egg perhaps.

#### Tap Fabric Trends

[During Network Field Day 8](http://techfieldday.com/event/nfd8/), we met up with both [Big Switch](http://bigswitch.com/) networks who presented the [Big Tap Monitoring Fabric](http://bigswitch.com/products/big-tap-monitoring-fabric) and Gigamon who in turn presented their GigaVUE technology. This article focusses on Big Switch’s technology. 

![Big Switch](/images/blog/bigswitch.png#center)

The Big Switch Big Tap network is based on original design manufacturer (ODM) bare metal switches, commonly known as ‘white box switches’ which in turn run Big Switch’s Switch Light operating system. This operating system is bundled with the Indigo OpenFlow agent and closed driver that exposes multi-table capabilities of the Trident 2 chipset with the Layer 2 and Layer 3 tables providing 100,000 flows! The latest release of their Big Tap software (4.0) can also can match up to 128 bytes within a packet using regular expressions, which recognises applications such as GTP, VXLAN and MPLS. These packets can then be forwarded across the fabric to analytical tools. The Big Tap Monitoring Fabric is designed with the following statements in mind which are: tap every rack, tap every location.

This results in a total visibility scenario, where potentially a device or pair of devices reside in a pod for this purpose. Cost can be naturally be an issue with a wide deployment of tools such as this, but with Big Switch relying on original design manufacturer (ODM) devices such as those by Accton. These are commonly known as white box switches and costs are low to start with.

The Big Switch Tap software actually resides on a controller (or two) that then interfaces with the Switch Light software on each of the ODM/white box switches. The controller then provides a single control interface (notice how I avoided the term ‘Single Pane Of Glass’?) to control the tap fabric. The controller could also be automated with REST APIs which means a work flow could ‘automagically’ configure the analytical tools and the monitoring fabric. Interestingly a Wireshark capture can be done directly on the controller.

When it comes to a distributed tapping fabric between data centres, Big Switch can also provide federation between locations using tunnelling. One fabric is connected to the other over a L2-GRE tunnel.

Big Switch also promotes repurposing of traditional network packet brokers (NPBs) which provide simple functionality. This is a nice way for customers to elongate the life of more expensive legacy purchases and retain useful functionality.

Big Switch aren’t new guys at this now either, seeing multimillion dollar deployments over 16 data centres.

By design the Big Tap monitoring fabric does not provide service stitching capabilities where packets can be redirected through something like a transparent firewall, or IDP solution. A monitoring solution should be a monitoring solution.

Below shows the Big Switch Tap offering in an easy to swallow graphic. Special thanks to Kyle Forster from Big Switch for providing this suitable image.

![Big Tap](/images/blog/Big-Tap-9-24-14.png#center)

Nice and simple right? It’s worth mentioning that Big Switch have partnered with Dell to deliver solutions and the Dell “open network switches” can also run Switch Light to take part in the tap fabric. These devices are from the Force10 acquisition and represent an interesting move from the company best known for providing servers!

#### Big Switch – Virtual Network Choices

Big Switch have the ability to decapsulate remote-SPAN ports (GRE-esque), where tapped packets are effectively tunnelled to an end point. The other option of course is to span all traffic to a NIC port directly on to the tap fabric from a virtual switch such as the Cisco Nexus 1000v or Open vSwitch.

#### Close Out

I have no doubt where cost is an issue, Big Switch will serve a purpose. I have to respect the intelligence of Big Switch here as I realise that as ODM devices can be demoted throughout their normal operational lifecycle as higher port counts are required or port speeds aren’t high enough and repurposed as tap devices.

#### Disclaimer

This article is an independent post of the Big Switch technology. Whilst the Tech Field Day team covered some of the cost of my travel, sustenance and accommodation, they nor anyone else has purchased my opinion or self respect. All thoughts and opinions are my own and I eat my words if I have to.