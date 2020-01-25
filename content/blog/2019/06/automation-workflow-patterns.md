---
title: "Automation Workflow Patterns"
date: 2019-06-07T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Automation Workflow Patterns"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

Workflows vary from seriously simple to notoriously complex and as humans, we might not even consciously observe the subtleties of what a workflow comprises of. Workflows are the source of control semantics and comprise of many elements, some obvious some not so. This post is a primer to help you think about the kind of workflows you encounter drawn from my experiences. This post offers a view with conviction backed by experience.

To set the tone, workflows have logical flow, temporal behaviour, consume and transmit data, for processing triggers, acting on decision points and returning states. Since the 1970s, I believe we haven’t actually come that far from a workflow orchestration standpoint. Atomic units of code exist that do one thing well, a real win for the 1970s and good automation systems understand how to instantiate, feed these atomic blobs of logic data and grab their exit state and content. On a *nix system, it’s possible to use bash to create a single chain of tasks using the | operator. One blob of logic effectively feeds it’s output to the next blob of logic. Who needs an orchestrator? It’s sensible to include detection logic within each blob of code to figure out when human readable or serialised data is required. That way these contained units of logic can be used both by human operators and in automated workflows.

```bash
$ do X | Y | Z | process_result
```

In the context of this post, a node is something I’ll use to describe a decision point or task within a workflow.

Signals should also be interpreted by the workflow runner. Operating systems issue them to processes and as such, the orchestrator that runs the automated process should listen for them and process them properly.

__Run To Completion Serial Workflows__ are instantiated with a complete set of data that the contained logic uses to execute. These kinds of workflows have all the data at run-time they need to make decisions and act on them. This means they can also run asynchronously and spawned in a headless manner if required. The style of workflow is lock-step, meaning that one action or decision point, directly calls another action or decision point. Temporarlly, each node in a workflow takes as much time as it needs to execute and flow traditionally ocurs top down. Once all of the nodes are executed the workflow exists with a proper exit code (zero for success, one or higher for anything else).

```bash
A → B → C
```

__Run To Completion Combinational Workflows__ are instantiated with zero or more input parameters and the workflow will stop and query data sources for inputs to decisions that are contained within workflow nodes. Once invoked, they continue to run, but may start other standalone sections of the workflow asynchronously. The end result is a combination of nodal activity that all eventually join to the finishing node directly, or emit a signal with data to be correlated.

```bash
A1 → B1 → C1 → D1
A2 → B2 → C2 → D1
```

__Temporally Fragmented Serial Workflows__ are those that have time as a step-flow mechanism. Not necessarily timed as in by delay, but by trigger source events. Let’s walk through an example.

Example: A physical interface drops that has a BGP neighbour peered. From a signal perspective, we could see telemetry information on the physical interface drop first (X), and then shortly after once timers expire, we see signalling around BGP neighbour states (Y) and route withdrawals (Z).

Temporally, we have an ordered set of serial signals related to one event occurrence, but they temporally fragmented. It isn’t like we’ve written some code that says “If interface goes down, do X, Y and Z in that order”. The system is reporting on a set of signals in the order they happen but for all the system knows, the order and occurrence of signals is by complete chance and in the order we need them for our trouble shooting process.
Let’s talk about workflows in this manner. If our troubleshooting process was to investigate a BGP drop, we might base the ingress to our workflow on seeing a BGP peer down signal. Ok, so we’re off. We run some logic. What happens when now we see our route withdrawals? Although they’re related to our workflow, what do we do now? Our initial set of tasks ran based on one signal in isolation. How do we correlate all of the information together? Chaining workflows together based on temporal transmission of signals is tricky and very hard to manage. You have lots of fragments of `signal→action` which are weakly linked.

There are two patterns that work well with temporally fragmented workflows.

Pattern A: Use a central key/value store and each node within the macro-workflow must check the key/value store for introspective information. Assuming workflows are not concrete but templated, then it will be possible to publish the same workflow for different devices, interfaces and systems etc. This means a node has to be aware of what end system it’s working with so it can look out for related signals. There’s no point in instantiating part of a macro-workflow for Router A on condition X and instantiating part of a macro-workflow for condition Y on router B if the X and Y conditions are for router C. Introspection is key. A key/value store can act as a point of context and synchronisation.

```bash
Macro workflow = A1 → B1 → C1

Implemented workflow:
K/V signal → A1
K/V signal → B1
K/V signal → C1
```

Pattern B: Macro-workflow components can query each other with concrete references. That means at the time of instantiation, variables have to be passed in so the components know what to query for. I view this very similarly to combinational logic gates. Latches may need to be thought about so that signals aren’t missed, unless the system is call-back based. Some commercial products offer this method and I struggle to justify the sheer mental complexity. They may be referred to as “daisy-chained workflows” but without clear linkage of inter-relationships other than signals based on an imaginary timeline.

```bash
Macro workflow = A1 → B1 → C1

Implemented workflow:
Signal → A1
Signal → B1 (query A1, if signal condition is true, execute)
Signal → C1 (query B1, if signal condition is true, execute)
```

__Temporally Fragmented Combinational Workflows__. Oh boy. I view these as lots of blind and deaf people playing a game of football with one goal. For the record, I dislike football, but I think the analogy works. Even simple workflows become complex because of the time based triggering of asynchronous and unrelated tasks that are being instantiated. They’re related in the macro-sense, but not in the instantiated sense. We just have to hope all of the white sticks whack the ball towards the goal. Don’t do this.

```bash
Macro-workflow = Signal → A1 → Goal1 
Signal → B1 → Goal1 
Signal → C1 → Goal1

Implemented workflow: 
A1 (external signal)
B1 (external signal)
C1 (external signal)
```

It’s very difficult to correlate useful information between macro-workflow components and even do something with the resulting information. Complex indeed.

Sanitised Workflows are those I consider to be well thought, boring (as many inputs known at invocation), with clear and concise actions that steer the decisions in the workflow tree. They have state machines to block and wait for signals to drive them to their next state. They’re also potentially long lived without the danger of fragmented processes making them difficult to troubleshoot. One process can absolutely setup trigger conditions for another, but do you want to troubleshoot this at 3am? I certainly do not.

Some workflows are unidimensional and will only ever have a single invocation. Running power, air, payroll and traffic systems are good examples of unidimensional workflows. The last thing you want is one workflow telling a generator to run and another in parallel trying to turn it off.

Multi-dimensional workflows are concurrency safe and the multi-dimensional capabilities are an advantage. Think scale-out environments where the same logic is re-used but with different operating variables.

Some workflows you’ll work on will clearly be unidimensional or multi-dimensional. Know your process, know your decision points and make your logic atomic.

Keep your workflows clean and try to decouple as much invocation logic from temporal triggers as possible. Instead have your logic wait and then timeout if a gating signal never occurred. Logs are cleaner, your cognitive load is lower and overall, the automata is reliable.

Nice to get this off my chest after a long week. Thanks for reading and I hope it was useful.