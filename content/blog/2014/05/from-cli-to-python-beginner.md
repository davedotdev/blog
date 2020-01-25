---
title: "From CLI to Py(thon) [Beginner]"
date: 2014-05-24T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "CLI To Python"
signoff: Dave
---

> Like StarWars has the prequels, the sequels and questionable Disney future releases, some blog posts need writing in the correct order. After an intense week of deep thoughts, reading and coding, [Objectifying the Network with Python [Part 1]](/blog/2014/04/objectifying-network-using-python/) was written as an intro post. With the barrier being so high to industry change and making the mistake of assumed knowledge, it became apparent a much more gentle approach to programmability with a strong reference to networking as we know it today was required. Thank you to all of you that have given this feedback. Much appreciated as always.

#### CLI to Py(thon) – The Monty Variant

A bit of geek knowledge before we dive in to this post. The name Python actually comes from Monty Python. A great British institute and not from the kingdom of serpents. Why Python? It’s rapidly becoming the adopted language of networking. To say ‘every man and his dog’ are adopting it would be an understatement. Think, Grandpa, Grandma, cousins, nieces, nephews…second cousins once removed…

With respect to Python, it’s easy to learn, immensely powerful, even when not entirely mastered and it’s free!

### Overview

This post is actually four articles in one. The objective is to explore how we as engineers, consultants, architects and operators can harness Python as a way of interacting with a single or multiple network elements, whether in a ‘Power CLI’ guise or as an automation method. As an important step, this post will also explain how network operating systems contain structured data pertaining to functionality we’ve come to expect from switches, routers, firewalls and other network elements, how to manipulate said data and generally how to interact with APIs (Application Programmable Interfaces) like NETCONF and onePK. Do not let the term API intimidate you. The CLI could be considered a very simple API. The move from the traditional CLI toward this industry shift can be daunting for the uninitiated, but with little effort, familiarity can be gained in little time. The industry is rapidly moving in to an era of programmability and has demanded the vendors provide ubiquitous access to the underlying data structure. OpenDayLight I personally think can be attributed to the acceleration of this witnessed industry behaviour, but OpenFlow was one of the ignition points for this chain reaction. This post serves as the index or entry point to three how-to guides:

- CLI scraping and client side objects (Just avoid doing this at all cost, beat the vendor with a stick from another vendor if you have to).

- Junos with NETCONF.

- Cisco’s onePK.

The image below illustrates how we connect to a network element via CLI, NETCONF or onePK from a client (laptop, server, Linux image etc) running Python. It also shows that each method of accessing the network element (now dubbed southbound APIs) actually interacts with the data set of the network operating system that runs on the network element.

![NetOS_DataConnectivity](/images/blog/NetOS_DataConnectivity.png#center)

This guide isn’t an introduction to these technologies. The CLI (Command Line Interface) should be self explanatory. NETCONF is effectively an XML RPC (Remote Procedure) call which Junos happens to have an excellent implementation of and Cisco’s onePK is two things: a network element API service and a set of client side libraries, which are currently written in: C, Python and Java. Just to add, the Junos how to guide is focussed on the [superb PyEZ library](/blog/2014/05/from-cli-to-python-beginner/). CLI scraping as much as it pains us all to cover off, is necessary for legacy networks that have no other means of extracting or setting data via an API. Once data has been extracted via driving the CLI (i.e. CLI scraping), or via NETCONF and Cisco’s onePK, this data must be stored somewhere. Client side objects allow us to do that. Client side objects should mirror the structure of the data as we’re familiar with it. Therefore information such as interface speed, MTU, errors, MAC addresses etc, should be in an interface object. An interface object could be under a forwarding set of objects, so on and so forth. Structure your data wisely young padawan. A wise man once said (not me I’m hasten to add):

Success comes from wisdom

Wisdom comes from experience

Experience comes from making mistakes

  
Unlike the CLI, we don’t have a question mark (?) at our disposal, but you do have a neat little feature (which I almost forgot to write about), which is the `help(x)` function. This relies on docstrings being implemented within classes and modules. The `help(x)` function allows you to get information on an object. It will be demonstrated later on in this post. When learning anything new like this, you will make mistakes, but instead of letting them hinder and frustrate your progress, create ‘scratch pads’ to exercise and exploit the mistakes. Practice makes perfect (ultimately). If you’re unsure of how something works, create a separate file and experiment a bit. It’s not like configuring a null route and killing your network! Have fun and play. After all, this is a new set of skills. Wake up the labbing nerd in you and go for it. Why not run up some VMs? Juniper has the vSRX or Firefly Edge as it’s now known, Cisco has vIOS and the CSR which support onePK and you can also run up nodes like Vyatta to play with CLI scraping as well as older Cisco images via the likes of GNS3. It is possible to do all of this on a laptop or Mac with 8–16GB of RAM.

Some extra useful pieces of knowledge before we go further:

1. Coders are mutant nocturnal creatures that consume more coffee than networking people. Do not risk getting in to a coffee drinking fight. You will come out of it decaffeinated.

2. Based on the point above, if you get stuck offer a triple espresso to a coder.

3. Coders will ‘try’ and handle errors and exceptions. Test driven development is one method that enforces this behaviour. Otherwise it’s experience and good luck.

4. Try not to replicate what someone else has already done. Adopt the 80/20 rule:
   
    Utilise frameworks that are built already such as Juniper’s PyEZ and Cisco’s onePK.
    
5.  Write code that is easy to read and ridden with comments.

    Why? What if someone else has to pick your mess up and modify or mend it?

    Adopt a ‘buyer and seller’ attitude to writing code. Only hand down what you would like to buy.

6.  Python has a very large user and enthusiast base. If you really get stuck, harassing a coder will only get you shouted at. Ignore the second point in this list. Google is your friend and if that fails, use a forum. Do not be embarrassed. Any experienced ‘Pythonista’ probably got stuck just the same when they were learning.

The diagram below presents a simple overview of a network element and where all of the pieces fit:

![Element-Object-Model1](/images/blog/Element-Object-Model1.png#center)

And now…something entirely different.

#### Python Basics

To start exploring, you will need an install of Python. On Windows look at ActiveState for their implementation. On Mac OSX, it comes installed (a typically older version). Finally, for Linux, just use your favourite package manager and install it! On Debian (a personal favourite this would be `apt-get install python`)

Let’s start by doing something that network operating systems do not traditionally provide functionality to do. Add some numbers! Start Python by typing ‘Python’ in to your bash or command prompt. Once Python has started you will notice `>>>` which is a prompt for the Python interpreter. Once this is displayed, enter `1+1` and hit return.

```bash
Python 2.7.5 (default, Sep 12 2013, 21:33:34)
[GCC 4.2.1 Compatible Apple LLVM 5.0 (clang-500.0.68)] on darwin  
Type "help", "copyright", "credits" or "license" for more information.  
>>> 1+1
2  
>>>
```

**jazz hands** Awesome! You have just used Python via the interpreter. It even displays the expected output! Awesome +1.

What else would deliver some immediate results? How about some basic text manipulation?

```bash
>>> print "This is awesome stuff. LS42, you're cool"
This is awesome stuff. LS42, you're cool  
>>>
```

Pretty lame, but the print method is probably one you’ll use a lot to begin with and a lot for debugging purposes. It literally prints output to the ‘stdout’, in this case, the Python interpreter or the command prompt/shell if you’re executing this code in a file. Let’s add a minor step to our ‘complex’ math problem by using print.

```python
>>> result = 1+1
>>> print result
2
```

What we just did was just a variable to hold the result and then printed it. Variables hold information. Whether that be a number, text (called a string) or another type. Other types include ‘classes’ which are objects. Python works on the principal of objects. A string or number is an object in addition to a class, which is an object that can hold variables, which when in a class are called fields, or functions (which do stuff) which when in a class are called methods. With me so far? Remember reading about the `help(x)` function earlier? Let’s give this a whirl right now on our simple example above and see what we get. Enter the below and see all of the output that is related to our object. Try it from time to time on imported modules and associated classes. The functions `help()` and `dir()` are powerful utilities.

```bash
>>> help(result)
1
```

Referring back up the page a little, we can also use print to enhance our self complimenting example. Let’s split our output in two sections and assign a variable to each.

```python
>>> awesome = "This is awesome stuff."
>>> compliment = "LSP42, you're cool!"
>>> print awesome + compliment  
This is awesome stuff. LSP42, you're cool!
If we split out our ‘awesome’ and ‘compliment’ into the variables as above, then we can also reverse the order of what we want to say.
>>> print compliment + awesome  
LSP42, you're cool! This is awesome stuff.
```

Not bad. Pretty quickly we’ve covered off basic printing and variables. What if you want to dynamically `print` text based on user or data input?

```python
>>> name = raw_input("What's your name? ")
What's your name? LSP42  
>>> print "Hello {0}".format(name)  
Hello LSP42  
>>> print "Hello %s" % name  
Hello LSP42
```

Notice that we can print this data in two ways, using either the {} method or % method. Is one better than the other? The latter can make differentiating between types (integer number and text string for example) easier, but the former is much more readable.

At this point have a play around and remember that Google is your friend along with the Python documentation library which can be found [here](https://www.python.org/doc/).

The example covered off here is pretty simple and in the real world this might be data returned and parsed from an API call.

This post is of course a speedy one minute guide to Python and it does not cover coding etiquette, tests, classes, loops, conditions…pretty much anything else that would be of use. If you’re completely fresh to this, then try the links below for some proper exposure to the feature rich language:

1.  learnpython.org is a great way to get started with Python.

2. Kirk Byer’s Python for network engineers is a great way to learn Python and focus on networking at the same time. Props to Kirk.

Find a way that you feel most comfortable learning. Whilst you could buy books and courses, my personality suits the ‘JFDI’ route. Have an iPhone? You can download a Python IDE (Integrated Development Environment) for your phone and tablet! Blow away those long hours on the tube, plane or train.

It’s also worth checking out blogs like these listed below. If you’re entering the world of automation and software defined ‘stuff’, these blogs present valuable information and view points:

[Brent Salisbury’s ‘networkstatic.net’](http://networkstatic.net/)

This site contains excellent information around network automation: [workflowsherpas.com](http://workflowsherpas.com/)

Things about Python worth remembering
(1) It’s named after something British; Monty Python (this is possibly the most important thing you’ll ever need to remember about Python).

(2) Python is based on objects and is both dynamically and strongly typed. Check this wiki page for more information. What it allows you to do though is this:

#### The Useful How To Guides

Three links below are for the self contained how-to guides for: CLI scraping, PyEZ and onePK. In order to make this exercise meaningful and to provide parity across our three examples, directly below is a fictitious set of requirements. These requirements will also help you to think about the approach in a disciplined manor.

__ACME Industries – NetOps requirements__

ACME elevator music incorporated is seeing unprecedented growth for some unknown reason and have decided to do a health check on their network which currently consists of a Cisco Catalyst 3560, a Juniper Firefly Edge (vSRX) and a Cisco ISR running onePK.

1. Hostname
2. Model
3. Uptime of each device
4. Current software version
5. Device serial number
6. MAC address for each active Ethernet interface

You are to find this information and present human readable output which can be entered in to a report. Only the Cisco C3560 provides a CLI. The CLI can only be accessed via the Python network automation console. Please create re-usable code and scripts to add value to the Network Operations team.

__May Contain Traces of Nuts__

So, if you’re new to programming, automation or both, then the thought of using a framework might be daunting to say the least. It’s completely expected and understood, so fear not! For the information contained in the links in the next section to make absolute sense and to provide maximum value, they should be followed top to bottom. It’s important that you experience how horrendously complicated or time consuming something can be doing it the hard way versus using a micro-framework like PyEZ which does all of the hard work for you.

__Paper exercise – old world__

As a paper exercise, take the list of requirements from the last section and quickly draft out how you would obtain this information from a Cisco Catalyst switch. Include the CLI commands and any regular expressions used to home in on the information required. Also how would you filter out the exact information? Next, try it out on a real or emulated device. Do your commands work? Did you get the approach right? More to the point, do you have just the information you require?

__The Fun Part__

Click on each link below to read each how-to guide. Have fun!

[Using CLI Scraping (for Cisco Catalyst Switching)](/blog/2014/05/cli-scraping-python/)
An example of how to build a CLI scraper library and how to wield it. Just avoid having to do this where possible.

[Using Juniper’s PyEZ Library](/blog/2014/05/using-juniper-pyez-library/)
This micro-framework is ideal to use as a ‘Power-CLI’!

[Using Cisco’s onePK](/blog/2014/05/using-ciscos-onepk-python/)
This is a full blown set of libraries and modules. A little verbose for use as a ‘Power-CLI’ but if semi-automated it could be done.

### Summary

If you’ve made it this far, well done. You’re well on your way to becoming a Pythonista.






