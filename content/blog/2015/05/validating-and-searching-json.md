---
title: "Validating and Searching JSON"
date: 2015-05-14T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Validating and Searching JSON"
signoff: Dave
categories:
- JSON
tags:
- JSON
---

When it comes to dealing with network automation, you can find yourself battling with many things, including dealing with XML and JSON data structures as you build apps that consume or spit out data.

Recently I’ve been using ‘jq’ to provide my JSON validation (i.e. I’ve not missed a quotation, colon, comma, curly or square bracket) when building data in JSON. Its primary function and purpose is to search through JSON data to find something in the data set, or reduce the data set to an area of focus, thus also validating your application is generating what it should be generating! A ‘lightweight and flexible command line JSON processor’ if you take the website description which is here: [http://stedolan.githib.io/jq/](http://stedolan.githib.io/jq/).

#### How do you use this jq?

Here’s a simple JSON example with an ‘error’.

```json
{
	"name":"App1",
	"OS":["Linux", "Windows", "Solaris", "OSX"],
	"Author":"David Gee",
	"Email":"david.gee@ipengineer.net",
	"Twitter":"@davidjohngee"
	"Version":"alpha-v0.1",
	"IP_Address":"192.0.2.1:5000"
}
```

Using `jq` I can not only validate the structure, but in the case of a script, I can also parse out the key/value I need. But first, let’s see where our error is.

```bash
$ jq '.' tst.json 
parse error: Expected separator between values at line 7, column 10
```

The ‘.’ tells jq to output the json without any filtering.

Let’s mend the JSON and do it again:

```bash
$ jq '.' tst.json 
{
  "name": "App1",
  "OS": [
    "Linux",
    "Windows",
    "Solaris",
    "OSX"
  ],
  "Author": "David Gee",
  "Email": "david.gee@ipengineer.net",
  "Twitter": "@davidjohngee",
  "Version": "alpha-v0.1",
  "IP_Address": "192.0.2.1:5000"
}
```

So how about filtering for just say the OS types this is for?

There are multiple approaches to this. Do you want the key included?

```bash
$ jq '.["OS"] '  tst.json 
[
  "Linux",
  "Windows",
  "Solaris",
  "OSX"
]

$ jq '.|{OS}'  tst.json 
{
  "OS": [
    "Linux",
    "Windows",
    "Solaris",
    "OSX"
  ]
}
```

### How do I install this Wunder?

Check out the install page. I installed it on OSX via brew and on Debian using the binaries. It worked without an issue. Why would it not? It’s been built as a portable C application and has no runtime dependencies!

Check out the download page which can be found here: [http://stedolan.github.io/jq/download/](http://stedolan.github.io/jq/download/)

#### Summary?

When a tool comes along such as this, it’s worth spending a little time to get familiar and make it part of your day to day tool set.

Check out the jq tutorial site [here](http://stedolan.github.io/jq/tutorial/) for more jq fun!

