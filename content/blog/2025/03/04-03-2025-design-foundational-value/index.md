---
title: "Design; the value & perceived value"
date: 2025-03-04T10:00:00+00:00
image: images/blog/diary_entry_header.png
author: David Gee
description: "Design and the value of it has always been contentious. In the era of AI, this is about to get a whole lot worse."
signoff: Dave
mermaid: false
categories: 
- blog
tags:
- rant
- journal
---

_This is a journal entry and has been in the works since the beginning of 2024. I decided to close this draft out and reduce the unwritten blog count by one!_

<span style="color:black; font-weight: bold">Design. </span>That word should not make you quiver with fear, nor is it a box to be checked or an absolute time bound task. In enterprise and data centre network design, they're foundational pillars of information that form tribal understanding for every team from developers to operations, to capacity planning and sales. Getting the design wrong only results in disaster. Is every developer or salesperson expected to understand the granular details buried in the design both explicitly and implicitly? Absolutely not, but there is an expectation at least someone in the business can articulate the design and steer the teams to what it is they need to know. You might argue that domain driven design principles like having a subject matter expert helps and they do, if they're willing to stand up and be counted in the face of strong leadership that is determined to hack code together to fulfil an outcome of moving forwards and adding value.

I've seen this behaviour too many times and I can assure anyone reading this who's experiencing push back on design; you are not alone. Let's explore the facets of this topic in as few words as possible.

The content below is targeted at software-oriented companies I'm hasten to add and some industries really do require academics involved and some industries that focus on an art form approach, rarely need any design at all.

### No Design

Single person startup mode. Absolutely fine, until another person comes along to help.

To go from _**no-design**_ to a scrap book design means a founder or idea keeper has all of the details in their head and now they have to share it. That means articulating what they have in their head in a meaningful way, with as little loss of context as possible. That results in diagrams, explanation paragraphs and maybe even a video capture of talking through the various aspects. If the founding person of the idea is an engineer, chances are it will be technically heavy, and the additional person will need to read in to the value for the targeted customer. A good founder or idea keeper will understand why they are doing what they are doing and will articulate the guide rails and the target form for the end customer.

Rarely does a _**no-design**_ start point keep moving forward without any design, unless it's a single lone person endeavour.

Articulation therefore is the key skill to empty one's brain out on to paper and that could mean talking it through with someone who has no idea what you're talking about initially. As the idea keeper, you must take anyone around you through the various "ahaa" moments and insights that you as the idea keeper generated, harvested and gathered. Any subject matter experts in the team relating to technology used, may steer the approach and they will have deep knowledge as an expert in a subject area, which the idea keeper may not like. Tough beans kiddos. That's the way it is.

### Under Design / Low Design

I guess you don't like eating under baked cakes? People don't like building things that have a gesture of a design either. Under design can offer a pasture of innovation richness, but also bad decisions that are steering points can derail whole efforts. Low design affairs should avoid having cold hard unmovable decisions and be more guidance note oriented. "This is the vision" style language and journal like thoughts of potential dangers and pitfalls. Creative developers and engineers flourish in this environment and the leader, manager or idea keeper has the tough job of rounding up the troops for regular vision alignment sessions. If the leader is technical, then the advice here is for said leader to keep their fingers away from the code of others. You set the bar with the low design approach and you're all about the end goal, not necessarily how it gets there. Each person in the team MUST own their own code until the point it makes money. That is the deal with creative engineers. Cantering on a low number of tech choices helps here for sharing the load across the tribe, so as always, it's flexible.

There is however a hidden problem. When there are layers of dependencies and the _**low design**_ approach is underway, it is essential that the foundations are solid. That usually means picking a mature Public Cloud offering like AWS or Azure. If there are OSS components in the design, then _Danger Will Robinson_. The effect of interference, reverberations and oscillations between layers will really derail efforts. For instance, if code on one layer is trying to post to an unstable data store on another, or the look-up information is too hard to fathom and can't just be plonked into configuration, then you're in for a bad time. An instability in foundational tech like an object store, will absolutely drive your developers insane who simply need a functioning object store. Things like this cannot just be hacked in under the label "We'll improve it in prod". Put the time in to get a meaningful outcome, then your higher-level code can be much simpler from the onset.

### Over Design

A lot of organisations put more effort into Confluence, diagrams and the many permutations of _what if_ than the actual code and infrastructure itself. Sometimes these designs are so over engineered and full of subject matter expert knowledge, it's almost impossible to build against anyway, without each developer being trained to be a subject matter expert. This is the territory of the Distinguished Engineer. The explorative path finding engineer lights the way and guides others through the danger. Their job is to put markers on the ground for everyone else to follow, guiding them around the holes in the road and wasp nests. 

Sometimes however, complex systems to the uninitiated mind can be viewed as _over design_, which is outright dangerous. This is a balancing act. It takes the SME courage to stand-up and justify the time spent. The beautiful curse of this problem is that if the SME is correct, then few to no issues are experienced, resulting in a view of "_**See, we would have been fine Bob. You didn't need to do this"**_. It's a paradox. Provide a solid design and strong foundations, then people involved who are not SMEs and have not experienced WHAT could go wrong are the first to question the value. It's kind of like vaccines. Am I convinced that the government is trying to kill me? Mostly. But do SOME of the vaccines have a place? Sure. This is no different. Our vaccine is a well understood vaccine that some people just aren't aware of how they work and what they can save us from. It takes articulation skills to get that point across.

In situations where over design is at play, it's extremely difficult to unpick design decisions and costly to update diagrams and information. Usually with a skilled SME, changes will be minor and if a core set of decisions has been changed, then it's normally around a whole set of technology as opposed to decisions made FOR that technology choice.

A nice way of thinking about this is, we know what we know, we do know what we do not know, but we MUST trust those who we employ or work with who are trying to stop us from falling into big holes. Once we avoid falling down a hole, we might know then how to look for holes. It's a bit tough when we don't know what a hole in the floor looks like that will break a leg vs one that that will just get your footwear wet.

### Academic Design

This is typical for brand new areas of tech, for research teams and for those trying to solve gnarly optimisation problems. The information from these designs can be codified and passed down into design guides, references etc. Academic design in software rarely appears in production systems because it just can't keep up. Even the beginnings of an academic design have normally been superseded by the choices made by developers and operations teams to keep systems running.

There is a famous and funny story about a SAN design (storage area network). I cannot recall where I first read it but found it hilarious anyway. On spinning disks, the outer part of the disk spins the fastest, ergo, storage systems that only use the fast parts of the disk must be the fastest, correct? A whole academic design was put together on this thesis, with the slower parts of the disk being embargoed. Long story short, the implementation engineer found it all a bit tedious. That engineer built a standard system and did a few optimisations like employing faster disks for caching and slower disks for long term storage, with appropriate RAID configurations for the various use-cases the SAN requirements laid out. The academic engineer made a speech and even I think won an award for the design, all the time the engineer understood the challenges laid out by the end customer and delivered a functional system. When an academic approach takes hold, engineers are constantly swapping messages on back channels during meetings, to translate between academic requirements and reality. You will find blocked out and synchronised calendar entries where the actual work gets done and at some point, there is a disconnect between management, engineering and the academics. There is a noticeable drift, a friction and a constantly emptying team battery who are fighting an unwinnable battle.  A symptom of this would be a key engineer walking out the door for a vacation and the whole team suddenly stop responding. Sound familiar? This symptom is also true in the face of key personnel translating between a visionary leader and the engineering team.

Academic design is great for unchartered territory or extremely complex systems therefore these designs should not be shared with implementation engineers who concern themselves with real, tangible outcomes. Intellectual property and learnings can be encoded into examples and software libraries to make knowledge transfer easier without academic information leaking across domains.

Every time information leaks inadvertently between domains, it takes incredible effort to encode and decode it. It becomes fragile information at best and easy to get wrong.

### Goldilocks Design

It's not easy to define this. A goldilocks design has that __Ahhhh, perfect__ smell to it. That might be WHAT it is, HOW it should work and WHAT the value is to the end customer. It will have guide rails to avoid coding into a corner and will have expected and quantifiable milestones. Rarely is saying it's done ever good enough. Proving it's done is what it's all about.

What are the components of this design porridge?
- Design backed with inputs from SMEs, broken down into working knowledge and codified reusable intellectual property
- Design and goals are aligned with customer needs, both internal and external. Operations will have needs too and they're perfectly valid
- Code is written in a way that is readable and maintainable
- Demo-able code at milestones with stakeholder and team reviews (ideally with early customers)
- A healthy balance of team members that can debate, argue and JFDI without falling out
- Tightly bound contexts, which means 2-3 engineers with a vision owner
- Prevention of flammable decisions _(see closing remark)_

_Note, I have not gone into anything around product market fit and justification for even doing the work in the first place. Let's assume your company has a great idea and people are willing to pay for it._

### Closing Thoughts

All of this is hard. Articulation is hard. Moving between levels of skill in any business is hard. Subject matter experts can feel intimidating to talk to, but without using them, then you're opening yourself up to pain. It's hard. Dealing with a strong visionary leader is hard, because unless you can extract their brain and understand it properly, you're always going to miss the mark and forever be a disappointment. 

I can boil this whole article down to a few things:
- Ask questions. As many questions as you can. Learn to love asking questions
- Learn to articulate your thoughts, cleanly without being overly succinct but without doing mental buffer overflow attacks
- When talking, learn to breathe in. A slow gasp for oxygen or vent of carbon dioxide gives people time to think and organise their brains
- Project your concerns and state what you know to be true. No point saying anything when all hell breaks loose, knowing that it would
- Understand that your value is different to the value of others
- A design should align with your end goals, encode tribal knowledge and serve a purpose, not an ego

Then comes the final amusing truth. After all the stress of what goes into a design for a system or product, working across teams, arguing and fighting for what's right and working through those horrendous self-doubting moments; if your design works, then no one will thank you for it. It's your job and on to the next thing. People only seem to remember what goes wrong. Did you ever wonder why engineers and consultants like putting fires out? It's because they're only ever asked to get involved when there's a fire. There's little fun and no thanks in preventing a fire being lit.