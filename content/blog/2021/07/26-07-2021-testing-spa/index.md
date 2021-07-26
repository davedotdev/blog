---
title: "Testing Single Page Apps: React front-end & REST back-end APIs"
date: 2021-07-26T10:00:00+00:00
image: images/blog/complexity_header.jpg
author: David Gee
description: "Some words on testing single page applications with React and a REST back-end with JWTs."
signoff: Dave
mermaid: true
categories: 
- jwt
- ui
- testing
tags:
- software development
- cloud
- headache
---

For my side projects, I’ve been working towards a nice modular unit of scale, in which a compute unit (VM) delivers services glued together by the excellent [NATs](https://nats.io/). These services feed [JWT token]( https://jwt.io/) authenticated APIs with capabilities like sending emails, SMS messages, retrieving files from object stores and so on. If I need more scale, then I deploy one of these self-sufficient units. Simples, until the underlying database or object store can’t handle it, in which case my pet project has made it big time and I have other nice problems to worry about.

These scale units are not monoliths but they’re also not micro-services. It’s a deployment unit. My mental visualisation is a control knob with say a hundred clicks where each click adds extra performance to the stack. Beyond the hundred clicks, there is a whole set of love problems to worry about. I’m not worried about that. 

I’m quick to add, these are not micro-services, because I don’t need that kind of ~~crap~~ joy in my life, especially for my long-lived projects. One person can make a difference (Knight Rider), but I’m not sure that stands true when dealing with micro-services.

### Loose Coupling of Components

It’s no secret, I’m fairly new to React, not new by bootcamp standards, (I’ve never been to bootcamp) but I’m moving reasonably quickly with it and want to test my different versions of a UI with different deployed back-ends without introducing security risks or even worse, requiring some kind of a cache containing audience fields that are referenced in JWTs. Yeesh. The underlying requirement is to extract the audience field from the token presented and assess whether the token is meant for the service doing the inspection.

I played with doing UI/API A/B testing with just DNS but that means `/etc/host` file changes and the assumption an API will always be available on port 443, which I can’t guarantee. Also, DNS is blamed for everything and I for one will make a claim like “I won’t forget that the host file has an entry overriding the internet’s global one” and then I’ll forget. Egg meet face.

My testing procedure then looks to be:

1. Clone the UI repo to be tested.
2. Update the UI (.env vars) config which refers to the API URI, which for my needs the service’s A record will be on the same `example.com` domain. The URI itself will not only be the end-point called, but also the audience field for the token when it’s requested. 
3. Ensure that the OIDC system (I use both Auth0 and Keycloak) can handle the generation of a JWT with variable audience field, for example: `api12.example.com`, even though there might not be an API or service registered. Keycloak is awkward, let it be said. You need a mapper or the UMA functionality.
4. Clone the API service repo and change the configuration to ensure it attempts to validate tokens using the audience field (itself).
5. Launch the API service with the wildcard SSL cert and observe logs, developer console and network traffic.

This way, testing is safe, not complex and the worst-case scenario is a botched test in which case, I just delete the two cloned repos. If I wanted to test a new front-end on an existing backend? Leave everything as default. Simple.

### Wrap

My initial thinking was to do this via DNS but for the issue of assuming port 443 was always going to be available, that isn’t viable. The other issue with DNS is, it’s ALWAYS DNS when stuff goes wrong. A forgotten about `/etc/hosts` entry could cause chaos and lost development time.

Going down this route, I don’t need to worry about a multiple audience-based approach either. The production infra (if it can be viewed as that!) is based on a single DNS record for the API and is load-balanced. For example, all front-end REACT apps use `api.example.com` as their back-end and thus the audience is static other than testing weird combinations or for absolute concrete evidence the system is under test.


