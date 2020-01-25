---
title: "Network Automation: DevOps vs NetOps and the right tools"
date: 2014-08-26T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Network Automation: DevOps vs NetOps and the right tools"
signoff: Dave
---

With the current interest in network automation, it’s imperative that the correct tools are chosen for the right tasks. It should be acknowledged that there isn’t a single golden bullet approach and the end solution will be very much based on customer requirements, customer abilities, customer desire to learn and an often overlooked fact; the abilities of the incumbent or services provider.

The best projects are always delivered with a KISS! Keep It Simple Stupid.

*Note – I have used the term ‘playbooks’ as a generic term to define an automation set of tasks. Commonly known as a runbook, playbook and recipe.*

#### Incumbent and Provider Skill Sets

Because a services provider may have delivered an automation project using a bulky generic work-flow automation tool in the past, it does not mean it is the correct approach or set of skills for the current and future set of network automation requirements. To exercise this, let’s create a hypothetical task of hanging a picture on the wall. We have many choices when it comes to this task, for example: bluetak, sellotape, gaffer tape, masking tape, duct tape or my favourite, use a glue gun! However, the correct way would be to frame the picture and hammer a small brass picture hook on to the wall and hang it. It’s elegant, mess free and if you take the picture down, the brass hook makes it obvious where the picture should return to back to it’s rightful home.

Network automation tool-sets are maturing and as the understanding matures, so will the capabilities and styles of tools available. What might be right today due to industry understanding and acceptance, will not be right tomorrow when requirements and capabilities are more complex along with a maturer level of understanding. It is also the responsibility of the provider of services, vendor or incumbent to educate correctly in the application of the chosen and adopted tool-sets, which in turn drives acceptance. Potentially a very nasty circle and one that needs clear direction from any business or organisation.

#### Today and Tomorrow

To understand what the right tools could be, we need to understand what the workflows look like. Network automation today is approached from simple angles which could be attributed to tool-set limitations instead of lack of desire to automate more complex scenarios. Today, we create templates and insert variable names or place-holders, then use a configuration build tool replace those place-holders with actual variable names in order to complete configuration.

Suppose we want a more complex scenario. We want to generate some configuration, but based on an interface description and interface speed, we need to make a decision on what IP address to put where. These IP addresses also need to be from a network resource asset database as opposed to manually edited text file. Beginning to sound fun?

With great difficulty this can be done today, however, the current set of tools in our kit bag are very limited in these scenarios. Why are they limited you ask (I hope you asked)? The tools in use today were born out of server automation requirements and not network automation.

#### Why Is Network Automation Different to Server Automation?

Networks and servers couldn’t be more different for a start. At a component level, some network devices are just servers under the skin, functionally however, the same disciplines cannot be applied. Ultimately it comes down to the way we deploy and interact with applications. Yes, white-box switching is based on some variant of network Linux and can be managed by Linux tools (Switch Light, Cumulus – blah), but that’s not really the point. More on that shortly.

As a second major point, DevOps tools such as Ansible and Puppet are for preparing servers for the software that the development team requires to be installed on specific systems. This software is wielded by the DevOps teams but for clarity, these tools do not concern themselves with granular configuration such as database schema or content. In a simpler sense, these tools execute logic such as “Install Apache version 2.2 and copy these files across”. Sure, the ops teams might configure configuration files, but the tools themselves do not cover end-to-end logic and validation. These are platform stack tools, i.e. install Apache, MySQL, PHP and base configuration files across a thousand servers. Scale and speed as opposed to intricate interaction.

Applications dependent on the network and network applications are two different things. The Apache web server, MySQL, MongoDB, RabbitMQ and a ridiculously large list of other names could be classified as network dependent applications. BGP, MPLS, OSPF, STP etc are all examples of network applications. Networking people understand the differences between these implicitly, but the differences might not be so obvious to those looking in outwardly.

Deploying and configuring network dependent applications on to servers is a trivial task. Let’s take an example workflow for deploying Apache to deliver some static content:

1. Deploy Apache
2. Copy files to /var/www/static_content/
3. Set up virtual host directives
4. Set up permissions
5. Restart Apache
6. Test

A perfect playbook overview would you not agree?

Before giving a network automation example, it is important to acknowledge one interesting observation. We as a networking fraternity understand that networking protocols are actually delivered by applications hosted on network devices, but we also understand that unless it’s on Linux, we have little choice in deploying these applications. They already come pre-packaged and sealed in with X vendor’s flavour of network operating system. We interact with applications using the interfaces provided by vendor X, which typically are the CLI, SNMP, HTTP, NETCONF and more recently, REST. We also understand that the feedback loop mentioned in this post is ever important. It’s a natural feedback loop that you use every day when dealing with networks. “Configure this, check that. Does it look like the configuration was accepted? Tweak some more…”.

*Not to deviate you away from this post, but take a look at this Plexxi blog post written by Derick Winkworth. It is an excellent, clear and clean write-up of this logic found here. Also an impressive article for your better half or date to read when asked “What is it you do again?”*

#### Network Playbook – a real world requirement

Now to the network playbook. Let’s do a simple thing and add a new DMZ VLAN, IP addressing, VRRP group and IGP advertisement to a DMZ pair of switches:

1. Query network asset database for free DMZ VLAN
2. Query network asset database for free public DMZ /24 IPv4 and /64 IPv6 subnets
3. Query network asset database for free VRRP DMZ group number
4. Deploy VLAN to DMZ switching
5. Validate VLAN is deployed and active
6. Configure IP addressing and VRRP information on specific DMZ VLAN logical interfaces
7. Validate IP logical interfaces are up and responding to ICMP
8. Validate VRRP virtual IP address is active and active on the correct device.
9. Configure the IGP for the new prefix
10. Validate the prefix is reachable elsewhere in the IGP domain
11. Validate that the prefix is reachable via the Internet

Notice the distinct lack of application stuff? No deployment of applications, no files to be copied, no services to be restarted. Simple logic in this playbook just doesn’t exist. Appreciating this is a more complex automation piece, but this is a normal thing to do on an almost weekly basis if not daily for some IT departments. Templating this configuration is only half of the battle. Preparing text files with variables such as IP prefix, VRRP group and VLAN numbers is also time consuming and tedious. Automating as much as possible is the key to these types of tasks.

This playbook requires the ability to store persistent objects containing JSON or XML (returned network device data), the ability to query a database (network assets database?), ability to communicate via a southbound API (NETCONF, REST, SNMP, CLI) and the ability to do the equivalent of unit tests which comes from test driven development methodologies. The latter part is interesting. We can set up logical conditions on returned data, for example:

`if VLAN_LIST contains 300, state=success, else error_message("I haz broked")`

This forms the essence of our validation requirements, although is a little (and intentionally) pseudo like for explanation purposes. Just to prove the usefulness of this last part, we can rewrite our pseudo code to be something like:

`login to route-server-1; ping x.x.x.x; if result==OK then return('result: OK')`

Our pseudo code is almost a set of instructions that can be mapped to real API or commands to be executed on alternate systems.

Referring back to [this podcast](http://blog.ipspace.net/2014/07/network-programmability-with-david-gee.html?utm_source=feedburner&utm_medium=RSS&utm_campaign=IOS+hints+Feed) Ivan Pepelnjak kindly let me take part in, a) through k) in our previous requirements list should be broken down in to baby steps. Go through the exercise of working through each step and make notes on how you would manually do each task. That exercise alone will allow you to map each task out in to a playbook to be executed by an automation tool.

#### POV – The DevOps & NetOps Point of View

As a summary and close out, below is a comparison between DevOps and NetOps tools. Whilst Ansible, Puppet, Chef, Salt and the raft of other tools can do some simple network tasks, this journey is but beginning. Imagine a world where we can delegate control for an application to request it’s own set of network resources, provide a ‘one time use’ web portal for a user to verify their requirements and for templates to automatically populate without referring to pesky spreadsheets or text files; a far cry from where we are today, but we are certainly heading the right direction.

| DEVOPS | NETOPS |
| --- | --- |
| Designed to deploy and configure server infrastructure software such as MySQL, Apache; not deploy Enterprise Application specific content such as database content | Used to generate, load and validate configuration for interrelated network applications |
| Designed to ensure correct versions are installed and running | Applications are often sealed in to the OS unless on Network *nix |
| Not designed to deploy intricate interrelated and distributed configuration | Harnesses different southbound communication methods to deploy distributed referential configuration and deal with the butterfly effect |
| Can be used to scale to hundreds of thousands of servers and reduce deployment time | Used to remove repetitive nature of configuration and human error, automate network engineering feedback loops and automate deployment |
| Can be used to finger print environment and for compliance | Can be used to harvest interrelated and distributed network ‘big data’ and for compliance checking | 

</br>
Where is the golden bullet? Without software houses changing how they write software, we’re going to stay right where we are in how we manage application deployment. The good news is, as tools continually improve and mature, people start to think differently. Our adventure is but beginning!