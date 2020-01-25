---
title: "Some Thoughts on Leaky Abstractions"
date: 2017-10-16T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Some Thoughts on Leaky Abstractions"
signoff: Dave
categories:
- Abstractions
tags:
- Abstractions
---

![not-how-that-works](/images/blog/not-how-that-works.jpg#center)

I hear people talk about leaky abstractions all the time. I’m not sure that some of the people that use it have researched the term.

As network-automation blurs the line between software and networking, terms like this are used more commonly than you might expect.

When you hear someone say ‘leaky abstraction’, what does it really mean? This question drove me to a little research effort.

The term ‘[leaky abstraction](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/)‘ was popularised in 2002 by [Joel Spolsky](https://www.joelonsoftware.com/). I totally misunderstood this statement when I first heard it, so naturally the researcher in me went off trawling the web to get a more correct view.

My original and misinformed understanding is explained in the example below.

#### The Example

Taking the example of a car, the abstraction interface or vehicle controls allows a user to manoeuvre the vehicle between a start and end point whilst keeping the passenger as comfortable as possible.

A car has air modification capability, human body heaters and it can even project audio to your ears. Most vehicles have an on switch (engine start or power switch), they have directional and velocity controls that come in the form of a steering wheel, a set of pedals including accelerator (gas), a gear shifter, brake and on manual vehicles a manual clutch.

My original interpretation of a ‘leaky abstraction’ would be having to change the air to fuel ratio for the engine by hand. The engine should take care of this and as a driver, it cannot be assumed that drivers have mechanical or chemistry skills to understand or manipulate the ratio correctly. The inner workings of the engine are exposed through an otherwise simple abstraction layer. My interpretation was this fuel mixture example, is a leaky abstraction or ‘something polluted the abstraction’.

On an electric vehicle, this air to fuel ratio control does not exist. The abstraction layer although nearly identical in every way, is different.

So, what could be a leaky abstraction here? How about driving your vehicle over different terrains? For this, let’s assume your abstraction layer is: accelerator, brake, steering wheel.

Under normal conditions, a vehicle goes where it is pointed towards. A leaky abstraction could be the fact the vehicle misbehaves when on ice or sand, providing feedback through the controls. Some vehicles cope with it better. For instance, a car with great traction control software will cope with different terrains differently to one that just has a mechanical differential. Your experience between two vehicles, despite having the very same abstraction layer will differ massively. This is my interpretation of ‘leaky abstraction’ using vehicles and our very basic abstraction layer consisting of accelerator, brake and steering wheel.

#### So why do I need to worry about it?

Don’t panic! Leaky abstractions can cause problems for automation workflows and it’s your duty to figure out how behaviour changes when something out of your control through the abstraction layer changes. Do you want to feel the effects of driving on snow? Or do you just want to try and move forwards and be told if that’s not possible?

Do your homework when using software libraries and automation tooling to ensure that the abstractions you use will behave in a way that are manageable. I like to use [NAPALM (Network Automation and Programmability Abstraction Layer with Multivendor support)](https://github.com/napalm-automation/napalm) as something that does a reasonable job of hiding the underlying complexity. A vehicle view of this would be, consumers do not need to worry about what settings are in the engine, but a mechanic can tweak them from time to time. NAPALM has this similar approach. To consume is simple, to fine tune requires a bit more skill. What happens in terms of leaks? Well, latency or jitter of packets to and from devices can leak through in terms of broken calls and it’s possible to receive malformed data because of vendor code changes.

[Joel Spolsky uses the example of TCP](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) consuming the IP technology to describe leaky abstraction. If you haven’t read the article, it’s a must read!

#### Summary

[Tony Hsieh](https://codeahoy.com/2016/05/06/good-abstractions-have-fewer-leaks/) to my amusement also used the concept of accelerator on a vehicle one of his blog posts. This is worth a read.

Leaky abstractions in automation can cause problems higher up the stack (think metadata and passing it around) so always make sure you handle your logic with error handling and timeouts to ensure your result is deterministic.

As always, these posts represent my own learnings and thoughts. Feel free to comment and open up the debate.