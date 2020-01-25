---
title: "Workflow Enhanced Networking (WEN)"
date: 2017-05-09T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Workflow Enhanced Networking (WEN)"
signoff: Dave
categories:
- Workflow
tags:
- Workflow
---

![WEN](/images/blog/Data-Workflow-icon.png#center)

Software Defined Networking (SDN) offered lots of hope, a centralized control-plane, programmable network functions and authenticated network nodes. Once we all stopped laughing and rolling around the floor with rib ache, the reality of SDN dawned quickly. It was a nice academic thought and set of experiments, but for the masses, the original meaning of SDN has changed significantly. The software giants with mountains of cash will drive technology like this early and possibly pave the way for the rest of us eventually, but for the masses of enterprises that vendors serve and that have more immediate requirements, SDN isn’t something that’s had massive adoption. The question of ‘why’ is a pretty obvious place to start and you don’t have to look too far before you find answers.

I will not get in to the overlay and underlay arguments here. These have been done to death already. Lots of organizations and vendors offer various takes on the middle-ground, far left and far right. This isn’t a product pitch either.

This post is around the “next onwards step” as opposed to changing the world. I also ‘feel’, this is the natural pull as opposed to the industry push we’ve come to expect to read about every week from social media with “The King is dead. Long live the King!” type speeches.

SDN is now thought of as a means of controlling something networky via software. Not the original take or the current [ONF definition](https://www.opennetworking.org/sdn-resources/sdn-definition).

#### Workflows

> workflow
ˈwəːkfləʊ/
noun
plural noun: workflows
The sequence of industrial, administrative, or other processes through which a piece of work passes from initiation to completion.

A workflow is a number of obvious things and a number of not so obvious things. A workflow in our domain is a “unit of automation”, something that contains all the instructions necessary to do X given Y. Put another way, a workflow is a manifestation of automation based on an input. That automation can be similar to an “If This Then That” or straight forward execution of a list of configuration generation statements. Different engines offer different things but baselines like Mistral and Cloudslang offer powerful functionality. A good workflow engine will allow you to create engineering flow charts and bring them to life in the physical world!

SDN failed at re-grouping the industry to solve some problems head-on. If all vendors implemented the same version of OpenFlow, used the same OpenDayLight release and used the same merchant silicon, can you imagine what sales pitches look like? All of the major vendors do the same thing, offer exactly the same tech, the differentiators are very narrow and would have probably been the applications, or at least quality of Controller based applications. Putting all of the technical arguments to one side, floated companies survive on product differentiation and ‘getting one over the other’. This isn’t a landscape that bodes well for those companies.

We still have the same issues that we had pre-SDN hype. The list of ‘markers’ is growing:

1. Increasing number of provisioning tasks
2. Decrease on expected delivery time
3. Number of things to configure and monitor
4. Complexity of things to configure and monitor
5. Organisational complexity
6. Being competitive in a continually shifting landscape

Environments are also multi-vendor, have silos and are predictably in a cycle of upgrades, updates and refreshes. With such complexity, pervasive and flexible control capabilities are required. With the concept of an SDN controller and applications, some rigidity is offered in the trade for quicker provisioning and granular centralised control. We still need the ability to operate the infrastructure as ‘code’, allowing us to manipulate and validate as we cycle through our daily operations.

Every organisation is a snowflake and the inner patterns are unique. Although just like a snowflake has six points, every organisation has addressable requirements. The need for ‘codification’ and absolute control is upon every organisation that consumes IT resources. No longer is it acceptable to wait for days to get something done. Software development is moving around our inbuilt issues, moving work out to public clouds and whilst this solves immediate problems, it could be more cost effective if bought back internally and controlled properly.

#### We Are Process Driven

This blog post forms a lightweight proposal to consume ‘Workflow Enhanced Networking’. It demonstrates an idea that we can build couplings against the things we need to control and control them the same way we would follow an engineering process with a flow-chart. Our input data needs to be structured for both the decision making process and the output stages. The decision making process requires rich capabilities, so we can ‘humanise’ them. Humans do things that sometimes do not translate well into just yes or no, so instead of blaming technology, we also have to change the way we think about processes.

Our interesting industry has been process driven for almost as long as I have been in it. Manual processes are triggered every day. Sometimes a line manager will trigger a Business Process Management (BPM) tool workflow to do something, like approve an employee to book a flight, or permit operations to create a virtual-server. We can extend this kind of thinking in to the infrastructure quite easily and without also relying on new products to save the day.
Break the problem down into the following stages: ‘input’, ‘complex, compound or simple decision’, ‘output’.

__Input__

What triggers the workflow to be instantiated? A platform with loosely coupled and user definable input capability is required here. A human triggering a workflow is nice for testing, however the idea here is to speed things up, not just move bottlenecks about. Inputs such as REST, SNMP, Syslog, perhaps even NETCONF are required to trigger workflows. I can hear much laughing. Yes, we have a wide install base of many varying devices. Taking it a step further, the ability to write totally custom input stages (like check a file for a number of instances of the name “Bob”) offers total harmonisation with respect to requirements and capabilities. To cover ageing environments, this should extend to running command line interface (CLI) commands and parsing them. Our objective is to identify the data we’re interested in and insert the value into the correct data type. This data type can then be validated and consumed by software. It also means our ‘infrastructure code’ can be tested properly.

__Decision Making__

A workflow is made from one or more codified processes. Automating when something should happen, how it should happen and where it should happen is a set of pure foundation requirements for the current wave of automation trends. This requires flexibility!

Engineers and administrators also need the power to place decision points in to their codified processes. That’s why you need a feature rich workflow engine. Multiple inputs could trigger set of questions simultaneously and trigger none or more outputs to occur.

Decision making isn’t something you can tweak on an SDN controller software instance easily, unless the application has been designed from the ground up for this kind of operation. These applications are programmed to do something given a very limited set of conditions. That’s not good enough in our flexible world. Your enterprise, your work environment can change rapidly and much quicker than a software developer can react for manifesting automation. Operations out performing software developers? Sure, why not? Workflows win out. You have the power to manipulate the flow rapidly only constrained by your organisational controls, not external developer response times.

Decision making requires the ability to decide what branch of logic to follow based on a range of simple to complex sets of data and associated conditional logic. This could be a simple yes/no, or something more complex like doing a calculation and deciding the left branch if the number is below a threshold, or the right branch if the number is above it.

__Output__

Outputs are not only the logical outputs of a workflow, but they are inputs to another system. This could be a REST API call, a NETCONF payload or even a CLI command. To have something happen as a result of a workflow decision, one system requires the capability to communicate with another. This communication has finite capability. Some methods have validation and rollback subsystems, some do not.

* CLI (Command Line Interface)
The injection of CLI commands. A simple set of inputs and outputs passed between a workflow and an end-point. Nothing special happens here. Domain specific knowledge of a vendor CLI is required. A network engineers next logical step in automation?!

* NETCONF (Network Configuration Protocol)
A standard’s based server mechanism, with standards based operations. Some are mandatory, some are optional. Device level capabilities are defined by a YANG module, which is represented by the NETCONF server in terms of specific remote procedure calls. NETCONF offers some validation of input from the NETCONF client along with some rudimentary protection like locking a client session, candidate configurations and validation of configuration. Be warned, despite looking like a simple XML system, NETCONF is not done well from many vendors.

* OpenFlow
OpenFlow is a protocol that allows a control-plane piece of software to create flows on a remote data-plane. Several tuples are required at a minimum to define an end-to-end communication between a source and destination of L2-L4 traffic. The controller will not only create the flows, but also do topology discovery and take care of things “end-to-end” as opposed to just at a single device level.

* SNMP writes? No. After two years of doing network operator talks and customer meetings on this exact subject, two people raised their hands for SNMP writes in total. Don’t even go there.

It’s possible for a network device to have all of the above interfaces and the main point here is that, each interface above could be used to do exactly the same thing. Out of the box, very few systems will do any. Choose the right weapon for the right thing.

Output drivers for a workflow engine due to the variety of network operating systems out there (vendors * platforms * versions = rough number) have to be generic to some extent. Workflow software vendors cannot foresee the entirety of software that a single enterprise uses, so having that expectation will lead you to a forest of disappointment. Don’t do it. Instead look for re-usable and customisable building blocks.

Is there a generic CLI set of drivers? What about NETCONF? REST? OpenFlow?

SDN Controllers are not the same before someone says “Aha!”. Try implementing a custom workflow on an SDN controller! But seriously, SDN controllers offer a platform to run SDN software and talk southbound to devices. SDN controllers offer a wide set of capabilities in this domain such as an API translator or an application server for gathering network metrics, normalising them and passing them on to a time series database.

The idea here is we require a platform for network engineers to craft ‘operational software’ on and not re-skill with Java.Java.Java.Java (a terrible joke, sorry).

#### Workflow Enhanced Networking

It’s easy to foresee an SDN Controller becoming a sub-component in a purely workflow driven environment. Why would you re-craft an OpenFlow output module when a reasonably good one exists in most of the SDN Controllers out there. The simple answer is to embrace the value and integrate against it building an automation platform integration pack. This ultimately is doing nothing more than creating a set of couplings between two things and far easier to do than writing an SDN application. If you have script level Python, perfect. That’s enough!

As organisational processes are questioned, improved and re-deployed, a flexible workflow engine will allow you to refactor existing workflows rapidly, check them in to a source code repository system (like a good citizen) and re-deploy.

As bugs are uncovered in the network, it will prove much quicker to handle the bug via a workflow than to re-design a topology and wait for the vendor to issue a fix. This might sound far-fetched, but think about it. Detecting a bug is one or more inputs. The decision of “has the bug manifested itself?” can be codified into a workflow and the required remediation action is a set of outputs. It’s a perfect use case and one that allows engineering to shine.

Do you have hand-off points in your organisation? How about create a workflow that allows one department to do something in your domain? Maybe they create a ticket to request a change? A ticket is an input, the data inside the ticket goes through a workflow decision tree and the output is the change. Why not craft a workflow to validate that the change occurred? How about query your infrastructure or process via a Chat window? All possible through workflows.

Workflow Enhanced Networking does not detract from the value of proven networking protocols we use today. It adds enhanced control to a myriad of requirements and offers flexibility only previously possible through maintenance software releases, vendor innovation or standards based dissemination of information. If you’re an engineer wondering why to learn Python and what all of the hype is about, Python is directly applicable in this domain. Use existing valuable tools and libraries and wield them like the engineer you are.

As we’ve gone through iterations of almost laughable poor offerings, embrace what works today and stop delaying over a silver bullet decision. The industry is changing a rate of knots and you’re in a powerful position to offer innovation to your organisation. It’s not all about forklift changes. Embrace the DevOps way of increasing the flow of changes, reducing delays and bottlenecks and increasing feedback. A good workflow tool offers capabilities that align with this thinking. Widen your own thinking to realise its potential!

#### Closing Statement

At the time of writing, I work for a vendor that happens to offer an event driven automation platform built for workflow based engineering. I believe in it and whilst the technology is still fairly young in the greater scheme of things, there are countless real world use-cases. SDN has it’s uses for those organisations equipped to deal with it’s nuances and skill-up requirements. This is not most enterprises.

Not so far-fetched eh? The value of embracing the technology we have today and enhancing it via workflows is unquestionable. Long live the king! It’s delicious!

__Workflow Enhanced Networking (WEN). Copyright, David Gee 2017__