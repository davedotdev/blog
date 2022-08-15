---
title: "Loosely Coupled API & Client Versioning"
date: 2022-08-02T10:00:00+00:00
image: images/blog/diary_entry_header.png
author: David Gee
description: "API Loose Synchronicity between API and client"
signoff: Dave
mermaid: false
categories: 
- javascript
- react
- nextjs
tags:
- ui
---

"Naming things & cache-invalidation are the two hardest things in IT" [says Martin Fowler](https://martinfowler.com/bliki/TwoHardThings.html). I'll add to this list "API Versioning" or the wordier version; should the API subsumer be loosely coupled to the API version so that users understand versioning alignment immediately? If the major versions match for instance, I know that the subsumer has backwards compatibility. 

You also might be wondering why I used the word subsumer and not consumer. When a downstream client that's a library, SDK or script interacts with an upstream API, it doesn't consume it, rendering it *gone* for other users. It's subsumed and there for others to *enjoy*. Data in a message broker queue however can be consumed; i.e., it's read and deleted. There's a difference. 

From this point onwards for this blog/rant, the API is the thing being subsumed, and the subsumer is the client library or SDK. 

Onwards!

## Humans don't RTFM

An API can come in many forms. Some examples include functions, methods and classes a library exposes, a REST, GraphQL or gRPC interface or even an SMS interface for ordering pizza. APIs offer means of interaction with a system at the programmatic level, whether high level like REST or direct interaction at the code level. Each level that the API is exposed will offer a set of semantics and contracts (documented behaviours you can trust, or at least supposidly). Some API types offer schemas to guide the developer or integration creator, some have basic documentation. If you're really lucky, there won't be any at all.

Problem number one; humans are generally terrible at reading the docs, choosing to instead, go to Reddit, Stackoverflow, Git or dare I even say Medium for inspiration. If you see a version of an SDK with its own API at `0.1.0` and you know the system or product API version you're working with is `0.14.2`, can you deduce anything other than the development cadence is different? It says nothing about compatibility for the major or minor versions.

Its normal to see this loose relationship between the API and subsumer and it drives me nuts. There is also the conversation of completeness and how much of the exposed surface area of the API the subsumer interacts with. Then there's also the notion of backwards and forwards compatibility to deal with.

Back to RTFM; I beg you, give your users, consumers and subsumers half a chance when building or using integrations. There are accepted knowns on version control and this isn't a big ask.

## Major Version Synchronicity

I like when a subsumer version tracks the upstream API version. There is no magic rule, but take the use case below, it feels nice.

An API has a version of `1.1.2`, and a subsumer has a version of `1.0.0`, which offers forwards and backwards compatibility within the 1.x.x major release train and the documentation states, that the minor and patch version digits are for the subsumer, whereas the major number tracks the API. Feels nice, doesn't it? If you did an upgrade to `1.1.0`, you know full well that you've picked up a minor subsumer version for the `1.x.x` major API version with contractual guarantees that you have backwards compatibility in the major release. It would also mean changelogs were meaningfully scoped. New major version, new dump of docs and no guarantees on breaking changes. But that's fine, because it's in the name of progress. Major release means MAJOR things. This is all compatible with [semantic versioning](https://semver.org/) and if you're wondering what to do, my vote is for making a nice developer experience. After all, the subsumer is an integration of something else, so why muddy the water?

A nice article I skimmed on API versioning : [https://nordicapis.com/simultaneous-platform-wide-versioning-how-to-implement-api-to-sdk-synchronicity/](https://nordicapis.com/simultaneous-platform-wide-versioning-how-to-implement-api-to-sdk-synchronicity/)

In case anyone tries to steal this, I coin the term: "Major Version Synchronicity". 
I would love to see API integrations using the term "This $thing adheres to MVS".