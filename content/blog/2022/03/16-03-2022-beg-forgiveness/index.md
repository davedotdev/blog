---
title: "Serverless: Beg Forgiveness Pattern"
date: 2022-03-16T10:00:00+00:00
image: images/blog/serverless_header.png
author: David Gee
description: "Serverless database pattern to save cash"
signoff: Dave
mermaid: false
categories: 
- serverless
tags:
- serverless
---
When you have access to a resource that’s server bound, like a database, the way you think about consuming that resource is tied to performance and storage. Additional requirements like availability are still important, but as you consume the available database resources when writing code, I can guarantee that operational requirements like availability aren’t thought about.

Serverless changes the consumption model from puppy (you feed it, walk it, and clean up its poop), to rent-a-pup. You have a zero upwards cost model and maintenance is taken care of for you. However, your consumption habits are set to change, as every interaction costs the owner of the application cold hard cash.

In life there is a phrase, “ask for permission or beg forgiveness”. Some applications require multiple database dips and with serverless, I’ve found myself building patterns that assume branch conditions then backing out because it requires fewer database interactions.

Let’s explore an example. There is an application that has a monthly quota for an action and managing that quota involves some database interaction.


1. Var MonthlyQuota: Get user account monthly quota allocation (1 DB dip)
2. Var CurrentMonthUsage: Get the current month’s usage (1 DB dip)
3. If **CurrentMonthUsage <= MonthlyQuota**, then:
    1. Increment the CurrentMonthUsage (1 DB dip)
    2. Do the action (assuming 1 DB dip)
4. If **CurrentMonthUsage > MonthlyQuota**, then:
    a. Return a suitable code to the front-end
    b. Contact the account owner about the quota limit

__*Total Dips: 4*__

If the account has a low number of users, then the number of serverless DB interactions can be disregarded. But if the application grows, then a simple algorithm change can save some serious cash. This is important for founders and bootstrapped builders.

1. Var MonthlyQuota: Get user account monthly quota allocation (1 DB dip)
2. Bump the CurrentMonthUsage (1 DB dip)
3. If **CurrentMonthUsage <= MonthlyQuota**, then:
    1. Do the action (assuming 1 DB dip)
4. If **CurrentMonthUsage > MonthlyQuota**, then:
    1. Return a suitable code to the front-end
    2. Contact the account owner about the quota limit

__*Total Dips: 3*__

### Summary 

I like this pattern. It feels like an easy win and if applied in broadstrokes, can result in some cash savings! The serverless version of beg forgiveness for offerings like DynamoDB, MongoDB and PlanetScale (and other serverless).
