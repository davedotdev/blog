---
title: "Automation and State"
date: 2017-07-31T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Automation and State"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

![Stateless](/images/blog/stateless.jpg#center)

#### To State or not to State

> State</br></br>
> State its purpose.<br/>
> That is a state matter.</br>
> It was a messy night. Alice was filthy. She was in a state.</br>
> The router had some state.

#### What to do with state

Automation is a constantly changing state of affairs. It raises questions like:

1. If a service or API is idempotent, do I have to track state?
2. Should my workflows consider external state?
3. Should I normalise state?

#### Idempotency

Something is said to be idempotent if it gives you the same response if you call it repetitively.

I always view idempotency quite simply.

1. Bob makes a terrible mistake building a NETCONF server for Alice.
2. Alice punished Bob with the task of hoovering the office floor.
3. Bob starts hoovering at 3pm when Alice is out of the office.
4. Alice Tweets Bob mid-hoovering (because they’re millennials) with “Bob, it’s time to hoover.”.
5. As Bob is idempotent, Bob carries on hoovering and ignores Alice’s Tweet.

If Bob wasn’t idempotent, he might have packed away the hoover, gotten it back out and started hoovering again (also assuming Bob was actually delivering on his punishment and hadn’t outsourced it to a cleaner).

Can you imagine the chaos if a switch deleted and re-created a VLAN every time you inserted a number that already existed? Depending on the speed of the CPU, theinterface between the CPU and the forwarding system (HW/SW) and the speed of the data-plane interfaces, the number of frames dropped could be catastrophic! It’s a clear sign that idempotency is at play here and the control-plane tracks the VLANs that are currently active. We do not know however if the control-plane investigates the data-plane. That’s not clear from just looking at the operational interface of the software.

Let’s reframe this query. How do we view idempotency through the lens of automation?

Just because something should behave the same does it? Can you rely on it? Answer: Test test test test test. With automation we can also automate the tests!

Checking for the existence of a setting or field can result in quicker execution of workflows. For instance, I could send a complex payload of data to an API, which might process 99% of it before rejecting due to a collision or duplicate entry. If my workflow doesn’t handle a data collision, then I’ve crashed out with an error code. If I do a GET first and validate and assert prior to pushing data for each state of my workflow, the chances of errors are reduced and barring the time spent error checking, I can be sure I’ve minimised ill spent time. This can be critical in infrastructure that expects timely and mostly error-free responses.

Summary: avoid spray-and-pray.

#### Should my workflows consider external state?

Yes.

This is a complicated one and we must consider the scope of the workflow, end-points to influence and the validity of state. Workflows are the operational software manifestation of a process. These workflows should handle errors and the integrity of data just like your mental processes do.

Let’s consider an example. A network operator provisions services using a workflow driven automation engine. Orders are fulfilled automatically from the order system. Engineers sometimes get involved to build complex services, but use the same workflows that the order fulfilment system consumes. Therefore, the source of truth is up-to-date and the local data is considered the first-class citizen. What about Bob? Bob is responsible for new products and it’s normal for him to try new things out that do not fit the service models. The things Bob does are not tracked by the workflows. So what do we do here?

The higher the quantity of data to validate and assert during our workflows, the longer the workflow takes to execute and the more complex it appears. I would argue that workflows that validate their scoped data ensures integrity and data assertions are cheap in terms of clock cycles when compared against workflow execution time. Do we need to know what physical ports the VLANs are forwarded over? Do our workflows need to know? It’s possible this one does, but if it doesn’t then don’t collect the data. Data collected should expire and be refreshed.

It’s critical practice to refresh the data prior to the execution of a workflow to ensure cleanliness and that our cache reflects the true state.

> If Alice’s team could write north-bound-interfaces that were idempotent, I wouldn’t have to validate my data”</br>
> – Bob</br>
> It’s no surprise Bob has all sorts of punishment routines to deal with.

If our workflows are well thought out and we consume only relevant external state, then we’ve built for reliability and predictability. We’ve also decoupled ourselves from other poorly implemented code elsewhere.

Summary: If the end-game is success, then stop pushing the buck when failure raises it’s head. Put the buck away. Avoid failure by being proactive.

Should I normalise state?
When was the last time one system you worked on represented data the same way as something else that does a similar job? Imagine two coffee machines from different vendors. As an office visitor and occasional worker, I’m familiar with several coffee machines. Each type consumes coffee differently. Some need beans, some need capsules. Some deliver milk, some do not. Some have water piped in permanently, some you need to fill up a reservoir. Some will give you a macchiato, some will not. Both still give you coffee.

Domain Specific Languages (DSLs) exist to provide a level of data abstraction. JSON representation is good for software yet YAML is good for humans to read. Both can be used for very similar things but one is friendlier on the eyes.

To provide true de-coupling from end-points we aim to influence, then our state needs to be normalised at a layer higher. By ‘normalising’ this data, anything can consume it, transform it and update it.

Normalised data is our currency for automation, which can be passed around easily.

*Vendor Data*

```bash
telnet@ICX6610-Stack#show vlan brief

System-max vlan Params: Max(4095) Default(64) Current(64)
Default vlan Id :1
Total Number of Vlan Configured :3
VLANs Configured :1 10 100
```

This output tells us some things about our VLAN database. It doesn’t however tell us much about the VLANs.

We can do better. Here’s some normalised data.

*Normalised data*


| Key | Value |
| --- | --- |
| VLAN:1 | Default |
| VLAN:10 | Build VLAN |
| VLAN:100 | New Product VLAN |

</br>

We could represent this in YAML:

```yaml
---
VLANS:
  -
    name: "VLAN:1"
    description: "Default"
  -
    name: "VLAN:10"
    description: "Build VLAN"
  -
    name: "VLAN:100"
    description: "New Product VLAN"
```

This data is still readable and can be consumed by workflows and serialised and put into a data-store for ease of access and manipulation.

#### Stateless Automation

If we have normalised and validated our state, we have a ‘generic data set’. This data set can be fed in to generic workflows without fear of data from one vendor of an API screwing up another. This data is available to use at a metadata level (data that describes data).

For data input, we normalise the data and store what’s relevant with a validity period.
For data output, we transform to the domain specific type or style.
Our workflows become metadata workflows and have no relation to the end-point style or types of data.

1. Get ‘VLANS’
2. If ‘NEW_VLAN’ is in ‘VLANS’ do c) else do d)
3. Return “EXISTS”
4. Push ‘NEW_VLAN’ to ‘METRO_NET’ + UPDATE_DB

Using these paradigms, our workflows can be truly stateless and through the power of variable interpolation, simple workflows such as creating VLANs on switches can be re-used across any number of vendor devices.

#### Summary

Data validation and data transformation result in high success for workflow execution. It allows us to insert state into workflows not pinned to a single vendor or style of device. Our workflows can be stored state-free, but deal with state at runtime.

Even though it seems logical to rely on operating systems and APIs to handle idempotency, to be truly agile and keep up with your own demands, protect yourself with clean, normalised and fresh state and check for collisions prior to creating API calls.

As we move fast to close our requirements, you can avoid snagging and false bugs being raised with a little investment at the time of creation.

Scope your workflows, understand what your surface level adhesion is (what API types and specific calls are available), understand your data and how it should be manipulated north and south bound to ensure maximum decoupling.