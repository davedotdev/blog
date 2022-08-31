---
title: "DDBTools: DynamoDB UpdateItem with Go the easy way"
date: 2022-07-08T10:00:00+00:00
image: images/blog/serverless_header.png
author: David Gee
description: "Updating a DynamoDB record with Golang and the AWS SDK V2 - the easy way!"
signoff: Dave
mermaid: false
categories: 
- go
- dynamodb
tags:
- go
- dynamodb
---

There doesn’t seem to be a nice clean way of handling DynamoDB (DDB) record updates in Go without writing a DDB query and book-ending it with some boilerplate. The current method that’s documented for developers to adopt in my opinion makes for some less than attractive and readable code. In fact, one could argue the effort to write the update code when moving quickly is enough to make you want to hack it together,.

There are three methods available to you, including one which uses my simple helper library.

The aspiration to write this simple Go library came from frustration of the trial and error of writing large DynamoDB methods. Some of my records are hybrid from the perspective of the UI. What I mean by this is for example, is a user settings form will contain a partial set of properties that the record holds. Merely overwriting the record will destroy the rest of the record, which might have held critical information prior to the overwrite like paymentIDs and other such stuff.

This is an example of a record this short blog post will pivot around.

| PK | SK | paymentID | firstName | lastName |
| :--- | :--- | :--- | :--- | :--- |
| “user” | $GUID | $payment_guid | Dave | Gee |

<br/>

**Method 1: Overwrite the entire record with a DynamoDB PutItem query**

Even with this there are approaches that *could* work quite well. As your code receives the payload with the updates, your back-end code can read the current record and then overwrite the properties you wish to retain prior to executing the query. That will cost you a read and a write. In this specific example, that would mean retaining the `paymentID` field. Only the `firstName` and `lastName` should be exposed to the UI as the `paymentID` property is generated and managed by the back-end.

If you don’t have this problem of records requiring partial updates, you could just live the YOLO life and overwrite the entire record. That might actually be fine for your use case but at the cost of relying on the data integrity for the record properties you do not wish to change. The surface area for error spans the HTTP calls to and from the API and the UI not messing it up. As a security note, fully formed primary key material (PK and SK) should never be trusted from the UI, but re-formed by the back-end on CRUD operations. 

**Method2: Update specific properties on the record with a DynamoDB UpdateItem query**

This is tedious code in my opinion. The list of values and update string can get quite large and it makes for one ugly read.

```go
package update

import (
    "context"
    "fmt"
    "os"

    "github.com/aws/aws-sdk-go-v2/aws"
    "github.com/aws/aws-sdk-go-v2/config"
    "github.com/aws/aws-sdk-go-v2/service/dynamodb"
    "github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

// These tags are useless for our example
// but for Creating records from struct instances, they are super useful!
type Settings struct {
    PK          string `dynamodbav:"PK"`
    SK          string `dynamodbav:"SK"`
    PaymentID   string `dynamodbav:"paymentID"`
    FirstName   string `dynamodbav:"firstName"`
    LastName    string `dynamodbav:"lastName"`
}

func updateItem(input Settings) error {

    cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(os.Getenv("AWS_REGION")))
    if err != nil {
      return fmt.Errorf("LoadDefaultConfig: %v\n", err)
    }

    client := dynamodb.NewFromConfig(cfg)

    _, err = client.UpdateItem(context.TODO(), &dynamodb.UpdateItemInput{
      TableName: aws.String(os.Getenv("DYNAMODB_TABLE")),
      Key: map[string]types.AttributeValue{
        "PK": &types.AttributeValueMemberS{Value: item.PK},
        "SK": &types.AttributeValueMemberS{Value: item.SK},
      },

      // This block can get really out of hand on big updates
      UpdateExpression: aws.String("set firstName = :firstName, lastName = :lastName"),
      ExpressionAttributeValues: map[string]types.AttributeValue{
        ":firstName": &types.AttributeValueMemberS{Value: item.FirstName},
        ":lastName": &types.AttributeValueMemberS{Value: item.LastName},
      },
  })

  if err != nil {
      return fmt.Errorf("UpdateItem: %v\n", err)
  }

  return nil
}
```

Also, if you do things like increment numbers with conditions, you’ll find the query is better being handles as a transaction, with multiple parts. That means building for failure conditions because a transaction will either succeed or fail as one. 

**Method 3: Use a helper function to do updates**

The more I understand how DynamoDB works, the more I like it, but the abstraction between the Go v2 SDK is quite thin and it means writing queries almost natively. It does mean however you can debug queries rapidly as the layers are indeed thin. I’ve created a middle ground option for my projects that use DynamoDB. I’ve created a factory function which returns both the `ExpressionAttributeValues` map and `UpdateExpression` string. I think it’s more readable and means writing update code is faster. 

Here's an example of that factory function in play.

```bash
go get github.com/davedotdev/ddbtools@latest
```

```go
import (
  "github.com/davedotdev/ddbtools"

  "github.com/aws/aws-sdk-go-v2/aws"
  "github.com/aws/aws-sdk-go-v2/config"
  "github.com/aws/aws-sdk-go-v2/service/dynamodb"
  "github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

func (da *Data) UpdateSetting(firstName, lastName, userGUID string) error {

    client := dynamodb.NewFromConfig(da.DDBConfig, func(o *dynamodb.Options) {})

    // The entry needs to exist first and foremost!
    CondExpr := "attribute_exists(#SK)"

    // Boilerplate
    PKKey := "setting"
    SKKey := userGUID
    upd := dynamodb.UpdateItemInput{}
    upd.ConditionExpression = &CondExpr
    upd.TableName = &da.TableName
    upd.Key = map[string]types.AttributeValue{}
    upd.ExpressionAttributeNames = make(map[string]string)
    upd.ExpressionAttributeValues = make(map[string]types.AttributeValue)	
    upd.Key["PK"] = &types.AttributeValueMemberS{Value: PKKey}
    upd.Key["SK"] = &types.AttributeValueMemberS{Value: SKKey}
    upd.ExpressionAttributeNames["#SK"] = "SK"

    // The magic is here: handling each property
    // pass in the UpdateItemInput instance (upd) and the string value of exprStr
    // If the fourth input is true, then it creates a new string for exprStr
    exprStr := ddbtools.SetEquals(firstName, "firstName", "", true, &upd)
    exprStr = ddbtools.SetEquals(lastName, "lastName", exprStr, false, &upd)
    // This SetEquals func isn't too disruptive to normal patterns
    // and doesn't do any real 'magic', so it's easy to debug

    upd.UpdateExpression = &exprStr

    // Do the transaction
    _, err := client.UpdateItem(context.TODO(), &upd)

    if err != nil {
      return err
    }

    return nil
}
```

## Wrap-Up

Hope this short post on a DynamoDB is helpful for Go SDK v2 consumers. I found writing updates to be the most tedious and took some of this pain away by writing a small helper lib.