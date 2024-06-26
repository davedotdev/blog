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

Now you're going to be wondering, how do you get the value if you just bumped it up? DynamoDB offers a nice little function as part of an update, in which the value is bumped and you can return the pre or post update value. This embodies the beg forgiveness pattern. Update a value regardless of said value and return it to your code. That way, if your branching logic is to proeed, you've already done the update and if not, disregard it and exit as quickly as possible.

This is an extract of doing just this in Go with AWS DynamoDB.

```go
UpdateExpr := "ADD #currentUsage :inc"
input.UpdateExpression = &UpdateExpr
input.ExpressionAttributeNames = map[string]string{"#currentUsage": "CurrentUsage"}
input.ExpressionAttributeValues = map[string]types.AttributeValue{}
input.ExpressionAttributeValues[":inc"] = &types.AttributeValueMemberN{Value: "1"}
input.ReturnValues = types.ReturnValueUpdatedNew // Tell DDB we want the new value
```

### Summary 

I like this pattern. It feels like an easy win and if applied in broadstrokes, can result in some cash savings! 