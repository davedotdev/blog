---
title: "AWS Lambda in Go, running locally with SAM and Docker"
date: 2022-08-02T10:00:00+00:00
image: images/blog/serverless_header.png
author: David Gee
description: "How to build and test AWS Lambdas locally before deploying to AWS!"
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

Serverless is game changing. Nuff said. For the sake of argument, serverless is everything I don’t need a server for. A non exhaustive list would be object storage, Functions-as-a-Service, identity management, content distribution for your front-end clients and maybe even DNS. Each public cloud provider offers services that can be interacted with or glued together by serverless technology, like message queues and glue logic.

{{<img10 src="aws_cb.png" alt="AWS-CB">}}  This post focusses on AWS because it’s what I’m familiar with and I happen to like it. AWS has transformed what I can build and how I can build it. Good architecture design will help keep costs low and yes, it’s all too easy to run up that $50k cloud bill and have to be forgiveness from the cloud gods so be careful! 

**Disclaimer and alert!** I'm in the 2022 AWS Community Builder programme under the serverless category. I'm absolutely honoured to have been picked and join over five hundred others globally. This is my first post on AWS serverless for the community at large and I hope it's useful. I Googled for this not long ago and figured it was worth a share.

## Workflows

I used to be a technical product manager and technical marketing engineer for an automation platform known as [StackStorm](https://stackstorm.com/2019/10/07/stackstorm-joins-the-linux-foundation/), which is a rich tapestry of workflow engines and integrations, some of which were built in, some were plugin based. You can hook StackStorm into Slack, emails and network points of control and drive it programmatically using REST. StackStorm offered a model of [event driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture), in which processing was highly asynchronous and de-coupled. What that meant was each function would execute in its own memory space, isolated from its calling code. Each function’s outputs become available as the next functions input. To word it a different way, imagine having a flow chart of logic, with each square being a function of code and each decision point being glue logic. Events flow between each block in the flow chart, with input and output information from previous blocks. An event being nothing more than a blob of information with fields like a UUID, calling reason, timestamp and maybe outputs from other functions.

Each function is separately invokable with StackStorm and is stitched together via a workflow engine, which is the flow chart aspect. Changing the language to AWS from StackStorm, we have different semantics and a kit form of StackStorm ready for assembly.

## The Components

AWS offers a number of technologies that make this possible. Here is a non-exhaustive list and the ones I seem to gravitate towards:

**Lambda** is the name of the Functions-as-a-Service service and name of an instance of a function too. It’s possible to write Lambdas in popular languages like Go and JavaScript. These Lambdas can be invoked internally or externally via REST thanks to [Lambda URLs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html) **which were announced April 2022! These are separate functions.

**Step Functions** is a low-code visual workflow designer, which acts as a workflow engine. You can visually compose a workflow from 200+ AWS services with some 9000+ API calls. Impressive.

**SQS** are queues that can offer “deliver once” or “at least once” semantics and provide the much needed decoupling between components. If you’ve never used a queue before, think of them as pipes that can maintain order. These pipes offer linkages between different services, in our case, between Lambdas.

**DynamoDB** is of course the serverless database of choice! It can be used for simple things like a key/value store, or relational data with single table design. it also supports streaming, which is handy because it provides an easy coupling between dependent components. Worded a different way, imagine you have a Lambda that needs to do work when a record is updated or created. Streaming can help you achieve this model easily. 

**S3** is a powerful object store and I’ve constantly been blown away by just how good it is. It’s almost a utility at this point and without it, I’m sure a lot of businesses would die over night.

**Amplify** is a set of features for hosting everything from a website, to a full application, complete with back-ends (Lambda) and identity management through Cognito. It integrates easily with Route53 too, making DNS management easy.

**Cognito** is the identity service, which competes with Auth0 if you’re familiar with that. Need user accounts for your application and sign-up capabilities? Cognito is your thing.

**Route53** is DNS management. You can register domains using this service, or just run hosted-zones if you have a domain name provide elsewhere. It offers all of the expected DNS capabilities and can help you with geographically resolving records to regions local to the user etc.

**Cloud Trail** is the logging mechanism for AWS. Lambdas log to this (if you set it up correctly) and it’s the service for serverless ops. 

**SAM** which stands for Serverless Application Model; which is an open source method of creating serverless applications. This blog post focusses on SAM and it's mightily useful. [https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) 

You can read more about AWS Serverless here: [https://aws.amazon.com/serverless/](https://aws.amazon.com/serverless/) 

## Testing Locally

I wrote previously ([https://dave.dev/blog/2021/07/14-07-2021-awsddb/](https://dave.dev/blog/2021/07/14-07-2021-awsddb/)) about using DynamoDB on your dev machine. That was great for learning and dev work. Truly. But for Lambda we need something similar. You might imagine, building and debugging on the AWS console can be tedious. 

When exploring running AWS Lambdas locally, I started here: [https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html) and quickly realised it was way easier than I thought it was going to be. You can absolutely develop and test Lambdas locally in whatever language the Lambda runtime supports and next I'll share how.

## Hello World (or is it a ruse?)

Swear-0-meter has been trimmed to zero, let’s go!

Step one is to install the `sam cli` and I’ll use brew, because it’s simple. Also ensure that you have Docker installed and running, because SAM runs the Lambda instances on Docker.

```bash
brew tap aws/tap
brew install aws-sam-cli
```

*Issue 1! I needed to update xcode on my machine. Swear-0-meter[1/x].*

After the brew commands completed, I had a working installation of SAM with version `1.55.0`.

Next, is to install the Visual Code AWS Toolkit which was the click of a button, so I’ll spare the screen shot. Just read this: [https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html). If you don't use VS Code, no problem. Plugins for other IDEs exist.

Next, we need to create a sample application. Create a directory called something creative like “delete_me_42” or something like that. Traverse to that directory and then run the command `sam init`.

```bash
# Run this command
$ sam init

You can preselect a particular runtime or package type when using the `sam init` experience.
Call `sam init --help` to learn more.

Which template source would you like to use?
	1 - AWS Quick Start Templates
	2 - Custom Template Location
Choice: 1

Choose an AWS Quick Start application template
	1 - Hello World Example
	2 - Multi-step workflow
	3 - Serverless API
	4 - Scheduled task
	5 - Standalone function
	6 - Data processing
	7 - Infrastructure event management
	8 - Lambda EFS example
	9 - Machine Learning
Template: 1

Use the most popular runtime and package type? (Python and zip) [y/N]: n

Which runtime would you like to use?
	1 - dotnet6
	2 - dotnet5.0
	3 - dotnetcore3.1
	4 - go1.x
	5 - graalvm.java11 (provided.al2)
	6 - graalvm.java17 (provided.al2)
	7 - java11
	8 - java8.al2
	9 - java8
	10 - nodejs16.x
	11 - nodejs14.x
	12 - nodejs12.x
	13 - python3.9
	14 - python3.8
	15 - python3.7
	16 - python3.6
	17 - ruby2.7
	18 - rust (provided.al2)
Runtime: 4

What package type would you like to use?
	1 - Zip
	2 - Image
Package type: 1

Based on your selections, the only dependency manager available is mod.
We will proceed copying the template using mod.

Would you like to enable X-Ray tracing on the function(s) in your application?  [y/N]: n

Project name [sam-app]: test

Cloning from https://github.com/aws/aws-sam-cli-app-templates (process may take a moment)

    -----------------------
    Generating application:
    -----------------------
    Name: test
    Runtime: go1.x
    Architectures: x86_64
    Dependency Manager: mod
    Application Template: hello-world
    Output Directory: .

    Next steps can be found in the README file at ./test/README.md

    Commands you can use next
    =========================
    [*] Create pipeline: cd test && sam pipeline init --bootstrap
    [*] Validate SAM template: sam validate
    [*] Test Function in the Cloud: sam sync --stack-name {stack-name} --watch
```

These choices are enough for SAM to create you a working Go Lambda.

Here is a tree view of the files SAM creates.

```bash
cd ./test
tree

.
├── Makefile
├── README.md
├── events
│   └── event.json
├── hello-world
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   └── main_test.go
└── template.yaml

2 directories, 8 files
```

## And run?

The Lambda created is an example of using the API Gateway functionality and can be executed right out of the box using the provided event. However, it didn’t work for me using the browser. The easiest way to test this is to provide a synthetic event which pretends to be an API call coming through the API gateway. The `-e` switch is for passing in the event file.

```bash
sam build
sam local invoke -e events/event.json

Invoking hello-world (go1.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-go1.x:rapid-1.55.0-x86_64.

Mounting /Users/david/Documents/blog/SAM_Test/test/.aws-sam/build/HelloWorldFunction as /var/task:ro,delegated inside runtime container
START RequestId: 3c999a79-6ea7-4e87-b934-22a1995f9dd1 Version: $LATEST
END RequestId: 3c999a79-6ea7-4e87-b934-22a1995f9dd1
REPORT RequestId: 3c999a79-6ea7-4e87-b934-22a1995f9dd1	Init Duration: 0.96 ms	Duration: 696.86 ms	Billed Duration: 697 ms	Memory Size: 128 MB	Max Memory Used: 128 MB
{"statusCode":200,"headers":null,"multiValueHeaders":null,"body":"Hello, xxx.xxx.xxx.xxx\n"}
```

Great, it worked! Just like that we created a Go Lambda and ran it on Docker on your machine. You can now hack around with the Go code because the build process is more of the same. From here, you can use SAM to deploy this Lambda to your AWS account if you so wished.

## Digging in

The SAM example has three important parts:

1. The `template.yaml` SAM template file which contains everything that Cloud Formation needs. You can also include inline IAM policies which makes the whole thing a breeze. Be diligent surrounding your `Events:` input in this file too. You might need to cater for EventBridge or SQS instead of the API Gateway.
2. The `events/event.json` file containing the synthetic testing event. Ensure your synthetic events align with your use case.
3. The Go code and Go test file. Maintain the pattern in your code with the `main` entry routine calling the handler function. The Lambda run time needs to know the entry point and will pass in various instance types of data depending on what you're triggering your Lambda with.

You can invoke local Lambda instances through SAM and also get the remote logs too. I’ve found the Visual Code AWS Toolkit to be more than useful and it’s a great companion for testing and developing Lambdas.

A working example on GitHub is provided for you, which has a `template.yaml` file that's different to the 'Hello World' version, different Go code and synthetic events tailored for SQS. That repository is here: [https://github.com/davedotdev/aws-local-lambda-test.git](https://github.com/davedotdev/aws-local-go-lambda-example)

There is a companion video which goes into more depth and lasts for about 18 minutes: [https://youtu.be/1uVmHuMo4zU](https://youtu.be/1uVmHuMo4zU) 
{{<youtube 1uVmHuMo4zU>}}

My swear-0-meter hit 1 exploring this and I was more than surprised by what just works. Good job AWS.

## Reading Material

- Modern design patterns: [https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/enabling-patterns.html](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/enabling-patterns.html)
- Creating inline IAM policy: [https://aws.amazon.com/premiumsupport/knowledge-center/lambda-sam-template-permissions/](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-sam-template-permissions/)