---
title: "Using Go with AWS Lambda + DynamoDB"
date: "2020-01-05"
---

![1](/images/go-lambda-ddb/1.png)

Disclaimer: Views are my own.

## Introduction

We have to admit that Serverless is a thing now. This is a straight forward approach for software architecture. In this concept, there are now servers that are maintained by developers. Serverless goes hand-by-hand with so-called FaaS (Function-as-a-Service). The idea of FaaS is pretty simple — code is structured in the way that you have one main function that concentrates on a single purpose. A good example is retrieving a list of items from the database. You have the main function that validates an input, retrieves data from the database and returns it to the caller.

This approach makes the life of developers easier because it makes the wrong thing hard to do. Developers are “forced” to write short functions with a single responsibility region that way easier to test and maintain. Code structure becomes beginner-friendly due to clear and strict workflow.

Do not forget about costs — function is only executed when there is a request so there is no idling server when the load is low or absent at all. Your business pays only for the resources it uses.

There is always a “but” … Serverless + FaaS is not a “silver bullet”. There is more architectural work required to make a proper software design. It is relatively easy to start with a brand-new project but it takes time to come up with a correct plan for migration of existing monolithic/microservice architecture. There is no more way to dump everything in one place. It is a tough challenge to build a whole infrastructure from scratch but likely, there are some vendors on the marker the best-known of which is AWS Lambda.

## Example

This article will guide you through an example that involves writing a lambda in Go, integrating it with DynamoDB and deploying.

Prerequisites:
 - AWS Account;
 - DynamoDB instance with an empty table;

Let’s start with a simple code that receives a request, puts this request to DynamoDB and returns a result.
First of all, we define our request and response types.

```
type Request struct {
	Id int `json:"Id"`
}

type Response struct {
	Message string `json:"message"`
}
```

Next step is to define a handler function that will put our request to DynamoDB.

```
func requestHandler(req Request) (Response, error) {
	session := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	svc := dynamodb.New(session)

	result, err := dynamodbattribute.MarshalMap(req)
	if err != nil {
		fmt.Println("Failed to marshall request")
		return Response{}, err
	}

	input := &dynamodb.PutItemInput{
		Item:      result,
		TableName: aws.String("TestTable"),
	}

	_, err = svc.PutItem(input)
	if err != nil {
		fmt.Println("Failed to write to db")
		return Response{}, err
	}

	return Response{fmt.Sprintf("Request processed %d", req.Id)}, nil
}
```

The final step is to start an AWS Lambda routine and pass our handler function to it.

```
func main() {
	lambda.Start(requestHandler)
}
```

Now we can compile our code. In case of Go, we have to compile it with:

`GOOS=linux go build -o main`

We have to define a name of the executable because later we would need to specify while creation of lambda in AWS Console.

So now we are ready to deploy our lambda. Let’s navigate to AWS Console and search for AWS Lambda there.

![2](/images/go-lambda-ddb/2.png)

It’s enough to define a name and runtime in our simple example. AWS Lambda supports all modern programming languages so it’s pretty flexible as a tool.

AWS Lambda supports two ways how to retrieve a code for execution:
- Upload a .zip from Console
- Get .zip from the S3 bucket

In this example, we will upload our zipped binary from Console.

![3](/images/go-lambda-ddb/3.png)

AWS Console gives you a possibility to execute tests from a console that you can verify the behaviour of your code. You can define input parameters for the request.

![4](/images/go-lambda-ddb/4.png)

We are almost set to go. As we mentioned before we are going to use DynamoDB as storage for this example. DynamoDB is a highly scalable key-value and document database. It’s a part of the AWS service list and the perfect choice if you need a reliable and high performance storage. AWS Lambda does not have access to your database by default. It requires additional policy attached to the lambda’s IAM role. This restriction is an additional advantage of lambda that you can define what access exactly this function needs and forbid a misuse. You just need to go in your console to `IAM -> Roles -> GoLambdaRole -> Attach policies -> Look for AmazonDynamoDBFullAccess`. We will use this role in our example just to keep it in the scope. In production code, you can create a specific role with access rights to the necessary table.

At this point, we are ready to execute our test and verify that new entry is created in our test table. I encourage you to play a little bit more and create a function to retrieve/modify existing data in the table.

## Conclusion

Serverless is a modern software architecture that allows you to design your system in a flexible and highly scalable way. It does not solve all the problems and you have to consider all trade-offs before implementing it. I hope this article gives you a short introduction into AWS Lambda and is a good starting point.