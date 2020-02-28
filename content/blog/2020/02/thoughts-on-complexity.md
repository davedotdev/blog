---
title: "Some Thoughts On Complexity"
date: 2020-02-26T23:00:00+00:00
image: images/blog/complexity_header.jpg
author: David Gee
description: "[1/4] Composition & Service Function Chaining in Network Service Meshes"
signoff: Dave
categories: 
- Software Design
tags:
- Complexity
---

Brace yourself reader. Future me, you may disagree with what’s in here. This is more of a ledger of notes reflecting my current state of mind. Much coffee has been consumed, much sleep has not been had and mini me has cried. A lot. 

Complexity is fascinating and the way we all throw it around like a wet sock, is even more interesting. When is something complex? Is a puzzle complex because it took a long time to solve? Is a computation complex because of the IO it requires? Then there’s the whole thing of complexity being a metric, capable of increasing and decreasing. Just because you understand something complex, does it mean it’s no longer complex? Put another way, does it have transformational properties? Can complexity itself be hacked up, chopped up and fed to the pigs? What if complexity is hidden, does it mean it’s gone? What about computational complexity? That’s a wide set of ongoing work, does that have the answers? What about algorithmic handling of complexity, that solves it right?

I’ve come to a view, my view, that complexity is non-transformative. When present in a system, it’s always present. It’s recognised in the eye of the viewer and in some shade of grey. 

As always, thoughts are written down and explored as I’m writing. I share for the purposes of sharing, not to appear correct or authoritative. I welcome debate, but if you just want to say “YOU’RE WRONG”, move along. Save your life energy for some other noble battle, keyboard warrior.

#### Computational Complexity

Computation Complexity is a well studied field. Wikipedia describes it beautifully (in my opinion) as thus: “The computational complexity of a problem is the minimum of the complexities of all possible algorithms for this problem (including the unknown algorithms).” This could be time spent, resources consumed and specifics like number of states and operations generated to get to a computational result. 

With respect to resources and rom my own perspective, it’s also the amount of brain power a like minded group apply to a problem so that it may be solved. Like minded groups could be an industry type of engineer and a group like this allows some observable measure of how much they struggle. They’re also likely to debate about known approaches and speak a common language. Lone engineers may not see difficulty in this way. You’ve all experienced what it is to achieve flow and harmony when tackling problems. The difficulties and nuances tend to turn invisible after a while and your brain lives in a realm no other biped can enter. It’s not that the complexity goes away, it’s just you’re in tune and there is no onlooker to feel it.

Complexity in the context of these notes, exhibits a group property. This makes sense from a system development perspective and why it’s so important for developers to leave great notes and information on how to manage, mend and extend a system that has had an individual or group reach harmony with the complexity.

#### Psychological Complexity

This is where we begin to fall apart. If one person understands something another person does not, is it lack of knowledge? Is it lack of brain horsepower and cognitive reasoning? Or is it just a time game? What if the thing is complicated in nature? Does that limit the numbers of people who can understand it?

Understanding something and making statements about it, make you wonder to the competency someone has around the something.  Complexity then becomes dependent on the competency of the something, but life experience when present will help the person not say something ignorant. One might argue, it reveals more about the person making the statement than it does the thing.

![Four Stages Competency](/images/blog/four_stages_competency.png#center)

All too often, one person may understand something deeply, then tell someone else ‘but it’s easy’. One person may read about it and think they understand. One person may think it’s all too easy to abstract it away, without realising the abstraction itself limits what you can do with the complex thing. Just because it’s abstracted, obfuscated or hidden, does not mean the complexity has been removed. 

*Donal O’Duibhir provided some insight for this section. Thank you sir.*

#### Common Sense or Conventional Views
“We let software do that”. Right. Machine Learning today is popular for so many reasons. Take a [neural network that plays Super Mario](https://www.youtube.com/watch?v=qv6UVOQ0F44), it will learn against a goal and keep rebirthing until the goal is met. Just this month, a new antibiotic has been discovered using machine learning. No doubt that was a complex experience for a human and required a long time duration. Machines have the benefit of speed for many tasks and humans have a very different experience of time. Mario died some ~30M times so that the neural network could learn how to play and win. Fancy doing that with your network automation? Didn’t think so.

A set of complex operations can be done quickly and without much human knowledge as to how. Your experience has been simplified for these technologies and by definition does that mean the complexity has gone? I don’t vote yes.

#### Abstractions
You’ve abstracted something. You’ve reduced the power of the complex thing by simplifying the way you interact with it. You’ve done so by removing attributes, temporality or spatial aspects. A perverse twist on this would be you’ve also potentially made your system more complex, due to needing more abstracted logic blocks to perform the same job as the thing you just abstracted.

> The essence of abstractions is preserving information that is relevant in a given context, and forgetting information that is irrelevant in that context.
    – John V. Guttag
    
I like the above. It’s an entropy reduction approach to solving challenges and thus, putting bounds on the complexity so that it may be handled properly. 

#### Obfuscation
Obfuscation can be defined as making something obscure to read. It’s common in software development to obfuscate code using off the shelf tools to protect IP and slow down malicious actors.

It feels like sometimes, we all set out to make our own life’s harder by inadvertently obfuscating systems that we build. Let’s try not to do that! It just adds more complexity.

#### Algorithmic Handling
Take a routing protocol or application like BGP. For the initiated, the rules are known, but when applied through policy to a dynamic creature like an enterprise routing table, or even more fun, the internet routing table, humans rapidly lose the ability to cognitively figure out what’s going on. 

The algorithms do something complex at scale, but that’s not enough. The scale of some interactions still hurt human brains when they do something you didn’t foresee and you have to troubleshoot.

Even in a perfect world where algorithms take care of problems for humans, the algorithm itself swallows the complexity. It’s still there.

Algorithms move the complexity to an off the shelf approach, binding it to a known state space. Great until it goes wrong.

#### Encapsulation
Thinking about this in a programming way, I could create a data type to store information say of a BGP peer, then have methods to trigger parts of the BGP algorithms and functions. 

The complexity is managed through the data and operations against it, with a programmer specific interface. 

If this was a programming language with a linked library, like a DLL, you are trusting the developer of the library that it performs as you expect and now need to test black box behaviour to ensure it works. The complexity is within the library and again, the integrity of the interacting or consuming program could be weakened for handing off something complex and blindly interfacing against it.

Now, the philosophical point of “the complexity is someone else’s problem and I don’t have to worry about it” stands. If complexity is purely based on ownership or domain, then sure. If you’re working system wide, then I disagree. The complexity is now hardened against the world outside the encapsulation and harder to deal with from within. One could also argue that the damage that the encapsulated ‘thing’ can do is also limited, but I’m thinking about the ease of managing the system on the whole should the damage have already happened.

### Industrial Process Complexity Reduction & Promises 
Simple workflow engines were inspired by industrial processes.  This means we take Boolean outputs from a process to see how it’s doing. TRUE for good, FALSE for bad. What does true say? In the case of an industrial process, it might be that we have power and the actuator is energised. It tells you nothing of the process itself. You have to delegate trust to a set of promises and test for the promise. Promises.

The simplest processes are closed loop. They have one or more variables that act as set points and actuators designed to alter a measurable aspect in the process, bringing it closer to the variable set point. We expect the engineers have added enough transducers to measure flow, levels and even energisation of the actuators. We can therefore place the notion of a promise on to this system. The system promises to behave in a certain way, we can measure inputs and outputs so that the process may be observed and ship the summary outputs to the wider plant control to measure flow or work rate.

Zooming out from the last paragraph, the complexity has been reduced to a set of primitives but it’s still there in the process. We have decoupled it from the core of the plant process, but it’s still there for an engineer to fight with another day.

### Redesign to Remove
This one is my favourite. Complexity can come about because of bad design, or badly thought out approaches to problems. It’s normal to see at least three of four proof-of-concepts to a problem with number five being what makes it into production. By exploring the problem and growing the software to handle the requirements, complexity can be exposed, then re-modelled as your understanding changes.

In my experience, most challenges that exhibit complexity, can only be reduced in a measure of complexity, but not completely. Mathematicians, scientists and engineers, devote much of their careers trying to solve problems that exhibit complexity. Someone else’s conscious and unconscious understanding will lead to a lesser capable person’s ability to handle complexity within certain state spaces, a created algorithm has been designed to work within.

### MicroServices
A divide and encapsulate mechanism to designing and deploying software. In this case, we now have the added surface area of proxies, service meshes, catalogues and more. In networking, especially service provider networks or parts of a network with high over-subscription ratios, we accept that multiplexing many things over a single set of interfaces and nodes can give us issues like shared fate and unequal treatment under congestion. Micro services has done for software what multiplexing did for networking. Made things harder. I won’t go into extra requirements like tracing and logging.

One could argue, by dividing the problem up, there is an expansion co-efficient of complexity. It’s like hitting an orange with a hammer in a humorous attempt to remove a segment. Sure, you’ve removed a segment, but now need to scaffold the orange back together and the slice, so that they resemble the objects they were originally. They will never go back together the same way, without surgical alterations, much in the same light as software.

To solve ‘network problems’ with micro services, means that you’re effectively an application arranger, much like a gardener. You’re no longer genetically engineering the flowers but arranging them in a flower bed. In reality, you’ve shifted the complexity to a different domain, like searching for re-usable components, normalising the data that flows between them and planning system scalability, resiliency and load bearing strategies.

Complexity just moves around and with this pattern, you’ve even birthed more one would argue.

### Close

This was a fun super quick post on some views on complexity. Complexity requires definition and careful exploration in the area that you perceive it. Sweeping statements often don’t work and especially in areas when you have no idea what the purveyor of complexity statements is experiencing. 

We as humans change the definition of complexity to make it fit, we reduce entropy, increase constraints and change acceptable outcomes to reduce the output effects. Complexity is all around us, buried in every problem and I’d love to hear your views. Defining complexity is by it’s very nature complex and it makes it fun to discuss and think about.

<hr/>

#### Resources

https://en.wikipedia.org/wiki/Computational_complexity

http://www.mccc.edu/~lyncha/documents/stagesofcompetence.pdf

https://en.wikipedia.org/wiki/Four_stages_of_competence

https://www.youtube.com/watch?v=qv6UVOQ0F44 (there are some great links on the YouTube page)



