---
title: "Exceptions are not normal"
date: 2025-02-02T10:00:00+00:00
image: images/blog/diary_entry_header.png
author: David Gee
description: "Exceptions are not normal, so quit trying to make them normal."
signoff: Dave
mermaid: false
categories: 
- blog
tags:
- microsaas
---

_**TLDR** This is a cold hard rant with a splash of preach. There is nothing of technical value in here._

The word <span style="color:red; font-weight: bold">Exception</span> conjures fear into the heart of developers and operations teams alike. It means something.

{{<img75centerlink href="" src="exception.png" alt="Definition of exception">}}<br/>

When I see exception appear in a system, it means _excluded from the general system_ and is not a normal state. It's not part of the rules of the service or product. If software has an exception, the developer might joke about it being a suprirse feature, but joking aside, it's not a normal operational state.

The table below is from a delivery service. I ordered a new printer _(paper, not 3d)_ and expected it on a next day delivery. Turns out, an Exception happened. It would seem to me, that missing a delivery deadline is a normal part of a delivery service's outcome no? Why would this be an exception I wonder?

1. Avoid challenges from people outside the business by making it sound bad _(bad)_
2. Developer doesn't understand the business _(bad)_
3. Manager told the developer to do it _(bad)_
4. A weird SLx state to prevent refunds _(bad)_
5. Explicit state to cover service oversubscription _(bad)_ 

{{<img75centerlink href="" src="delivery.png" alt="Delivery table">}}<br/>

Even the fields make little sense here. **OK** and **Exception** being the Status? Status of what? The software? The van? The process? Given this is externally viewable data, this could be made clearer and less angering by just removing the first column from the table.

When I was young, I delivered newspapers, pizza and Chinese food. Let's take my working knowledge and figure out if this was an exception or not. The information in the table has the audience of recipient, so let's make sure we contain states relevant to the person expecting the goods.

**Delivery States**
- Delivered
- Attempted Delivery
- Out of time
- No one available to take delivery
- Could not find address

**Internal Delivery States**
- Got caught out whilst pretending to knock and run
- Dog ate package
- Driver ate package
- Driver destroyed package
- Couldn't find the house
- Items were stolen
- Items picked
- Items loaded to van
- Driver reached max hours

Note that lack of exception? We could get really silly and add further entries like _act of God_ and _act of war_, which will be relevant for some countries. Exception in this case is just poor design.

Not receiving a printer is a minor annoyance, but I'm treating this as a great reminder of the aspects involved for creating even the simplest of services or products. A lot of this tends to cross blurry lines into things like Domain Driven Design (DDD) and Agile etc, but the top level discplines worth pinning on a notice board are below.

### Design Thinking
A customer-centric process that focuses on understanding the user's needs.
A way to make decisions based on what customers want, rather than on instinct or historical data.
A process that helps create products that are profitable and sustainable.

It is _**NOT**_ throwing the idea at a designer and asking them to do more than throw a crappy sketch together.

### Design Delivery
A process that ensures all team members are aligned with the intended design (true cradle to grave).
A process that involves product development to turn mock-ups and user insights into a working and acceptable solution.

It is _**NOT**_ turning your back on the design when it crosses out of your realm. Ensure that the teams in your proximity are aligned. The days of throwing stuff over the wall from development to ops has a not so new name _(DevOps of course)_, but the old habits must die. It's all our problem.


# Summary
It might not be sexy, but dealing with the basics is of critical importance. An exception that occurs as part of normal business is not an exception. Being exceptional is what sets mediocrity from greatness. Make that extra 10% investment and get ahead by digging in deep to what you're involved in.




