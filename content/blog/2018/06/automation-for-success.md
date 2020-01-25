---
title: "Automation for Success"
date: 2018-06-26T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Automation for Success"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

Businesses with high growth, complex tasks and repetition, tend to rely on or require automation to fulfill business challenges. Introducing automation is not without challenges and sometimes they can be quite significant. Identifying success is one of the early crucial activities that creates a business alignment. The identification exercise highlights justification for one more decisions and the removal of friction. Some of the decisions are not easy to make and friction is not easy to experience without applying pressure to various parts of an organization.

What follows is a number of scenarios with some reasoning around the kind of challenges that you’re already facing or likely to face.

If the absolute reasons are known, accepted and aligned against, you have just laid one of the foundational layers for success.

#### Challenge: High Growth
Great news and bad news. You’re in a business under stress from high growth! Lots of great challenges to solve and high pressure from not having them currently solved.

With high growth businesses, engineers or administrators are not under threat of being “automated out of their job”. If you identify as one of these people, you have an opportunity to learn new skills, be rewarded for finishing projects and also have opportunities to take part in a vibrant culture. This culture promotes sharing and education both internally to your business and externally at meet-ups and events.

This is always considered a golden era and memories of solving these challenges will remain with you for your entire career.

Processes are easy to implement because friction against acceptance is low. Trainings from Scrum and DevOps can be applied readily as the business is thirsty!

The most obvious danger here is being a naysayer and sticking ones head in the sand. You are mostly likely to be removed due to that act rather than being automated away.

#### Challenge: 

Drudgery. Every day, week or month, you are repeating tasks and consume easy to provide data and are easy to validate with clear results. Some administrators and engineers like repetition! Small, byte (!) sized tasks provide closure and some mental reward. They can be started, executed and validated with some ease. The feeling is akin to being a small gear in a large clock. Mentally, it’s clear you’re part of something larger and the ease of the task provides mental safety. This is always true in environments facing high rates of technological change where new knowledge is required. Unfortunately for the “happiness in repetition” seekers, this area is a prime candidate for automation.

Simple repetitive tasks can be automated with high return yields when compared to the investment. As long as a source-of-truth exists so we can execute CRUD (Create, Read, Delete, Update) operations, a simple open or closed loop automated process offers a “build once, use many times” gain. If this was a financial investment, this would be a no brainer. If time gain is your goal, then these tasks are well worth looking at.

What do you if you do data entry or have mastered these repetitive tasks? It’s time to either do more of them using automation as your own accelerator, or find something else to do. One observation, if you’re in a high growth business with highly repetitive tasks, you’re not likely to be made redundant thanks to the business pressure of meeting growth! If you develop expertise to build these automations and maintain them (a largely disregarded area), you have a great opportunity. Ensure that your management team understand you are building and maintaining business knowledge through the power of workflows. One anecdote for hammering home the value here is that of pilots and automated planes. When the plane finds itself in a scenario that is unmanaged by automation, pilots that fly planes manually (think gliders and single engine aircraft) generally survive from the incident because they know what to do. Those who twist knobs and rely on the computer tend to not make it. It’s a horrid anecdote, but proven.

#### Challenge: Complexity

This is a composite challenge. These workflows return gains of reliability, repetition and remove a hero or two. Complex processes normally come with a high level of friction when trying to automate them. From engineers and administrators not being truthful about the process, data being harder to obtain and validate and the business gains not being completely clear. Again, a set of composite challenges.

If you are a hero right now, it’s time to be scared. You’ve put yourself in to an expensive position. The business will build flows around you and once that’s happened, it will be clear that you’re a bottleneck and need to be automated out of the way. High complexity challenges come with risks of low reliability when being done manually and once the merits of automation are clear, you’re a target. Your role could also be split up in to smaller less complex chunks.

#### Business gains
The hardest part of figuring out when something is worth automating or building. Business gains are always mostly hidden in politics. One departments saving is another departments demise. If one team is successful, the other team is fired for not being so.

In an ideal world, the business gains will be dictated from above, when accurate reporting and metrics of processes have been accurately reported from below. The directors and chiefs need to dictate what business gains are sought. A statement like “Automating stuff and winning more business” is clearly an uninformed one. “Saving on OpEX” is also terrible. It doesn’t tell us anything. How about these?

* To remove syntax from service configuration
* To remove variable collisions from service configuration
* To triage data collection activities to speed up third line faults
* To manage growth and predict PoP expansion to prevent order bottlenecks

These are clear and useable as planning heuristics for deciding what workflows to create. Notice how they’re not all just building configuration?

If a reduction in head count is the target, then what normally happens is an amalgamation of job function. Two or more job roles combine in to one and the number of levers a person operates increases. Event driven automation helps here so long as the correct signals can be formed in to events, which a system will react to and execute the workflow from the event trigger.

When organizations use automation to purely reduce headcount, it appears on the surface to help. When the business changes around the automated processes or worst case, the automation system fails, these approaches remind me of Humpty Dumpty and the job redundancy of the all the King’s horses and all the King’s men.

#### Ideal Challenge: Reliability

With NRE (Network Reliability Engineering), the bread and butter of the role is to increase reliability! Designing workflows with high reliability requires a “test driven development” approach for workflows which is similar to that of software.

Imagine a workflow that pulls a set of IP address from a source-of-truth for a direct internet access service. The workflow pulls a data structure containing all required variables, applies them to the various service templates and pushes each generated artifact (imagine a config file or some API call) to the correct service node via a control-plane. So far so good. We have the data, have generated the configs and pushed them out using a workflow that exits with code zero. When this happens, it means that our workflow was successful, not that the service is up and running. How can it? We only have visibility of our workflow’s exit code. Using reliability as the point of focus, we go deeper. Within the workflow, request information from the node with now modified state and validate it is what and where we expect it to be. That deals with the interface between the workflow and the network. Secondly, we must find a way to assert data from the actual service and not just the control-plane responsible for implementing it. Service based testing now happens, which tests the boundaries of the provided service. This could be hooking up a node pretending to be a customer at the PoP before hooking up the last mile in the case of direct internet access, or it could be bringing up a BGP peer and exchanging test traffic at an internet exchange. This not only validates the system is now in the mutated state, it also indicates reliably the chance of customer success when it comes to hooking them up!

#### Close

Reliability is about removing hope. Not hope of things working, but hope from the equation of reliability. We want to be sure of things being reliable using instrumentation, metrics and statistics, not hoping that things work. If you’re going to test, do it at as many layers and points as possible. It’s better to know reliably than hope.

Reliability. Simples.