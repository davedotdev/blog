---
title: "Discussing Disruption to IT"
date: 2016-10-03T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Discussing Disruption to IT"
signoff: Dave
categories:
- Disruption
tags:
- Disruption
---

![epiphany](/images/blog/epiphany.jpg#center)

Disruption has come to mean different things in the realm of IT. It’s difficult to read social media for a day without seeing the word "disruption" abused by the great marketing machine.

Using this word in the context of "disruption to service" or put it another way, "What happens when something doesn’t work?", it’s difficult to come up with a good anecdote to describe the impact of something going wrong when you’re in front of customers without sounding like another marketeer. I firmly believe in delivering value by "showing" as opposed to just battering your audience with slide ware. 

Still, in networking we are actually going through a period of huge change. The CLI skill set is still dominant and I’m not scare mongering when I say over time this will change. It will. It just won’t change as fast as some people will have you believe. Anyway, I digress. 

#### Fred

At college, I studied the greatest passion in life I had at the time, which was electronics. The local college department was ok and the material was industry standard stuff. Nothing crazy and out there, but useful and real. We had one super hero in the faculty though, a real differentiator in the form of Fred. Fred was a lecturer/tutor/lab technician and vat of experience in one body. In short, he was awesome and I still remember many of the pearls of wisdom he shared with our group.

One day whilst discussing electrical noise, Fred described some interesting findings. He drew a graph of a sine wave with time on the x-axis and amplitude on the y-axis. The sine wave had an amplitude of 230 from trough to peak and a duty cycle of 20 milliseconds. For those in the UK, you might recognise this graph as our 230v 50Hz UK mains voltage. 

Fred went on to recite in absolute hilarity the story (he was Scottish and his impressions were impressive) of a cleaner in a silicon plant. Every now and then a batch of silicon would go wrong and they found out that the cleaner was connecting her floor buffer to the same supply as the plant machinery. Yikes!

He went to draw on the graph a spike of noise which was 1 millisecond on this sine wave. We could smooth this and ok, whilst one millisecond of noise wasn’t the end of the world, it was enough in some circumstances to cause chaos. We then started talking about sampling and if we sampled this signal with a rate of 100Hz (Nyquist theorem) we could get a good 50Hz wave with added noise. What if we sampled at a higher bitrate? Well, the noise would of course cover more samples. He then made the sine wave faster and we reduced the duty cycle to one microsecond (1 MHz) and then re-introduced the noise. Our noise appeared monumental in size, covering one thousand cycles! Damn. That’s a lot of data lost and not just one ‘blip’.

#### The Penny Dropped

So whilst driving one day and trying to quantify in a really nice way disruption to services, Fred’s talk came rippling through the memory pool. 

I always try and go for meaningful ways of describing things that resonate and I thought this was fantastic. How is this applied to today’s "software is eating everything" set of challenges? Disruptions to services we access on the internet used to be meaningless. Couldn’t log in to eBay for a day? Oh well. Move the clock forward a decade and more and what happened is people’s whole livelihood can be made from eBay. To those people, you lose income. Imagine walking around an unknown city without Google Maps. When was the last time you walked in to a shop and purchased a map?

Unavailability of services however inconsequential they may seem, in the same way our 1mS noise spike affected our 1 MHz signal, for those that rely on them, disruption can be catastrophic. 

Without even thinking about it, I plan train and flight journeys through the associated apps, wake up to my alarm app, find places using an app and send messages to friends and colleagues using an app. 

#### Close

Despite Fred’s brilliant impression of the cleaning lady riding a floor buffer, electrical noise shows disruption in a super insightful way and it’s always nice not to say "You have to change because…isn’t it obvious?". With network automation hitting the headlines in ways not seen before, trying to discuss the relevance and importance of closing the feedback loop and handling events as quick as they happen becomes high priority. Humans just can’t react that quickly  nor in the scale required in modern environments. A business doesn’t have a thousand cycles to react to change.