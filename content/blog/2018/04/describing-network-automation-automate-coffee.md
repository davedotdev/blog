---
title: "Describing Network Automation: Automate the Coffee"
date: 2018-04-22T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Describing Network Automation: Automate the Coffee"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

![the_coffee](/images/blog/the_coffee.jpeg#center)

#### How to Describe Automation

Cisco Live, Milan, 2014, the place where everyone drinks a caffé! It was this year that Cisco’s DevNet began to grow and my passion for software, automation and networking was in for a roller-coaster ride. I watched various refreshment stands delivering coffee to the endless queues of guests and began to see something special in the thing that I originally called an espresso!

For so long we’ve used pipes and water to describe networking itself and for a long time I was hunting for a good way to talk about network automation. Turns out a caffé is a great way to describe automation and especially network automation. We also feel emotionally about it and understand the process used to have one placed in ones hand.

Annoyingly so, when automation is the topic up for conversation, we start with "Let’s automate the network" and not with what it is we want to automate. If you’ve raised your eyebrow, point in case. Even worse is when you’re asked for a use-case. The answer is nothing more than a reflection: "Tell me what your humans do". This isn’t a product, it’s the deep integration of human process and digitised workflows.

It’s 2018 and I’ve started taking my "Automate the Coffee" concept out on the road. It works really really well as an anchor point. Turns out I didn’t need to have any hesitancy in using it.

#### Automate the Coffee

Automation mistakenly always starts with "tools first" then the what and how later. Some tools only promote the learning of bad habits and make you so sticky to them, everything becomes a nail to hit with your new hammer. Those new to automation will approach everything else in the same way like "automate the servers" and "automate the pipeline". These are composite things and the description is flawed, yet descriptions like this are part of every corporate strategy on the planet.

Automation has always been about the processes, procedures and steps required to complete a task, or take a scenario from point X to point Y. This could be configuring edge ports, performing software updates on a switch and even reacting to a set of signals that when combined form an event notification.

The digitised version of one of these workflows is a set of machine executable tasks that lacks the requirement of sentient beings to figure out what to do next. At some point machine learning will fill that gap and for now, we have to figure out how to quantify inputs.

Back to the coffee. In itself, a coffee is a complex and a complicated set of things.

__Coffee Production Workflow__

Here is our basic human workflow.

1. Coffee beans are ground
2. Coffee infusion: Hot water and coffee granules are infused whilst being poured in to a pre-warmed cup
3. Enjoy

Even as a human, these steps can be broken down again and again.

__Coffee beans are ground__

Where we do we begin with this. First, we need the beans. The beans are a dependency. We order the beans from a supplier, receive them, store them and eventually open the bag, pour some into a grinder and start the grinding. Do we need to become a coffee bean farmer to have a coffee? Depends on how much coffee you want to drink or sell to another.

__Coffee Infusion__

A human loads a portafilter (the thing with the handle on and the coffee in the middle of) with ground granules, then inserts it under the brew head (water dispenser). Next, the human starts the water flowing out either manually or through a button to select the volume. The produced infused coffee water now sits in the caffé cup and is ready for serving to the consumer.

The more astute readers right now are saying “hang on, what about priming the cup?”. Indeed. We missed a step off. We didn’t warm the cup! A good workflow can have elements added and removed without negatively affecting the flow of information. We do not have to rebuild the whole thing here.

This whole process has dependencies in turn on having clean caffé cups, a human and heated water.

We can continue mapping out dependencies, decisions and actions. All of which we can then take and generate workflows for. Given the right production line, this workflow would enable perfectly brewed coffee to be produced again and again without humans!

To convert these human workflows to machine executable workflows, our inputs need to be machine measurable, our actions machine deliverable and the decisions to be binary or range based. Our humans at this point are no more than material loaders for coffee beans and clean cups; given enough time and money, not required for these tasks either. Back to network automation, our inputs are from a source-of-truth and our actions are to call some API. Our tools? One that can execute a list of tasks with some basic decision making logic. I’m not going to name one here as it defeats the whole purpose of this post. Do your research and align the chosen tools and platforms with your corporate culture.

__Time to Automate__

It has never been better to automate than now. We can gain huge chunks of time back, remove repetition, drop error levels and just get more done.

Automation works well when you understand your subject area intimately and you will find the tools of the trade eerily line up with your ability to break down each set of tasks into dependencies, variables (inputs), logic branches (decisions) and actions (do the thing). Some tools can trigger these workflows by combining and analysing signals for signs of an event and some cannot. Round shapes are designed to pass through round holes. Sure it’s possible to smash a square shape through a round hole with a large enough hammer and that concept goes against all the reasons we automate. Different scenarios call for different tools and approaches so embrace the knowledge and fact that these are just tools and any good one can be swapped for another. Reduce the friction, bottlenecks and risk in the tooling as well as the approach.

__It’s not about the tools__

Last word. I never start with "tool first". Figure out what the tasks are, how to approach them and how to have maximum impact with as little difficulty as possible. Our game here is to have an army of soldiers, not heroes.

1. Platform first and configuration
2. Extensions and plugins with configuration over custom scripts
3. When and only when you have to, custom scripts
   
A note on scripts. They should be human readable and lack the requirement of a hero. In reality, scripts should be maintainable by anyone and should be executable on a number of platforms, consuming zero or more inputs, giving zero or more outputs and adhering to proper system exit codes and signals like kill. This is the most dangerous part of any set of automations and should be approached with care and consideration. If you’ve just learnt a programming language feature, it’s probably best to avoid it until you understand it properly.

Just because you’ve learnt Kung Fu, doesn’t mean you have to put your fist through everything.

#### Close

Despite automation being a higher level of software, too often I see tool first approaches being used without any test of knowledge levels, customer understanding of the tech or even their own processes. This doesn’t mean you need to be a developer to write good automations, but it does mean a basic grasp of software flow logic is absolutely required.