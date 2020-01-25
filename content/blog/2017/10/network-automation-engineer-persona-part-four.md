---
title: "Network Automation Engineer Persona: Part Four"
date: 2017-10-13T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Network Automation Engineer Persona: Part Four"
signoff: Dave
categories:
- Career
tags:
- Career
---

[Part three](/blog/2017/10/network-automation-engineer-persona-part-three) introduced the first three key skills. This part presents the introduction to the last three core skills and a call to action.

#### Key Skill Four

I’m trying very hard to refrain from using the term DevOps, but the fundamentals of the DevOps movement are super important. The DevOps fundamental pillars are improving the flow of work, improving the quality using a feedback loop and sharing. A huge array of books have been created on the topic of DevOps in addition to blog posts and podcasts. If we view the persona of the Network Automation Engineer through the lens of the DevOps persona, the two are very similar. If we are to increase the flow of tasks and improve the quality of them using automation, then we need to be able to fix the issues close to the source of the problems and share knowledge. We do that with logging and an attitude change. Logging is critical for successful automation projects as well as attitude.

Knowing how to transmit logs, how to capture logs, how to sort through them and how to realize events from them is an entire skill. There are software stacks dedicated to this mission like [ELK (Elastic Search, Logstash and Kibana)](https://www.elastic.co/webinars/introduction-elk-stack) and the paid for [Splunk](https://www.splunk.com/). The components required are data ingestion, data transformation, data storage and the ability to view and query them flexibility and on your own terms. You can practice and hone this skill for free thanks to open source.

#### Key Skill Five

Treating success and failure as indifferent but important guests in your organization. Embrace both, learn from both and try not to put more meaning on one than the other. Emotionally they feel different, but in this role, try to separate the feelings from the meaning. Getting things right should be normal and failures and errors are also normal. Things change; always. A transistor might burn out on a CPU, a RAM cell may die, a datacenter might get hit by an asteroid and you may enjoy the great stability period of a religious festival like Christmas. Weirdly, engineers might try and fix a phantom problem over a quiet period like the last week of December and not at all react to a CPU causing a process to segfault in more normal time periods.

#### Key Skill Six

Knowing what to automate, when to automate and how to track the success vs failure of your automation is all great, but what about the third pillar of DevOps? Some of the worst problems I’ve seen in the network automation space is when a network focussed development team and engineering team work in isolation. Development teams rarely know how to approach talking to a network device and even worse, network engineers rarely know the programmatic interfaces available to them.

Key skill six is to understand what programmatic interfaces you have available at your disposal, know what they can do for you and understand the impact of using them. Just because they are there, doesn’t mean you can use them for the purpose you had in mind either. For instance, I would not turn on verbose monitoring over a NETCONF TCP session because I know CPU consumption would ramp up, rendering my control-plane unavailable and probably causing an outage. Instead I might increase my SNMP poll rate to get higher data granularity. That will still affect the CPU so I have to think about the actual cost of my requirement. Should I really be increasing my SNMP poll rate? What is that I want to achieve here? If it’s faster detection of a threshold, why not set-up an SNMP trap with a threshold on the network operating system? Does that buy me what I need?

Also learning about these programmatic interfaces means that any development team you do encounter can benefit from your knowledge instead of re-inventing the wheel again and again. This is more common than you would like to think. Key skill four talks about sharing and attitude. Sharing your knowledge with a development team of how to do something in your domain will improve the attitude of the organisation and you might learn something from them. Hell, you might need a vendor module integrating against your automation platform. You might have just earned enough respect to receive help from them!

#### Call To Action

If you are a network engineer and are wondering where you go next given all of the noise about automation, the “network automation engineer” persona is a natural progression.

Learning new skills can be fun and meeting the requirements laid out by your organisation with those new skills can be both mentally and financially rewarding for all involved. Ensure you translate the value of learning new skills properly to those that might stand in the way of progress.

All organisations are on a journey technologically and there is no silver bullet or perfect solution. All targets are on the move and that means we all have to keep up, that includes you.

Becoming the network automation engineer does not mean you have to become a developer, but it does mean you have to think about data, data transformation and how to react to unsolicited data generated from the network.

Every computing problem comes down to data and transforming it based on a decision. We can do this at an automation, programming or machine-learning level and they’re not exclusive. There is silver bullet or rainbow pooping unicorn. [Remember our cute carrot wearing donkey from part three?](/blog/2017/10/network-automation-engineer-persona-part-three)

Just because you have the hunger to embrace automation and the culture that goes with it, your organisation might not have. Do not be afraid to change the organisation you spend your life energy on to progress.

Go looking for organisations that present problems with an appetite to solve them. When industry celebrities disclose their infamous stories, they didn’t find a job title that let them gather the experience. They took risks when something needed to be solved. Some people try this and get fired. The higher the appetite, the less likely you are to get fired. In most DevOps books, despite lots of organisations transforming under the weight of business demands, some changes do not remain for long. Entire teams are dismembered when new management takes over. Roll with the punches.

Be brave network engineer. Make your life easier, get those mental and financial rewards, react to business needs quicker and most importantly, have fun doing it. You are human and humans need a sense of achievement and meaning. Go forth and evolve!