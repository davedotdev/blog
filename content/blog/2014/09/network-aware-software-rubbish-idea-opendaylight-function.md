---
title: "Network Aware Software: Rubbish idea or OpenDayLight Function?"
date: 2014-09-08T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Network Aware Software: Rubbish idea or OpenDayLight Function?"
signoff: Dave
---

#### “Sir, Skynet is self aware…”

Not really the line anyone wants to hear, especially after watching the Terminator films! This however isn’t what this post is about, so if you’re a bit of a rebel, fear not. No network vendor branded termination thing (maybe other than poor documentation or code) will result in your death.

Since the era of the abacus, little consideration has been given to how software that relies upon a computer network actually interacts with it. Sure, most developers know how to drive a socket library and make things happen at a session level, but almost no consideration is given by a developer on how to deploy an enterprise application to a production environment.

This post represents a set of thoughts that have been maturing over the last few months. They are very much my own thoughts and do not represent those of others. I would be interested to hear if you have the same thoughts or any interesting different takes.

#### Where does this story begin?

Before smart phones and tablets came along, software for the domestic populous provided a means of typing and printing spell checked letters to your pen pals, figuring out your weekly shopping finances, playing solitaire or minesweeper and maybe tweaking some images. Along came the mobile devices and they completely changed the way we consume data. Web services became prolific; Facebook embedded itself in to everyone’s lives for stalking and spreading STDs, and Twitter became the de-facto news medium. The Internet and services accessible via the ‘tinterweb’ has revolutionised the importance, value and usability of data. A duality exists in every story and this is the story of the duality of web services and how they’re deployed.

#### Eh? This duality you speak of?

Software has typically been written in a fashion that relies on the underlying operating system TCP/IP stack which is normally dependent on the operating system kernel. Browsers are of course an exception to this, but browsers provide us, the human ‘beans’, a method of visualising data and do not in turn provide data en-mass to users on a network; unless you have some pesky malware installed that has ‘data leakage diarrhoea’ in which case, oh dear.

If software is written with reliance on an underlying operating system for network connectivity and that operating system relies on an operations team for deployment and maintenance, a heavily contrasted disconnect exists between an application and the thing it uses to send and receive data. The operations teams are the gateway to deploying systems used to generate, manipulate, store and deliver data to end users. This operations team is under ever increasing pressure to deliver more with increasing velocity. VMware, OpenStack, Xen, Docker and containerised Linux provide a means of deploying instances of operating systems and run time environments. Tools like Puppet, Chef, Ansible, Vagrant and Salt provide a means for loading those environments with applications and still there is a disconnect between network provisioning. Whether for routing policy, load balancing, firewalls, broadcast domains; it still all relies on a knowledgeable and cooperative operations team to deploy and wrap the network around an application.

![data_plane_decouple](/images/blog/data_plane_decouple.png#center)

Data is now a commodity; people consume and generate it all day long, every day. There’s so much data, we have data that describes data.

Every application on your phone consumes data across a network. Your TV, games console, laptop, tablet, Tivo, Sky TV…the list goes on. With normal household appliances like refrigerators, microwaves and toasters all joining the era of the network, the disconnect between what an application does and the medium it uses to do so is widening.

Sure, we can use some orchestration software to deploy network configuration, but back to an earlier point, it’s a wrapper. We’re deploying network code based on templates and patterns and as a reaction to a provisioning event or preparation before one. The software still has no clue about the environment it lives and dies in. The network is viewed as a magic pipe. Packets go in and if you’re lucky (or have just got a well built and well behaved network), packets go out the other end of the magic pipe towards their destination.

#### Hang on hang on, we’re solving this by using good tools!

You could always argue that a good automation tool is designed to remove the pain and provide the logic to wrap network constructs around an application to allow it to function. This post isn’t that argument. That’s the set of steps we as an industry are walking right now.

#### The future?!

Imagine a world where applications of their own accord request network resources. Network applications could discover each other and request as an organised group the resources that they need to operate. Imagine multiple applications seeing each other on a network and deciding that their purpose in life is to do the same thing and by vote, ask a load balancer to share traffic between them. Imagine one of the bits of software realising it’s not doing as well as the other one and asking to be weighted down? Scary thought? Distributed logic, more complex but potentially game changing hive logic? Going from a manual push to an automated pull model making sense? The security aspects are wholly appreciated at this point and the groans of the info sec readers can be heard. It is completely acknowledged that whatever mechanism allows an application to talk to the network will naturally become the attack hotspot. HOWEVER let’s not forget, hotspots such as this already exists today and authentication combined with authorisation services make the situation manageable. Bad and potentially ‘ill’ networks expose all for the world to see so this model could in fact be an improvement. Kind of like that little crazy ginger girl we all knew as a kid who took her bra off and swung it around her head but suddenly grew up in to a respectable woman (/cc @amyengineer ?).

Without getting in to an argument for constant integration, out-of-band networking, spooling up and down test NFV VMs, let’s present an image of how network aware applications could operate.

![data_plane_decouple_REST](/images/blog/data_plane_decouple_REST.png#center)

In this scenario, applications would have another library included at compile/run time that in turn allows them to request network resources from a network automation API gateway. Right now this facility exists via a REST API with tools like Ansible Tower, although the approach typically is to hook Ansible Tower to an orchestration tool as opposed to the applications themselves. A software design and operational architectural change is required under this model in order for a given application to request network resources. Applications will be required to authenticate against the network service, along with acquiring authorisation to perform specific requests. The API would need to provide role based access control to prevent critical connectivity being interrupted by misbehaving, compromised or questionable applications. Common sense ultimately still prevails here. As the guardians of the network galaxy, it’s down to us to enforce the common sense aspect! This of course is a high level suggestion and lots of thoughts are missing, but short of writing a dissertation and carrying out all of the research, there it is. It all points back to policy languages however and I expect this trend at least to grow. Pools of resource as opposed to specific snowflake configurations etc.

So a proposal. OpenDayLight could be the perfect adoptable platform for this. Open source, growing community and full of experienced and wiser people than myself, who also might point out this is a terrible idea and complete tosh? However it could be another string the ODL bow and potentially a game changing one. Is this a mad idea or an alternative to the problem we face?