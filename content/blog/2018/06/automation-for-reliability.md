---
title: "Automation for Reliability"
date: 2018-06-14T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Automation for Reliability"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

Statistics says, the more often you do something, the higher the chances of a negative event occurring when you do it.

Applying this revelation, if you fly regularly, the chances increase of a delayed flight, or being involved in an incident or accident. A somewhat macabre reference perhaps.

Let’s take something real which happened to me this week (11th June 2018). Whilst working out of one of Juniper’s regional offices, I returned back to the hotel room to carry on working whilst putting my feet up. Something felt strange in the room but I couldn’t put my finger on the weirdness. After a couple of hours, I realised that all of my belongings were gone from the room. Everything! Thanks to a mix-up with the house keeping system, the maids threw my collection of travel items in to some bags ready for disposal. Thanks to a procedure that the hotel operates, for my items to be thrown to the garbage, a manager is required to sign off on the request. A process saved my belongings and I’m thankful that the managers knew this process and also knew where my stuff was likely to be. Before my items were returned, I had already been equipped with emergency toiletries and was settling down for the evening as a knock on the door came. This is a great frame for an automation story.

In the scope of automation, assume a workflow is composed of solid components (i.e. they do one job well, consume structured inputs and return meaningful error codes and structured outputs). These solid components will communicate with what we can assume is an abstract layer or a network device. If we change the device code, we can assume at some point a failure will occur in one or more of these components thanks to interface mismatches and feature creep. Workflows that have been built with “design thinking” methodologies will test for failure scenarios. These failsafe tests are designed to prevent catastrophic failure derived from badly behaved workflows or faulty underlying components. Using the flight example made earlier, it’s true that only so many catastrophic scenarios can be mitigated against. On the other end of the spectrum, a pilot observing flashing warning lights would not attempt to take off. A meteor striking your aircraft like a well-honed pint swilling dart player hitting a bullseye would be something you cannot mitigate against. Using a term that you will get used to very quickly this year, “aim to increase reliability” in both the outcome of your workflow and the processing of it. It’s an NRE (Network Reliability Engineering) tenet. Even if the workflow burns and crashes in the depths of computing hell, it must part of your design process to alert a human of non-recoverable failure. ChatOps is a great candidate for this.

With my hotel experience, the maids were acting autonomously without much thought. They checked their work sheet and it said what it said. No logic that says “Hey, this person’s stuff is here” seemed to be apparent. You could argue here that housekeeping is a well-oiled autonomous process and the hotel’s overarching processes wrapped reliability gains closely to the simple automations of said housekeeping. The outcome was to prevent guest’s items from being accidentally trashed and it worked. They engineered for reliability.

Successful automation is 90/10 in the favour of composition vs tools. Design in the name of reliability eats tooling for breakfast.