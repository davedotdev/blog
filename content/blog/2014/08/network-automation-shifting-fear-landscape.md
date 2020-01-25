---
title: "Network Automation: Shifting Fear Landscape"
date: 2014-08-06T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Network Automation: Shifting Fear Landscape"
signoff: Dave
---

We have mostly all been burnt to a level of severity that we will or will not admit to by prodding and poking networks. Whether by an unexpected bug, lack of understanding of the thing we are poking, or sheer ‘bad luck’, there’s no avoiding it.

Being burnt by a network is almost like being zapped by a cattle prod. It doesn’t take many times before your brain rewires itself to avoid getting burnt, unless you’re a network masochist, in which case, you’re a special breed. This rewiring has resulted in using the CLI as an investigatory and validation tool as well as a configuration access method. What was that keyword again?

`show ip bgp neighbor` ?

Due to mistrust in the documentation, lack of desire or over trusting the CLI, our brains have become used to this behaviour and complacency has set in.

As we shift from configuring network elements manually to configuring them by automated template generation and structured API calls, will our well understood knowledge of a networking operating system with all of it’s caveats and nuances become redundant along with our bad habits? So do we just trust an amorphous piece of software to do it for us and lose our value? As our brains are wired now to trust the CLI, does this grind against you?

How many times does a command show up but doesn’t do anything? Let’s be realistic about this grind.

*Note – I have used the term ‘playbooks’ as a generic term to define an automation set of tasks. Commonly known as a runbook, playbook and recipe.*

#### Shifting Fear Landscape

Our brains tell us that moving control to somewhere else, especially after it has experienced so much pain and suffering in order to gain the understanding it has today, is a terrible idea and destined to fail. Don’t listen!!! Sure there will be some learning curves when it comes to deploying some automation but don’t think for a second that it will be as painful as joining a network operating system on it’s own maturity journey. Most of that code is now mature thanks to the crispy burnt people.

Back to our amorphous blob of software. Automation tooling is currently being consumed, analysed and played with globally. It’s a big thing. The effects of it should also be big. Let’s aim to reduce the drudgery of repetitive manual configuration changes and free up more time for the cool stuff and self development! What was that last bit? If your response is “I’ve not done any of that in years!” then keep reading.

This automation tooling however comes at a cost. Our brains are hardwired to think a certain way. We expect a certain level of feedback and running template generated code to begin with can feel like just doing a copy and paste of a whole config file that you wrote via a text editor from memory. That feeling soon goes when some of the features of an automation tool become useful. In addition, a template is created once. If it works the first time, there is no reason why it shouldn’t work the hundredth time. Meat grinder model?

#### A Good Automation Tool

A good automation tool will harvest data about the thing it’s about to do, what it is doing and what it has done. This is the feedback loop we naturally live in but pay little acknowledgement to in reality. It’s this feedback loop I am sure will help us rapidly adjust to a more automated world.

A well understood automation tool that makes use of modules that are human readable, allows you to see everything that goes on under the hood. Your knowledge and expertise of the oddities of networking are still used and after a short while you yourself will write the modules that the automation frame work consumes. After all, it’s networking right? Initially the black box fear shifts from the vendor box to the software container but the good news is the software is much more easily understood than the hardware ever was. You can control how you want to visualise the data, the deployment progress and ultimately the post deployment report. You are still in control of the journey and it’s down to you to lay out the ground work so other people can walk it at lightening pace. This ground work translates to template generation, writing automation playbooks and building API interaction modules. This echoes statements made in previous posts: take baby steps and get familiar before you decide to sprint.

#### Change Window Fear

Shifting from the CLI to automated methods is one thing, but how do you influence the operational managers and ITIL change board people that this is the right thing to do? We covered off earlier on that once the ground work is laid out, if it works once, it work again and again. This is accuracy and consistency of change. No more locating that pesky text file. You could also write some configuration validation logic in to your automation playbooks for automated acceptance testing. You could be a real smart Alec and have your tool email you once the change is complete and maybe dial your on call number should there be an error. Sound awesome?

When a network service is decommissioned, the same process can be followed to remove configuration. No house keeping work every six months to remove defunct configuration via the CLI and decoupling of human error when it comes to removing the wrong configuration. Even though it sounds great, it is however another fear barrier for any team to overcome.

Before attempting to do this in a production environment, go to the lab, show off the capabilities, scenarios and problems that are solved. Prove that the fear is only lack of familiarity and make stakeholders familiar and comfortable. The black box fear does not have a place in this automated world. Through collaboration and sharing, the fear will not move up the tier to halt progress where it is needed the most.

#### Pre-Evening Red Wine Thoughts

We must make every effort to not let the inbuilt networking fear shift up the stack or become an obstruction. It is an opportune time to show your value as a networking professional whilst the industry is focusing on this area with ever increasing intensity. At a time when some companies without the right information might make bad decisions, take the bull by the horns and ride that thing until it stops bucking! Listen to the issues, understand them and aim to remove the fear.