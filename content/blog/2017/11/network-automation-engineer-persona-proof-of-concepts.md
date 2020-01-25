---
title: "Control: Proof-of-Concepts"
date: 2017-11-19T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Control: Proof-of-Concepts"
signoff: Dave
categories:
- PoCs
tags:
- PoCs
---

If you’ve chosen to do a proof-of-concept (PoC), you should already know what the challenge or requirement is, what your satisfactory results look like and what the product or tool set is that will deliver on your commitment. A proof-of-concept is a recipe that should give you a well baked set of results.

#### Approaching a PoC

Approaching a PoC is a conscious decision to trial an idea that if successful, your business will put in to daily production to satisfy one or more business requirements.

So why aren’t the results more apparent in our day to day lives? Why do we not see these decision points more transparently?

Some people approach PoCs as a tyre kicking exercise, or a means to get a vendor to commit to them and then use as leverage against cost. If you’re just playing, you’re wasting time. If you’re tyre kicking then be prepared for lack of commitment or interest in the future from individuals or organisations. Genuine PoCs and evaluations are a normal and acceptable part of business, so the responses are different from those assisting with PoCs.

Approach a PoC with clear intent and understanding of the challenge that faces you. You must know the requirements laid out in the following section.

#### Business Challenge & PoC Requirements

1. The business requirement
2. Benefit to the business
3. Satisfactory results from the PoC
4. Budget
5. Skill requirement / additions
6. Business integration time
7. Support cost and commitments

If you’re doing a PoC based on a whim or “everyone else is, so let’s do the same!”, then good luck. You will probably fail or get accused of wasting time and money.

#### Culture

Danger danger! Culture is the C word of recent times. If your culture is based in a different century, then PoCs using more recent products and tools may cause you significant stress. You might run a totally acceptable PoC and have your manager turn around and say “This product or tool resembles a science experiment, I’m not going to support this”. Your response might be “How infuriating? Do you not know what this could do for us?”. Unless you can prove you know the business challenge information for this PoC, then you’re dead. It’s down to you to get these points across. People from all walks of life work in this industry and clear communication can be the deal maker or breaker. When someone disagrees and it’s apparent they do not understand, it does not mean they’re wrong, it might mean you need to help to get them up to speed on where we are as an industry. Click and point complicated UIs from the 90s are no longer the route to go when purchasing. If that’s the last time they touched ‘automation’, then have some patience and empathy for the rapid changes we’re seeing as an industry.

#### Device Programmability

If your devices do not offer a rich structured API then the responsibility to insert and retrieve data to and from those devices is now pushed to the automation platform or tool.

Good devices offer a REST, NETCONF and possibly even a gRPC interface. Look at this list put together by Ivan Pepelnjak and others here: [network automation rfp requirements](http://blog.ipspace.net/2016/10/network-automation-rfp-requirements.html)

[More recently, Juniper announced the work they’ve been doing with Facebook on Open/R](https://forums.juniper.net/t5/SDN-and-NFV-Era/Facebook-Open-R-Juniper-and-Open-Networking/ba-p/315725). This is another great example of device level programmability, software extensibility and problem solving with great results. Routing aficionados would probably disagree with the approach, but Facebook’s requirements are being satisfied, so who is right here?

#### Automation Product

Does the automation tool have the capability to drive network device APIs? Some tools are totally agnostic and offer zero support out of the box. Some tools are built for the job but may be less flexible when it comes to data handling and decision making in workflows.

More agnostic platforms offer huge rewards in terms of flexibility and integration opportunities, but you might have to do some coding to make them fit to your exact requirements. This coding may be in the form of an integration or extension work.

Specific platforms that talk the language of the network device may not offer rich workflow capabilities and you might rely entirely on the vendor to integrate against your other systems. Sometimes these are referred to as “point source” things.

Open Source platforms are influenced by a user community. It is possible to create pull requests and add/modify code and influence the community to add the features you need or seek advice on how to achieve one of your goals.

Vendor driven and closed source products, unless they have specific claims of extensibility (forget Open APIs, these are different things), then you’re at the vendor’s mercy when it comes to support, adding features and seeking ways to solve your challenges if they’re not immediately obvious.

With this space maturing, you can expect software service houses to offer support for Open Source products if you go down that route.

Some pointers on offer:

1. Consider the pros and cons of open source vs vendor offered
2. Does the automation platform offer network device integration out of the box? Or is the platform agnostic, requiring plugins and extensions?
3. What APIs does the automation platform have? REST, gRPC, GraphQL? The more integrated we become, the more connected things get. Not having GraphQL might not be an issue today, but it might be tomorrow. Know the road-map!
4. What is upgradability like? Is it hard? Will this become a pet? Again, Ivan covers this off with the [upgrading virtual appliances blog](http://blog.ipspace.net/2017/10/upgrading-virtual-appliances.html) and I cover it off with the [upgrading an automation platform](/blog/2017/10/cloud-native-upgrading-workflow-engine-orchestrator/) blog post.

#### Conclusion

Plan, think, empathize and understand your business requirements. Other people would have come before you and other people will come after you. You deal with historic problems and right now, you’re creating problems for the future team and future you. Every business has the issue of the current person taking care of the mess left behind by the last person and if you do things right, your mess will be more manageable for the next person. Good PoCs not only show how well the business problems are understood, but they can offer much needed oil and clear vision into the business. Automation continues to grow deeper and wider and as an automation person reading this post, your impact can be huge if you’re targeted and methodic.

Make your next PoC a great one.