---
title: "Natural Systems vs Human Fallibility"
date: 2020-02-28T16:00:00+00:00
image: images/blog/complexity_header.jpg
author: David Gee
description: "A short set of thoughts on self-organising systems"
signoff: Dave
categories: 
- Software Design
tags:
- CAS
- self-organising systems
- natural systems
---

Some thoughts on systems that I describe as natural ones. These systems allow constituent components to behave within confines of wider system rules and don't care for specifics. They are self-organising systems and beautiful in my opinion.

Take a car park, with a single entrance and single exit, with a three-hour vacancy limit, enforced by a financial fine. The car parking area is divided into a grid, with a service road running the perimeter to allow vehicle drivers to “search and park” between sub-grids. Let's view this perimeter road as a stack shortcut mechanism.

The dynamics of this car park can be as such:

* __Car Park with 100 spaces__
  * Is an unordered queue with single input and output paths
  * Has mechanisms to improve queue management with equal spaced stack shortcuts
  * Enforces rules by imposing financial fines


* __Driver with eyeballs, that can see free spaces__
  * Driver that doesn’t see free space, typically moves to next sub-grid and takes the nearest stack shortcut
  * Driver also has to promise to keep within 3 hours consumption bind

*The intention is to keep this post short and so, it lacks formal representation and analysis. Exercising that route will no doubt result in several iterations of the representation above, so please don’t get too wrapped up in what’s missing*

Three main modes of car park operation exist; Natural, Automated and Orchestrated. 

__Natural__
Car drivers traverse the car park by merit of their implicit algorithms. The car park has no control over this. People will solve the parking problem their own way. 

__Automated__
The driver vacates the car at an ingress parking zone, receives a reference (ticket) and leaves. Now, a valet, will either park the car in a natural, orchestrated or pre-determined way. When the car driver returns, the reference is handed in, the car retrieved and the reference is trashed.

__Orchestrated__
This involves the car park having a sentinel. This sentinel wears a high visibility jacket and has the power to stop cars and point then to the right sub-grid and advise they park there. If the driver doesn’t take the advice, the sentinel may get in a mood, but has no authority to physically move the car or reprimand the driver.

Two extra thoughts here:

__Un-supervised Predetermined__
A system allocates spaces and treats the car park like packing memory. The car drivers are told where to park and the system “hopes” the driver kept the promise.

__Supervised Predetermined__
In this system, the promise is validated and the memory map is adjusted to reflect the parking of the car. This could be the space allocated, or the new one if the driver went rogue. 

#### Illusion of Determinism

The 'car park' ideal scenario is to be as deterministic as possible and instruct drivers where to park and how to handle punishment etc if drivers misbehave.

In my somewhat simpleton brain, the mechanics required to handle the car park in this deterministic way are way more complex than providing helpers to drivers attempting to park on their own. Modern multi-storey car parks have digital signage to give hints, helping the drivers solve their parking conundrum more quickly. The drivers are very much left to it though.

Re-focussing on network control systems, I can’t help but feel that by trying to achieve absolute control, we make the situation so complex. Every improvement feels like we add a new dimension of complexity and do nothing to model or satisfy that complexity. It’s like we play inter-dimensional Jenga with network effects being managed through “Kludge Theory”.

*Kludge Theory - the art of kludging to solve a kludge invoking scenario, resulting in the requirement to kludge. Ad-infinitum - Me, February 2020*

Determinism isn't necessarily linked to means of direct control. Self-organising systems achieve determinism just fine if the humans behind it can drop their paranoia setting a few notches. This might mean the system being a control fractal in the face of re-architecture to meet these principles. We take the high level concepts of a self-regulating control-loop and apply them at the lowest possible level. The result is a tree with the principles applied at every branch.

#### Close

I believe that by enforcing desired state and the enforcement of that at the top-level of a system, we simply pave the road to hell with good intention. If we let go and build vehicles that can handle the terrain, we can enjoy the journey to the place that is warm!
