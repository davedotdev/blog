---
title: "Network Automation Engineer Persona: Part Three"
date: 2017-10-12T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Network Automation Engineer Persona: Part Three"
signoff: Dave
categories:
- Career
tags:
- Career
---

Part three! Let’s get straight to business and carry on where we left off from [part two](/blog/2017/10/network-automation-engineer-persona-part-two/).

#### Key Skill One

Thinking about automation in an agnostic way is your first footstep. Automation is about data flowing through building blocks that do things and decision points, allow you when to do things.

Removing CLI and replacing it with an abstraction layer isn’t much of a win. For instance, I regularly talk about the process of creating a VLAN and applying it to an Ethernet switch-port on a tagged interface. This somewhat simple ‘workflow’ creates more conversational friction than imagine-able. Let’s work through it.

*Task: Create a VLAN*
This task requires domain-specific parameters to a VLAN. These are: ‘VLAN_Number’ and ‘VLAN_Description’.

*Task: Apply VLAN to Switchport*
This task requires domain-specific parameters to a switchport. These are: ‘Port_Name’ and ‘VLAN_Number’.

Note how the inputs flow through the actions within the workflow?

![networking_persona_workflow3](/images/blog/networking_persona_workflow3.png#floatleft)

The green arrows descending illustrate the ‘success transition path’ for each action component.

So, what about these questions?
1. Is the VLAN in use?

We can be more specific here, but it adds complications to the answer. Version two is: “Is the VLAN in use in the network zone that the device resides in?” To get a reliable answer, we now need to model the network and test for true/false values against a rule. It might be to ensure that the VLAN doesn’t appear in a device radius of +1 around the device in question. See how complex this just got?

2. When I convert this flowchart to a workflow, for the task “Apply VLAN to Switchport”, how do I make sure the VLAN is applied to the correct device?

The answer to this is “This task will accept a hostname, driver kind and credentials to reach the device”. More complexity. What is a driver in this scenario? It is something that converts our declarative information and through the process of an imperative implementation (could be an application or a script), it delivers the information transformed in device specific parlance. In other words? The input is sent to something that talks the same languages as the device. Different automation platforms have different ways of dealing with these constructs, but the theory still applies.

3. Is it good practice to record the changes I make?

Yes! The reason why we have so many broken ‘sources of truth’ in our trade is because we do not record enough. We are used to making a change, then updating the ‘source of truth’. Why not change the ‘source of truth’ automatically as part of the automation? Totally possible and considered normal. What, how and where, are conversations to have with your organization.

4. When the data has been applied, do I validate?

Yes, validate, but decide how deep you go before you commit to creating the workflow. For our simple example, which is already growing in complexity, there are layers of validation we can achieve. That list looks like:
– “Check that the configuration appears in the device configuration”
– “Check that the configuration appears in operational output (show commands in CLI parlance)”
– “Can I see hosts on the VLAN?”. This requires gaining Layer2 and Layer3 visibility on to the VLAN using operational API calls.
– “I’m going to ensure its passing traffic”. This approach is a separate workflow in its own right. Now we might plumb a traffic generator between a set of ports over this VLAN to ensure it’s passing traffic.

Our workflow now looks different and can take many forms. We have decision making happening within the flowchart and sub-requirements for deeper integration with our target devices as well as supporting infrastructure like traffic generation capabilities.

To summarise this key skill, an “agnostic view” is a key skill to develop. Network operating systems have a weird way of getting under your skin and you learn to love some and loath others. As hard as it might be, it’s time to move on.

#### Key Skill Two

Figure out what your automation requirements actually are before you side with a technology.

This might not sound like a skill, but our habits of siding with a network vendor and then trying to make the technology fit is an old habit. Call it cultural or bad habit, same point.

Just because one platform is written in Python and another is with Ruby, it should not lead you to a decision on platform choice. Support for third-party integration is a decision point and ease of creating workflows is another. Using modern expectations, if the community is dead then the life-length might be under question.

The right tool for the right job is the logical answer, but it’s a case of understanding your environment requirements end-to-end, the potential future and attitude of your organisation. Your analysis might result in listing multiple platforms. ![donkey-vs-unicorn](/images/blog/donkey-vs-unicorn.jpg#floatleft) This is normal and just because one platform doesn’t offer everything on your list, it does not mean the things it can do are to be discounted.

This skill will allow you to be aware of Unicorns. More often than not, Unicorns are just Donkeys wearing a carrot with sparkly hooves. There is no all encompassing wonder platform. Even more fun, the offerings constantly change!

</br></br></br></br>

#### Key Skill Three

Understand how, why and when to consume vendor automation extensions. Vendor automation extensions or libraries simply provide one interface for you to consume, whilst talking something else underneath, like CLI, NETCONF or even perhaps SNMP. There are no hard or fast rules on the binding methods.

Simple translation: This could be to consume an [Ansible](https://ansible.com/) module or [StackStorm](https://stackstorm.com/) pack. These modules and packs consume arbitrary and agnostic data and deal with the imperative how. No longer do you worry about memorizing a command, but the focus is on feeding arbitrary data parameters into a black software box and something happening on the target device.

Network vendors also offer abstraction libraries. Juniper for example offer the [PyEZ](https://github.com/Juniper/py-junos-eznc) library. These libraries are designed to be used by script writers and application developers. Unless someone has written an integration to an automation platform, deciding to consume the library requires more technical expertise to keep your environment loosely-coupled. You might wonder what this means if you’re a network engineer and a simple answer is: “Imagine automation integrations being like a child’s play set. Both play sets allow you to push shapes through shaped holes. Both play sets have a circle shape and a circle shaped hole. One circle shape might not fit through the hole on the playset it doesn’t belong to, despite the shapes being the same”. Taking a real example, creating a VLAN on one vendor library might be a direct call to a `createVLAN()` function. In another library it might be `runCommand(commands)` function. Both achieve the same thing, but now you have a different coupling method, which technically is an abstraction problem. This is referred to in general as “tightly-coupled”. It means you can’t swap one thing for another with ease.

If your automation layer strategy is to arrange declarative/imperative blocks into an engineering flow chart arrangement and have data flow through it like a stream, then your stream will be choppy if it has to move around different objects and blocks. Imagine a multi-layer stream with a focus on making the top stream as smooth as possible. It’s not always possible, but you can reduce some of the pain. As a good example, [NAPALM](https://github.com/napalm-automation/napalm) tries to do just that. For getting information each driver aims to support the same set of ‘getters’, and setting information is down to pushing specific configuration chunks over whatever mechanism the driver supports. This tool offers a [support matrix](http://napalm.readthedocs.io/en/latest/support/) that show the potential of what ‘could’ be supported. Actual supported features against vendor platforms comes down to the implementation of each driver. This approach means you get one ‘getter’ for showing BGP neighborships for instance for all the vendor platforms supported by the tool. This means your flowchart calls the same function or module irrelevant of the vendor. To boil this point down to the basics, your automation implementation doesn’t change when you change the vendor. Going back to the stream anecdote, the stream gifts us with smooth sailing.

Agnostic and good tools try to avoid introducing more entropy as their list of supported systems increases. Usage based friction is reduced and declarative modules become familiar despite the systems you are interfacing against.

#### Close

The next article will contain three more key skills.

Notice that these skills are not product based, or vendor parlance based. These are generic skills that can be applied widely. Are these not worth investing in?

Some of these skills have been approached at a high level. I’ll look at creating more articles to describe these key skills in more depth! Please make comments or email to show interest!

This is part three of a four part series. [Here is the last part](/blog/2017/10/network-automation-engineer-persona-part-four/) if you want to read on.