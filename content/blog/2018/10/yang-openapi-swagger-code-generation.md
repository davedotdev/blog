---
title: "YANG, OpenAPI, Swagger and Code Generation"
date: 2018-10-23T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "YANG, OpenAPI, Swagger and Code Generation"
signoff: Dave
categories:
- Integration
tags:
- Integration
---

Sometimes during exploration or projects, I want to take a [YANG](https://en.wikipedia.org/wiki/YANG) model and convert it along with related dependencies to a [Swagger](https://swagger.io/) format (think [OpenAPI](https://www.openapis.org/) if you’re not familiar with this) so I can create a REST or RESTConf API interface. [OpenDayLight](https://www.opendaylight.org/) does something very similar for it’s Swagger based North Bound Interface (NBI), more information [here](https://github.com/bartoszm/yang2swagger) and just being able to look at the model this way is sometimes helpful. If you’re wondering how helpful this could be, think about developing a client. Using this approach, it’s possible to create stub client and server code for a software implementation, leaving just the logic of what to do when a POST is made or a GET is requested etc.

You may be familiar enough with YANG to know that YANG is a modeling language with its own extensible type system. These YANG models are mostly used for modeling how a programmatic interface to control a feature should be on routers and switches. More recently thanks to the wave of automation sweeping across the globe, YANG models are now used for modeling services, which in turn are rendered over one or more nodes by something else. We’re not going to cover the “else” here, but just the conversion of YANG to Swagger and Swagger to something useful like Go or Python stub bindings!

I’ve done this before but have never documented it, thinking it wasn’t of any value. That said, some tools do not support of the YANG built-in types like “bits” and other tools have issues with [XPATH](https://www.w3schools.com/xml/xpath_syntax.asp) expressions. Not being a Java programmer (most of the tools are written in Java), I decided not to create a PR and mend them, but to continue onwards and find a tool that just worked. Nothing (too) against Java, but I just don’t code with nor do I want to.

I’ve found that tools listed in this post have about an 80% success rate and are fine for generic models. When you get in to the more weird, or complex models, these tools are pushed beyond the 80% and present a pandemonium of errors.

#### The Tale of RFC8299

[RFC8299](https://tools.ietf.org/html/rfc8299) is the “YANG data Model for L3VPN Service Delivery” and is interesting for many reasons. If you’re not familiar with SP networks, that’s fine. This will not dive in to MPLS, BGP-MP, VRFs, RTs, RDs and the like. This particular RFC has several nested YANG dependencies and uses the “bits” YANG native type, which some of the tools do not support. Here is one that is [documented](https://github.com/robshakir/pyangbind/blob/master/docs/yang.md).

If you want to re-produce this for fun, follow along! You’ll require a Browser, a working installation of Docker and Python (2.7 is just fine). You’ll also need to follow the breadcrumbs in each of the YANG files. Whilst this post is to help you figure out how to convert YANG to an OpenAPI variant, I’ve left you the challenge of obtaining the YANG dependencies and placing them in to the correct directory for import by the tools. Directly below is an example import statement. In this case, put the `.yang` file extension on the name and that’s your YANG file name (the import below would be named ietf-netconf-acm.yang and contains a valid yang model).

```plaintext
import ietf-netconf-acm {
  prefix nacm;
 }
```

1. Create a directory that your YANG and RFC files will live.

```bash
$ mkdir yang_rfcs
$ cd yang_rfcs
$ export YANGDIR=`echo $PWD`
```

2. Download the text version using the button of RFC8299 from this link: [https://datatracker.ietf.org/doc/rfc8299/](https://datatracker.ietf.org/doc/rfc8299/)

3. Next, we’re going to use the ‘[xym](https://github.com/xym-tool/xym)’ tool to extract the YANG module from the RFC. Modules are published elsewhere on GitHub but I prefer the source, just in case!

Follow the instructions here: [https://github.com/xym-tool/xym](https://github.com/xym-tool/xym).

```bash
$ git clone https://github.com/xym-tool/xym.git
$ cd xym
$ virtualenv xym
$ source xym/bin/activate
$ pip install requests
$ python setup.py install
$ xym ../rfc8299.txt --dstdir $YANGDIR
$ cd ../
$ ls -la
-rw-r--r--   1 davidgee  staff   72828  ietf-l3vpn-svc@2018-01-19.yang
-rw-r--r--@  1 davidgee  staff  344738  rfc8299.txt
drwxr-xr-x  17 davidgee  staff     544  xym
$ deactivate
$ mv ietf-l3vpn-svc@2018-01-19.yang ietf-l3vpn-svc.yang
```

4. Now we have the YANG module extracted from RFC8299, it’s time to convert it from YANG to JSON. For this trick, we’ll use [EAGLE from the OpenNetworkingFoundation](https://github.com/OpenNetworkingFoundation/EAGLE-Open-Model-Profile-and-Tools.git). This project uses Pyang a Python YANG tool for YANG model validation, conversion, transformation and code generation.

```bash
$ git clone https://github.com/OpenNetworkingFoundation/EAGLE-Open-Model-Profile-and-Tools.git
$ cd EAGLE-Open-Model-Profile-and-Tools/YangJsonTools
$ virtualenv eagle
$ source eagle/bin/activate # At this point, the prompt will change to signify the venv activation
$ pip install pyang
$ export PYBINDPLUGIN=`echo $PWD`
```

Up until this point, we’ve activated a Python virtual environment, created an environment variable (PYBINDPLUGIN) and the most important line is next. This is the use of the pyang tool to achieve conversion using the plugins located in the current directory.

```bash
$ pyang --plugindir $PYBINDPLUGIN -f swagger -p $YANGDIR -o export/rfc8299.json $YANGDIR/ietf-l3vpn-svc.yang --generate-rpc=False
$ deactivate
$ ls -la export
-rw-r--r--  1 davidgee  staff       42  README.md
-rw-r--r--  1 davidgee  staff  1298758  rfc8299.json
```

With regards to the last line, the -p switch allows you to tell pyang where the YANG module directory is for dependencies.

5. Now we have our OpenAPI JSON file, we can use the Swagger-UI to visualize it.

```bash
$ cd export
$ export EXPORTS=`echo $PWD`
$ docker run --name swagger -d -p 80:8080 -e BASE_URL=/swagger -e SWAGGER_JSON=/swaggerfiles/rfc8299.json -v $EXPORTS:/swaggerfiles swaggerapi/swagger-ui
```

6. Sit back, relax and enjoy your hand work by taking a browse of the Swagger browser displaying the API generated from the YANG model and associated Swagger conversion!

Open your browser to: http://localhost/swagger/.

![swagger_1](/images/blog/swagger_1.png#center)

7. We’re not done yet. Maybe not with this model (because it’s just ruddy huge), but with a simpler one, you might fancy generating some code bindings. Code bindings are automatically generated blobs of code that allows us to create a full implementation of an API. This might be pulling information out of a database, or doing some writes in the background to a device, orchestrator or graph.

You have two main choices with Swagger Codegen:

1. Download and use
2. Do it online with SwaggerHub

Let’s download Swagger-Codgen and create some Golang client bindings! Such fun!

```bash
$ cd $YANGDIR
$ cp $PYBINDPLUGIN/export/rfc8299.json ./
# Instructions located here https://github.com/swagger-api/swagger-codegen.git
$ wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar -O swagger-codegen-cli.jar
$ mkdir go_output
$ java -jar swagger-codegen-cli.jar help
$ java -jar swagger-codegen-cli.jar generate -i rfc8299.json -l go -o ./go_output
$ ls -la go_output
```

f you want to create the server bindings, replace ‘go’ with ‘go-server’.

I’ll leave you to see the surprising amount of Go files, but try it with python instead of go if it isn’t your bag.

Here is some more helpful reading with regards to generating code.
[https://github.com/swagger-api/swagger-codegen/wiki/Server-stub-generator-HOWTO](https://github.com/swagger-api/swagger-codegen/wiki/Server-stub-generator-HOWTO)

```bash
$ mkdir python_output
$ java -jar swagger-codegen-cli.jar generate -i rfc8299.json -l python -o ./python_output
```

When it comes to Python servers, replace ‘python’ with ‘python-flask’ for a popular variant of server.

#### What Failed

For converting the YANG model to Swagger, [yang-swagger](https://github.com/corenova/yang-swagger) spat it’s dummy out over lack of support for the native “bits” type. This is not uncommon and will probably change in the future.

```bash
yang-swagger -f yaml -o swagger.yaml ietf-l3vpn-svc.yang
# Output
WARNING: No configurations found in configuration directory:/Users/davidgee/Documents/yang_rfc/config
WARNING: To disable this warning set SUPPRESS_NO_CONFIG_WARNING in the environment.
unable to parse &apos;./ietf-netconf-acm.yang&apos; YANG module from &apos;/Users/davidgee/Documents/yang_rfc/ietf-netconf-acm.yang&apos;
{ ExpressionError: [module(ietf-netconf-acm)/typedef(access-operations-type)/type(bits)] unable to resolve typedef for bits
# Output truncated to save eyeball space
```

For the same conversion step, [swagger-generator-cli](https://bitbucket.org/cmurch/yang2swagger-generator.git) Failed mainly due to XPATH issues. I don’t understand Java enough here really to comment, other than as a tool it didn’t work for this particular model and dependencies.

```bash
java -jar ~/.m2/repository/com/mrv/yangtools/swagger-generator-cli/1.1-SNAPSHOT/swagger-generator-cli-1.1-SNAPSHOT-executable.jar -yang-dir $YANGDIR/yang -output swagger.yaml ietf-l3vpn-svc.yang
# Output
2018-10-22 16:44:39,782 [main] WARN  o.o.y.yang.parser.stmt.rfc6020.Utils - Argument "derived-from-or-self(../rp-discovery-type, &apos;l3vpn-svc:bsr-rp&apos;)" is not valid XPath string at "null:800:7"
javax.xml.xpath.XPathExpressionException: javax.xml.transform.TransformerException: Could not find function: derived-from-or-self
	at com.sun.org.apache.xpath.internal.jaxp.XPathImpl.compile(XPathImpl.java:400)
# Output truncated to save eyeball space. Lots and lots of error output because Java is noisy!
```

#### Close

Thanks for reading and taking part by following along if you did. Hopefully this was useful!

I’ve tried out the steps involved in this post and at the time of writing, they were correct and functional.