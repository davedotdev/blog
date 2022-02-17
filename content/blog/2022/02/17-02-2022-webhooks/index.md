---
title: "Webhooks - Drain Mechanism"
date: 2022-02-17T10:00:00+00:00
image: images/blog/complexity_header.jpg
author: David Gee
description: "Some coffee thoughts on webhooks."
signoff: Dave
mermaid: false
categories: 
- software architecture
tags:
- software architecture
---

Webhooks are the sticky tape of system integration and how you deal with them is key to ensuring a happy system.

TL;DR if you implement webhooks in any system, it's worth implementing a drain mechanism for the webhooks you don’t know how to handle and for those sent in error. Loose-coupling and Scaling systems up and out, present similar challenges regarding handling duplicates and errors. 

## The Internet’s Sticky Tape

A webhook is nothing more than an HTTP POST with some contents, typically `json`. In the SaaS space, webhooks also come with a signature allowing you to validate the contents, which is important to prevent attacks and ensure the integrity of your system. Systems that transmits webhooks typically have the process directly below. A lot of systems I observe do this:

1. A system raises an event
2. Sends webhook
3. Gets response, exit

The receiving system is expected to respond. Most do so blindly. If the response signifies an issue, the sending system is oblivious to the downstream problem and consider their job done.

SaaS systems typically do this:

1. A system raises an event
2. A data object is instantiated and signed using their private key
3. The system sends the webhook and expects to see a 2xx code.
    1. If no 2xx code is received, queue a retry event
    2. If retry event, send 3x times and send alert to system admin of error
4. The receiving system verifies and validates the contents of the webhooks and handles the data appropriately. 
    1. If the system can handle the data, then respond with a 2xx code.
    2. If the system cannot handle the data due to a genuine issue, respond with an appropriate code, alerting the upstream system to an issue.
    3. If we do not care about this webhook, respond with a 200. This acts as a drain.

When I test systems, I’ll hack around with purpose. That means I take a service offline, tweak it, re-compile and launch. After some long testing cycles, I found a rather large number of stray webhooks flying around and now implement a default drain feature. If there is genuinely an issue, my logic tells the transmitting end with a 3xx, 4xx or 5xx response code, but if I can’t make sense of it, or if it’s a duplicate, I send a 200 response back to relieve system pressure. 

When I’m developing code meant for hosting on the internet, I use [Ngrok](https://ngrok.com), which allows me to forward ports from the correct domain to a locally hosted service, without touching my home firewall. Ngrok gives you a basic but usable CLI front-end which one morning showed an entertainingly large count of unhandled webhooks. I figured it was worth a short note.