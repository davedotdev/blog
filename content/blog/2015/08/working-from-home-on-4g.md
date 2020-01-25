---
title: "Working From Home On 4G"
date: 2015-08-11T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Working From Home On 4G"
signoff: Dave
categories:
- 4G
tags:
- 4G
---

In April 2015, my partner and I decided it was time to move in to our own (first) place together. As a teleworker this brings it’s own set of issues, mainly in the name of connectivity and climate. BT traditionally have been able to offer generous enough requirements, but as enterprise technology has evolved to consume more bandwidth, BT have slowly fallen behind. FTTC or Fibre To The Cabinet (VDSL), also known as “Superfast Fibre Optic Broadband” offered by the likes of BT and Sky to name but a couple, serves my needs well providing I have access to a local street cabinet that has a spare port on a VDSL capable device.

{{<infobox>}}
For those also wondering about the state of “Superfast Fibre Optic Broadband”, it turns out after many court cases mainly with BT and Virgin in the UK, it’s fine to use ‘fibre optic’ in product names as long as fibre is used somewhere. Unbelievably misleading and it cheeses me right off.
{{</infobox>}}

So it turns out, after confirmation from BT that our to be purchased house can indeed receive FTTC, we purchased, completed and started renovation work. It was time to place the BT order!

#### The BT Order

BT lied through their teeth. Not only had their system notified me of the availability of FTTC, it turns out it was so heavily in demand that BT couldn’t give us any kind of a time frame ‘when’ I could get the service. This is not a domestic service either I quickly add here. I pay for a business service with support so that when my WAN circuit is down, BT will aim to get me operational within a specific time frame. After many hair ripping conversations, it turns out BT’s internal systems are so poor, my service manager could only give me availability information after my ADSL (1Mbps down sync speed, 800kbps up sync speed) was connected and functioning.

#### The Shoddy Install

A BT contractor installed my telephone extension in to my office as per request. Smashing a brick face in the process and chipping corners of other bricks as he went. The master outlet was also on wonky, which for those who know me well, knows this irks me something chronic. Cable tie ends were not even cut off! To boot, the cable had been breached in several places by the cable clips and the brick work. Judging by the cable, it had received a deathly blow several times.

![bt1](/images/blog/bt1.jpg) ![bt2](/images/blog/bt2.jpg)

The River
So, after a careful set of communication between BT, I cancelled our land line and the totally unusable ADSL, refusing to pay any costs involved with the move or additional extension (which is in a bin bag). Also I’m in the process of claiming damages to our property, which I’m most unhappy about.

#### The Re-Frame

So what are the alternatives? If BT, Virgin, Sky…and the other myriad of UK providers who mainly provide last mile through BT, cannot provide me suitable and usable connectivity, where do I go? 4G sprang to mind as a possibility and the investigation began almost immediately.

Reasonably quickly, I found a suitable 4G MIMO antenna and a router that could deal with my requirements that also had a slot for a traditional SIM card. Turns out this router also runs Quagga along with other OpenSource tools which put a huge smile on my face.

EE in the UK (previously Orange and TMobile) offer a 50GB a month data only SIM that also comes with an Osprey device, a re-chargeable thus mobile hotspot. Not needing the Osprey I requested just the SIM, but it turns out the cost never changed, so decided to accept the ‘gift’ and put it in my gadget box.

#### The Install

A sunny Sunday morning allowed me to install the cranked antenna bracket (traditionally for a terrestrial antenna) and install the MIMO 4G antenna, running the cables down the house as neatly as possible and in to my office where they terminate on the proroute.co.uk device.

Getting the cables through the wall of the house involved drilling through two rows of bricks and through a cavity that had insulation. For this my trusty 8mm 1m long drill bit made easy work of it. Ensure you leave the antenna connector rubber caps on which protect the connector’s journey through both walls. Putting the cables through the wall can be fun, so use a straight piece of strong wire (like an old fashioned coat hanger) to help guide them through. I use cable rods, but they’re too expensive for one job! Also, I found 1.5mm twin-flat cable clips could handle both of the antenna cables side by side, so nailed one of those spaced apart by a brick length until the cable passed through the house walls, being careful not to a) hit the cables or strain them b) not to damage the bricks themselves like BT before me. Finally, I hate seeing messy cables going through walls, so passed the Cat5e and antenna cables through an external brick coloured cable cover.

![4g1](/images/blog/4g1.jpg#center)

The router itself came with all the instructions any seasoned network engineer requires, which equated to how to set-up the APN (access point name) along with admin credentials to the device itself. I like those kinds of instructions! After a firk about, it turns out I can do other stuff with the device I previously had a virtual router doing (Quagga etc). For ease I also screwed it to the wall.

![antenna](/images/blog/antenna1.jpg) 

![internal](/images/blog/internalrouter.jpg)

Please bear in mind, this was install day and I had not a) hoovered the brick dust b) terminated the Cat5e points 🙂 I was racing against the weather!!!

![routeradmin](/images/blog/routeradmin.jpg#center)

Which leaves the question, what kind of performance do I get? On average I get 15Mbps symmetrical, with 30ms RTT to London. It’s totally acceptable for work and even holds a Lync session down, which I’m super happy about.

For the curious amongst you, here is a list of parts I consumed whilst building this little set-up:

#### Router

[Proroute.co.uk HS820](http://www.proroute.co.uk/proroute-4g-routers/proroute-h820-4g-router/) – 4G router with dual antenna, wifi and 4x 10/100 LAN ports with a WAN Ethernet port for fail-over scenarios

![4grouter](/images/blog/4grouter.gif#center)

#### Antenna

[Omni directional 6dBi gain full band 4G antenna (MIMO)](http://www.3grouterstore.co.uk/3G/Fullband-MIMORAD-MiMo-Radome-4G-Antenna.html)

![Fullband-MIMORAD-4G-Antenna](/images/blog/Fullband-MIMORAD-4G-Antenna.gif#center)

#### Bracket

30cm Cranked Bracket with 50mm diameter pole

![cranked-bracket-30cm](/images/blog/cranked-bracket-30cm.jpg#center)

#### Close Out

BT be warned. The shoddier your OpenReach services get, the more alternatives become viable. I’ve personally seen several horror stories recently of master points being installed in between water taps, on a staircase and other mad places, not to mention the constantly bad workmanship. If the mobile operators continue to increase capacity and capabilities, with the advent of 5G, traditional telco services will be under threat like never before. When FTTC is available to me, I will have to think long and hard whether I want to be at the mercy of the workmanship, never mind the more expensive hard-wired service.

#### Warning and the boring bit…

Please be careful if you’re going to do this yourself. I’m a competent electrician in addition to my networking skill set, so more than at home up ladders, drilling holes and cabling. I do not hold any responsibility or accountability for your project, your safety, home or sanity! Consider yourself warned and myself vindicated.



