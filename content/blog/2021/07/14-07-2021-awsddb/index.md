---
title: "AWS DynamoDB Local with AWS Go v2 SDK"
date: 2021-07-14T10:00:00+00:00
image: images/blog/cloud_header.png
author: David Gee
description: "AWS DynamoDB local, AWS Go v2 SDK, NoSQL Workbench and getting it working!"
signoff: Dave
mermaid: true
categories: 
- cloud
- dynamodb
tags:
- software development
- cloud
- headache
- dynamodb
---

# A Penny Drops 

Other than virtual machines serving functions I can't live without (Docker, CCTV, file storage etc), I begrudge turning more servers on because the hassle outweighs the gain. Just recently an Ethernet switch died from a power outage and I felt like throwing the damn thing out of the window. Recently I've been upskilling in front-end, which basically translates to embracing React. That in turn drove me to understanding more than I ever initially set out to on JWTs, modern authentication and lots more. One of my pet projects to ~~abuse~~ focus these new powers, is to provide an application for my wife's business, which is reliant on object storage and relational data. The application is relatively simple and our objective is to do it on the cheap.

*Yes, everyone's objective is to have applications on the cheap. We mean really cheap cheap.*

I spent some time looking at alternatives including dropping servers in a friends colo facility, moving it around on free tiers and doing away with the database entirely. None of it felt right and using RDS or reserved instances of EC2 is more than I want to pay per month. After a chat with [Dmitri Kalintsev](https://twitter.com/dkalintsev?lang=en), I looked at DynamoDB. It seemed to do what I need and it's cheap. Win! I had one reserve, which was the NoSQL aspect. 

### No SQL and NoSQL

I did say I needed relational data and I'm also happy that DynamoDB can do what I need in a single table no less. Saying No to a SQL style relational DB is a cost shackle removed and I'm more than prepared to be free, despite feeling like I'm letting go of an old friend. But, I've seen enough to be convinced. I now view NoSQL as conditional relativitiy. 

{{<youtube KYy8X8t4MB8>}}
<br/>
After watching this video: by [Rick Houlian](https://twitter.com/houlihan_rick?lang=en), DynamoDB seemed like the appropriate way to go and Rick left me utterly convinced, especially after watching him with the [NoSQL Workbench tool](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html) and trying to follow his thought process. I admit to watching the video about three times. In addition to fiddling around a bit, I've also started the AWS DynamoDB Developer training, which is a little cringeworthy at times (I'm British and find the overt politeness a little overbearing) but otherwise excellent. I found the code examples to be more than enough to get the basic concepts but be warned, the v2 of the Go SDK doesn't have much blog coverage yet.

Back to my wife's in development app, the dev code so far is based on Postgres and [`jinzhu\gorm`](https://github.com/go-gorm/gorm) (the back-end is in Go) and so my plan is to flatten the data structures to a large Go struct so I can use a single table and keep the number of types to a minimum. I plan to tag the struct fields to match the secondary indexes if I go down that route (I'll come back to that in another post). There is a local version of DynamoDB you can use prior to switching to AWS proper and it makes perfect sense given the churn I'm no doubt going to create whilst I ~~fuck around~~ scientifically go about making a single table NoSQL database fit.

Prior to writing production code, I write throw away samples and always have done, preferring to 'build out' software, instead of refactoring constantly. For the object storage aspects on S3, I wrote three helpers, one for Put, one for Get and one for Delete. For DynamoDB I wanted to do the same and started to poke around with the [Go v2 SDK](https://github.com/aws/aws-sdk-go-v2). I found some of the [examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/gov2) to be useful but found gaps. Luckily the SDK source is well-documented and I didn't run into many issues, other than the one which is the trigger for this entire post.

### The Magic Trio

For my dev process, I'll be using the AWS NoSQL Workbench tool to build out the model and access patterns, I'll be using a local DynamoDB running on Docker and want to use the Go v2 SDK to target local as well as AWS DynamoDB. Simple right? Turns out I hit a laughable brick wall (looking back).

You can find the AWS page on running DynamoDB here: [https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

```bash
docker run -d -p 8000:8000 amazon/dynamodb-local
```

We all know what it's like when writing code. We get in a state of being laser focussed and miss the obvious sometimes. Already twice this week, I've helped people by asking the simplest of questions and when you're locked onto a goal, it's all too easy to mess-up, which is exactly what happened.

I posted this [GitHub Gist](https://gist.github.com/davedotdev/0a4a2361b0e04f63dcda91645db1de83) and shouted for help on Twitter. Two heroes came to my aid; [Kirk Kirkconnell](https://twitter.com/nosqlknowhow?lang=en) and [Tom Bailey](https://twitter.com/tombailey?lang=en). Both work at AWS and I've had the privilege of working with Tom in the past. I remain so very grateful for their help. After seeing a code example posted as a response on the Gist, my head met my hand and immediately realised that I'd not completed the SigningRegion field in the EndPoint struct. In the original Gist I had a line under the client config below, which didn't seem to make a difference, so I commented it out.

```go
o.Region = "localhost"
```

To make the annoyance worse, under the config code, I also had this line which also never made a damn bit of difference. Having tried every permutation I could think of, I just gave up and asked for help.

```go
config.WithRegion("localhost"),
```

__What were you doing Dave?__

In order to use the local version of DynamoDB, you need to create a custom endpoint resolver, which returns a URL of `http://localhost:8000` (assuming it's actually on your localhost) and that much I'd taken care of. My example code is a little more...compressed (lookup: not easily readable). In short I set the region in both the client struct and config struct, set the URL in the config struct and compiled the code. Upon execution, I get with a 400 error, yet if I use the AWS public service with a region say of `eu-west-2` and changed the struct fields appropriately (as well as credentials) then it worked fine. I used Workbench to push the table data to both AWS proper and the local DynamoDB and even more annoyingly, the AWS CLI worked perfectly fine for both too. What had I done wrong you ask? I forgot to include the `SigningRegion` field in the config struct. My original hacked together code works fine pending the inclusion of the missing field. Below is some working code that isn't the prettiest, but work it does just fine. Note, I don't crash out upon errors (remember this is exploratory code), so if you run into difficulty, you might see lots of easily avoidable errors.

```go
package main

import (
	"context"
	"fmt"
	"log"
	"strconv"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

// DynamoDBDescribeTableAPI defines the interface for the DescribeTable function.
// We use this interface to enable unit testing.
type DynamoDBDescribeTableAPI interface {
	DescribeTable(ctx context.Context,
		params *dynamodb.DescribeTableInput,
		optFns ...func(*dynamodb.Options)) (*dynamodb.DescribeTableOutput, error)
}

type DynamoDBScanAPI interface {
	Scan(ctx context.Context,
		params *dynamodb.ScanInput,
		optFns ...func(*dynamodb.Options)) (*dynamodb.ScanOutput, error)
}

// GetTableInfo retrieves information about the table.
func GetTableInfo(c context.Context, api DynamoDBDescribeTableAPI, input *dynamodb.DescribeTableInput) (*dynamodb.DescribeTableOutput, error) {
	return api.DescribeTable(c, input)
}

func GetItems(c context.Context, api DynamoDBScanAPI, input *dynamodb.ScanInput) (*dynamodb.ScanOutput, error) {
	return api.Scan(c, input)
}

// Item holds info about the items returned by Scan
type Item struct {
	PK   string `json:"PK"`
	Att1 string `json:"att1"`
}

func main() {

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		// CHANGE THIS TO us-east-1 TO USE AWS proper
		config.WithRegion("localhost"),
		// Comment the below out if not using localhost
		config.WithEndpointResolver(aws.EndpointResolverFunc(
			func(service, region string) (aws.Endpoint, error) {
				return aws.Endpoint{URL: "http://localhost:8000", SigningRegion: "localhost"}, nil // The SigningRegion key was what's was missing! D'oh.
			})),
	)

	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	tableName := "test"

	client := dynamodb.NewFromConfig(cfg, func(o *dynamodb.Options) {
		o.Credentials = credentials.NewStaticCredentialsProvider("b59xng", "b2sc6o", "")
	})

	input := &dynamodb.DescribeTableInput{
		TableName: &tableName,
	}

	fmt.Printf("Client data: %+v\n\n", client)

	resp, err := GetTableInfo(context.TODO(), client, input)
	if err != nil {
		fmt.Println("failed to describe table, " + err.Error())
	}

	fmt.Println("Info about " + tableName + ":")
	fmt.Println("  #items:     ", resp.Table.ItemCount)
	fmt.Println("  Size (bytes)", resp.Table.TableSizeBytes)
	fmt.Println("  Status:     ", string(resp.Table.TableStatus))
	fmt.Println()

	tables, err := client.ListTables(context.Background(), &dynamodb.ListTablesInput{})

	if err != nil {
		fmt.Println("failed to get tables, " + err.Error())
	}

	fmt.Println("Tables")
	fmt.Printf("%+v\n\n", tables)

	for _, n := range tables.TableNames {
		fmt.Println("TABLE", n)
	}

	// Let's get the stuff
	filt1 := expression.Name("PK").Equal(expression.Value("sale"))

	// Get back the title and rating (we know the year).
	proj := expression.NamesList(expression.Name("PK"), expression.Name("att1"))

	expr, err := expression.NewBuilder().WithFilter(filt1).WithProjection(proj).Build()
	if err != nil {
		fmt.Println("Got error building expression:")
		fmt.Println(err.Error())
		return
	}

	inputQ := &dynamodb.ScanInput{
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		FilterExpression:          expr.Filter(),
		ProjectionExpression:      expr.Projection(),
		TableName:                 &tableName,
	}

	resp2, err := GetItems(context.TODO(), client, inputQ)
	if err != nil {
		fmt.Println("Got an error scanning the table:")
		fmt.Println(err.Error())
		return
	}

	items := []Item{}

	err = attributevalue.UnmarshalListOfMaps(resp2.Items, &items)
	if err != nil {
		fmt.Printf("failed to unmarshal Dynamodb Scan Items, %v\n", err)
	}

	for _, item := range items {
		fmt.Println("PK: ", item.PK)
		fmt.Println("att1:", item.Att1)
		fmt.Println()
	}

	numItems := strconv.Itoa(len(items))

	fmt.Println("Found", numItems)
}
```

#### Wrap Up

From here I will tidy this code up and make it config driven so the same code can be used for dev and prod. I'll also expand the functional style code so it's more easily readable (see the Gist if you want an example that Tom posted back from a colleague).

Thank you to my two heroes. Sirs - I owe you a great debt.


