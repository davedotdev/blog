---
title: "Socket disconnected before secure TLS connection was established"
date: 2022-10-25T10:00:00+00:00
image: images/blog/serverless_header.png
author: David Gee
description: "Client network socket disconnected before secure TLS connection was established"
signoff: Dave
mermaid: false
categories: 
- aws lambda
- lambda
- go
- serverless
tags:
- go
- lambda
- aws lambda
- serverless
---

**TL;DR;** When deploying [NextJS](https://nextjs.org/) to [Vercel](https://vercel.com), write code ahead of time knowing it's going to run on [AWS Lambdas](https://aws.amazon.com/lambda/) and make sure you're giving your server-side code time to execute.

### Built

I've been building with NextJS for a while now and it's great for web applications. The server-side functionality[^1] that NextJS offers is great for compact applications *(and very large ones I keep being told)*, providing the execution model works in your favour.

My wife runs a beauty salon and has numerous web application needs, including things like SMS reminders and a client record system. It would be rude not to build stuff for her and this month *(October 2022)*, I created a small subscription management web application for her customers to be GDPR happy.

{{<img50centerlink href="https://unsubscrii.be" src="unsubscriibe.png" alt="unsubscrii.be">}}

### Error

`Client network socket disconnected before secure TLS connection was established`

In development, a server side API call returned early, resulting in this error. Despite it being bad on my part, it was also a great case of Sod's Law[^2], because it worked fine in development!

Because the back-end happens to be deployed on Lambdas, I had a gut feeling I knew what was going wrong when I saw the error. The Lambda function will not execute properly if you return early and the dreaded error will absolutely be seen. Ensure that your server call is `async` and you are resolving `promises` correctly. Problem solved and panic over. I wonder how many open issues are because of logic around the Lambdas and not allowing them time to execute, despite the app working on the developer machine!

**Additional Material**

- [Stack OverFlow](https://stackoverflow.com/questions/60684227api-resolved-without-sending-a-response-in-nextjs) thread
- [GitHub](https://github.com/aws/aws-sdk-js/issues/3591) thread

[^1]: If you have lots of async business logic buried in REST APIs on servers, NextJS doesn't exclude you from accessing those APIs through the client-side logic or server-side. Client side works as per expectations, even with the normal client side auth systems. You have many choices for your use case!

[^2]: It's the British cultural axiom of [Murphy's Law](https://en.wikipedia.org/wiki/Murphy%27s_law).