---
title: "Python: Building a simple NETCONF RPC Tool"
date: 2014-11-18T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Python: Building a simple NETCONF RPC Tool"
signoff: Dave
categories:
- Python NETCONF RPC Tooling
tags:
- Python NETCONF RPC Tooling
---

For a while now I’ve been playing with NETCONF primarily with Cisco Nexus devices. It’s struck me how difficult it is to get good information on doing trivial things like building a simple NETCONF RPC wrapper

How would this be generated for instance? This is wrapper that can be submitted to the ‘xmlagent’ or ‘netconf’ subsystem on a Cisco Nexus device. Note the use of namespaces (nf:rpc, nxos:cmd) where nxos is a namespace? XML is easy for the most part. Namespaces on a personal level meant learning something new and how to deal with that knowledge programmatically.

```plaintext
<?xml version='1.0' encoding='ISO-8859-1'?>
<nf:rpc xmlns:nxos="http://www.cisco.com/nxos:1.0" xmlns:nf="urn:ietf:params:xml:ns:netconf:base:1.0" message-id="42">
  <nxos:exec-command>
    <nxos:cmd>interface ethernet 2/1; shutdown</nxos:cmd>
  </nxos:exec-command>
</nf:rpc>
]]>]]>
```

Other than generating it via a text string and formatting placeholders with “%s”, there has to be a better way! Indeed there is!

#### NETCONF 101

The IPEngineer definition: NETCONF is an IETF standardizsed RFC (6241) defined mechanism to configure network devices over some kind of channel using XML encoded data over a secure layer such as SSH. When the channel is opened, a NETCONF ‘Hello’ exchange takes place between the client and server (in this case, my laptop and the Cisco Nexus 7K I’m talking to with NETCONF). During this ‘Hello’, capabilities are also discovered. Once this is complete, we then transmit an RPC wrapper to the NETCONF server, in this case containing an RPC call, which is a NETCONF method of doing something arbitrary like wrapping CLI commands. NETCONF by design operates at content, operations and messages layers. Using the messages layer, we can send and receive data wrapped in RPC (remote procedure call) calls.

The NETCONF protocol is conceptually partitioned into four layers:

1. Content layer: configuration data and notification data.
2. Operations layer: retrieve and edit the device configuration.
3. Messages layer: remote procedure calls (RPCs) and notifications.
4. Secure Transport layer: secure client/server communications.

#### Holy sheep, show me the code Batman!

The code that follows is loaded on to GitHub [here](http://github.com/davidjohngee/nxosNCRPC). It uses the Python [LXML](http://lxml.de/) library to generate the output plus a little string concatenation of (]]>]]>) which serves as the delimeter that in turn tells the NETCONF server that it’s the end of the message.

This is a much more efficient way of creating the NETCONF messages and the nice thing is you can add more subelements programmatically without having to rewrite a string if you were doing this via the “sledgehammer to an egg” approach.

First install the package via pip or easy_install.

`pip install nxosNCRPC`

Here’s the test code:

```python
from nxosNCRPC import *

"""
---------------------------------------------------------------------------------
Let's try the code out. Create a class, create a command and print the wrapper
---------------------------------------------------------------------------------
"""
if __name__ == '__main__':
    # 42 represents the message-id
    call1 = nxosNCRPC("42")
    call1.add_command("conf t")
    call1.add_command("int eth2/1")
    call1.add_command("shut")
    # Some built in helper functions to provide the NETCONF hello, the actual RPC message and the NETCONF close messages
    print call1.hello()
    print call1.message()
    print call1.close()
```

And the output?

```bash
<?xml version="1.0" encoding="ISO-8859-1"?>
<hello xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">
  <capabilities>
    <capability>urn:ietf:params:xml:ns:netconf:base:1.0</capability>
    <capability>urn:ietf:params:netconf:base:1.0</capability>
  </capabilities>
</hello>
]]>]]>

<?xml version='1.0' encoding='ISO-8859-1'?>
<nc:rpc xmlns:nc="urn:ietf:params:xml:ns:netconf:base:1.0" xmlns:nxos="http://www.cisco.com/nxos:1.0" message-id="42">
  <nxos:exec-command>
    <nxos:cmd>conf t</nxos:cmd>
    <nxos:cmd>int eth2/1</nxos:cmd>
    <nxos:cmd>shut</nxos:cmd>
  </nxos:exec-command>
</nc:rpc>
]]>]]>

<?xml version="1.0"?>
<nc:rpc message-id="101" xmlns:nc="urn:ietf:params:xml:ns:netconf:base:1.0" xmlns="http://www.cisco.com/nxos:1.0">
  <nc:close-session/>
</nc:rpc>
]]>]]>
```

Have fun!

#### Notes

For Windows users using Putty, under SSH options, insert -s:

![putty](/images/blog/putty.png#center)