---
title: "AWS DynamoDB with Indexes & EC2"
date: 2022-06-26T10:00:00+00:00
image: images/blog/serverless_header.png
author: David Gee
description: "IAM with DynamoDB, EC2 and Indexes"
signoff: Dave
mermaid: false
categories: 
- DynamoDB
tags:
- DynamoDB
---

Single table design has changed the way I approach database backed applications and I will say, how I model data has improved drastically once you start viewing the world through single table eyeballs.

Every now and then though, something comes up which requires a little additional thinking. When you have a table with a primary key (PK) and a sort key (SK), but you need to query on another field, secondary indexes come to the rescue. Here's an example.


| PK (primary key) | Email (sort key) | AuthProviderID | OrgName | 
| :--- | :--- | :--- | :--- |
| user#$orgID | me@dave.dev | auth\|1234 | Bob's Widgets |

<br/>

The idea is here, that you store all of the user's data in a single row without having fragmented data that's loosely coupled by chained queries. What I mean by this is, consider some API middleware. Once a user is logged in, a bearer token is typically provided to the API. That bearer token amongst other things contains the authentication providers ID for the user and not their email address. That means we have to resolve the email address from a row of data, the same data that contains the data we're actually hoping to retrieve! 

We could just add another row with a simple relational pair, like the user's `AuthProviderID` mapped to the `Email` parameter. That's more data we have to maintain too. Urgh.

Previously I was doing a query to filter for the `AuthProviderID` attribute, but that meant the query would ultimately scan all of the records. With a few thousand users, you're burning away capacity units and increasing response times, in addition to making multiple database fetches as they're limited to 255 records currently. So, I introduced a secondary index on the same dataset. The secondary index is nothing more than a copy of the original table but with (potentially) different primary key and sort key field names. Here's the secondary index arrangement I went for.

| PK (primary key) | AuthProviderID (sort key) | Email | OrgName | 
| :--- | :--- | :--- | :--- |
| user$orgID | auth\|1234 | me@dave.dev | Bob's Widgets |


This pattern meant I can use the secondary index with the AuthProviderID to retrieve the records I require for the middleware with a simple query on primary and sort keys, without affecting any other functionality or dependents on that particular table and layout of keys and attributes. Other functions that query by email aren't affected because the use the normal table with the same data. It means I can spearfish for the data I need, and the response times are blistering.

It worked perfectly...in development. When you have an IAM key that can do all the things, issues like this one aren't seen. As soon as you move the code that accesses the database into production on an EC2 instance, it stopped working and no data came back. Yikes. Knowing the data was fine took the stress out of it (long story, but this is a project for my wife, and she would kill me if I lost her data at this point). I immediately had a hunch this was a permissions policy thing. Low and behold, I hadn't given index access permission in the policy attached to the EC2 role. The line of interest is at the bottom: `"arn:aws:dynamodb:us-west-2:123456789012:table/Books/index/*"`. As soon as I added the relevant permission, everything burst into life. Result.

Overall, this saves a few milliseconds of time, but if you can save multiple API (HTTP) calls, especially on mobile devices, having a secondary index used like this can speed up the whole user experience and make it feel snappy. Also, it's less error checking and generally a lot less than can go wrong! Yes, the secondary index has a storage cost associated with it, but you save on the number of database calls made and API calls from the application itself.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AccessTableAllIndexesOnBooks",
            "Effect": "Allow",
            "Action": [
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
              "dynamodb:BatchWriteItem",
              "dynamodb:GetItem",
              "dynamodb:BatchGetItem",
              "dynamodb:Scan",
              "dynamodb:Query",
              "dynamodb:ConditionCheckItem"
            ],
            "Resource": [
                "arn:aws:dynamodb:us-west-2:123456789012:table/Books",
                "arn:aws:dynamodb:us-west-2:123456789012:table/Books/index/*"
            ]
        }
    ]
}
```
*Note, this isn't my data, it's AWS example data*

The official AWS docs: [https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/iam-policy-specific-table-indexes.html](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/iam-policy-specific-table-indexes.html)

This is your reminder to also turn on database backups! It helps with not inducing heart attacks.



