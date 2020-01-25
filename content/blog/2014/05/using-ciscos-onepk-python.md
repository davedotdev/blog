---
title: "Using Cisco’s onePK with Python [Beginner]"
date: 2014-05-24T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Using Ciscos onePK"
signoff: Dave
---

This is a self contained guide on how to use [Cisco’s onePK](http://www.cisco.com/c/en/us/products/ios-nx-os-software/onepk.html) to connect to a Cisco device running the onePK service and interact with it. As well as being a self contained guide, it’s also linked to from [this](http://ipengineer.net/2014/05/using-ciscos-onepk-python/LINK) article which provides an overview of Python programmability. This article is not an introduction to onePK and it’s capabilities. Check [this](http://www.cisco.com/c/dam/en/us/products/collateral/ios-nx-os-software/at_a_glance_c45-708540.pdf) link for more information around onePK.

Here is the data to be obtained with code from our Cisco ISR router running onePK. If you didn’t complete the exercise described in the [introduction article](http://ipengineer.net/2014/05/from-cli-to-python-beginner/), it might be worth doing it to help gain the mindset. It’s not mandatory however!

1. Hostname
2. Model
3. Uptime of each device
4. Current software version
5. Device serial number
6. MAC address for each active Ethernet interface



#### Let's begin

First things first, we download either the all-in-one VM which can be found [here](https://developer.cisco.com/site/networking/one/onepk/sdk-and-docs/all-in-one-vm/index.gsp) or download the Python SDK which can be found [here](https://developer.cisco.com/site/networking/one/onepk/sdk-and-docs/sdk-and-docs-for-python/index.gsp). The links may change so [here](https://developer.cisco.com/site/devnet/home/index.gsp) is the link for the Cisco DevNet site. It goes without saying, if you download the Python SDK, you need an IOS, NX-OS or IOS-XE/XR device capable of running the onePK service. The all-in-one VM has a limited version of VIRL with vIOS which allows you to rapidly test. Finally [here](https://developer.cisco.com/site/networking/one/onepk/documents/api-reference/python/) is the Python API page (which you’ll need from time to time!)

As a summary, we’re trying to connect and call some API methods from our coding environment with the Python onePK SDK installed (or it could be a server) to a network element with the onePK service running, like so:

![Element-Object-Model2](/images/blog/Element-Object-Model2.png#center)

#### Assuming all in one VM

As previously stated, the all-in-one VM provided by Cisco has everything we need to get started with onePK. Let’s start there and see how easily our objectives can be reached. Eclipse comes pre-loaded with examples on the VM, which provides a great starting point to get familiar with the onePK platform. Also, once the VM is launched, I tend not to work on the VM desktop, but use X11 to forward the Eclipse GUI and a separate SSH session for running the code. In order to achieve this, login to the VM like so:

```bash
ssh user@x.x.x.x -o X11Forward=yes
# Once you've entered your password and logged on (or via keys etc), then start Eclipse.
eclipse
# At this point, Eclipse should appear on your desktop. Windows users need to use a tool such as Xming.  
```

Now that we have Eclipse open, ensure that you’re working from the Python workspace. Open up the file ‘BaseTutorial.py’ and take a look. What do you see? Lots more than you expected? OnePK is not a micro-framework, on first looks it appears to be a monster! With anything of this nature, documentation and a few examples is key to utilising it.

First things first, let’s break down our requirements in to steps:

1. Connect to Cisco ISR element via onePK and TLS (on our all-in-one VM we know that onePK is enabled. Ensure it is!)
2. Use the hard work Cisco have already put in and reuse their code for speed.
3. For each of our objectives, figure out the correct API method and call.
4. Pretty print the data.

Let’s create an object like below to help us reach and complete our objectives. Let’s follow the example from the [Juniper PyEZ Post](http://ipengineer.net/2014/05/using-juniper-pyez-library) and populate the object directly from the constructor. This involves passing the object a device handle.

![PyEZ_Object](/images/blog/PyEZ_Object.png#center)

#### Let the battle commence!

But first – some basic standards to adhere to.

```plaintext
Methods = thisMethod()  
Functions = thisFunction()  
Variables  = this_is_a_value = x  
Class   = ThisClass()  
Fields = this_is_a_value = x  
Private field = _private_field = x  
Comment = # Comment blah blah stuff blah
```

In the spirit of not creating ourselves more work than absolutely necessary, we’ll re-use the code examples provided by Cisco to get a connection to the device.

So for task one in our five task list, let’s just take onePK for a test drive and connect up. In it’s most simplest form, we’ll spool up the ‘Start 3node’ link on the VM desktop which will start three vIOS routers and then fire up Eclipse ensuring that the workspace is set to the Python based onePK environment ‘home/cisco/workspace-python’. The weird thing you discover first time is that they like you to run the files from the command line. You could of course just create a run configuration within Eclipse. Next run the ‘BaseTutorial.py’ code from the base Python directory (however you choose). Just for ease here’s one I made earlier: `cisco@onepk:~/onePK-sdk-1.2.0.173/python/tutorials$ ./BaseTutorial.py -a 10.10.10.110 -R ~/ca.pem`. This connects the test onePK application to the node 10.10.10.110 and uses the certificate (ca.pem) for the TLS aspect of the connection. If this doesn’t work, you might have serious problems as this is the ‘hello world’ of onePK. If it does work, you should see something like the below:

```bash
cisco@onepk:~/onePK-sdk-1.2.0.173/python/tutorials$ ./BaseTutorial.py -a 10.10.10.110 -R ~/ca.pem 
INFO:onep:BaseTutorial:Reading arguments...
Enter Username : dgee
Enter Password : 
INFO:onep:BaseTutorial:Connecting to Network Element...
INFO:onep:BaseTutorial:We have a NetworkElement : 
NetworkElement [ 10.10.10.110 ]

INFO:onep:BaseTutorial:Successful connection to NetworkElement - 
INFO:onep:BaseTutorial:Done.
```

Task two is a little more complicated and involves some design decisions. How do we want to write the code? Do we want to create an object that self populates by passing an element reference to it? Or do we want to use Java and .Net style getters/setters to populate the object? I typically go for the tidy one and use a self populating object that does it’s magic on a single function call. That’s great for testing however it doesn’t suit every requirement, so make sure if you’re new to this that you know what all of your options are before becoming accustomed to a single design pattern. With the chosen design pattern, reusing Cisco’s code is easy. We’ll just inherit the BaseTutorial object in our object and then extend it! Simples.

On to task three! If you’re a newcomer to automation and programmability, finding your way through the [API documentation](https://developer.cisco.com/site/networking/one/onepk/documents/api-reference/python/) can be a daunting task. The information we want luckily is straight forward to get hold of. We want typical element information and a list of MAC addresses specific to active Ethernet interfaces. In summary:

1. Element information

2. Active Ethernet interface information

3. MAC addresses relevant to active Ethernet interfaces

Analysing the BaseTutorial object, all of our information is directly available from that barring interface lists. The object methods below facilitate us to get this data:

```python
_hostname = self.get_element_hostname()
_properties = self.get_network_element().properties
_model = _properties.product_id
_uptime = _properties.sys_uptime
_version =_properties.version_id
_serial = _properties.SerialNo
```

So next job, our active interface list! How to go about this? We need to get a list of interfaces, then get the status. Then for every active interface, obtain the MAC address. This was the code I opted for. It works and is fairly clean. The first line returns a reference to the network element we have a connection to. Once we have the element, the second line returns a list of interfaces. We then iterate over the list and get a status for each interface using a for loop, which then has a conditional statement which checks to make sure the interface is operational. If the interface is operational then it obtains configuration data for the interface and populates the dictionary object (_interfaces) with a name (key) and the ‘mac_address’ (value) pair.

#### Whoaa, hold on, how did you find this stuff?

Jumped ahead a bit there. Sorry! In the code sample above, the hostname variable is populated by the get_element_hostname() method that was inherited from the ‘BaseTutorial’ object. Check the source code of that module in Eclipse. The element ‘_properties’ object is populated by returning the get_network_element().properties field from the ‘BaseTutorial’ object. Once we have properties object, we can just call what we need from that. Find API references below for the information just covered off:

[Link for `get_network_element()`](https://developer.cisco.com/media/onepk_python_api/onep.element.NetworkApplication.NetworkApplication-class.html#get_network_element)

[Link for `get_network_element().properties`](https://developer.cisco.com/media/onepk_python_api/onep.element.ElementProperty.ElementProperty-class.html)

The next step involves acquiring a list of interfaces, obtaining the status, then iterating over the list to pull the MAC addresses. After some searching around the API documentation, below are the links I found which achieved this set of tasks:

[Link for `InterfaceFilter`](https://developer.cisco.com/media/onepk_python_api/onep.interfaces.InterfaceFilter.InterfaceFilter-class.html)

[Link for `get_interface_list()`](https://developer.cisco.com/media/onepk_python_api/onep.element.NetworkElement.NetworkElement-class.html#get_interface_list)

[Link for `get_status()`](https://developer.cisco.com/media/onepk_python_api/onep.interfaces.NetworkInterface.NetworkInterface-class.html#get_status)

[Link for `get_config()`](https://developer.cisco.com/media/onepk_python_api/onep.interfaces.NetworkInterface.NetworkInterface-class.html#get_config)

Once we have the mechanisms to obtain the required data, all we need to do now is wield them and get it!

```python
_element = self.get_network_element()
_filter = InterfaceFilter(None,InterfaceTypes.ONEP_IF_TYPE_ETHERNET)
_int_list = _element.get_interface_list(_filter)
        
for _interface in _int_list:
    _intStatus = _interface.get_status()

    if (_intStatus.link == InterfaceStatusTypes.ONEP_IF_STATE_OPER_UP and _intStatus.lineproto == InterfaceStatusTypes.ONEP_IF_STATE_OPER_UP):
        _intConfig = NetworkInterface.get_config(_interface)
        # The next line updates a dictionary object called '_interfaces'
        self._interfaces.update({_intStatus.interface_name : _intConfig.mac_address })
```

In order for us to run this code, the following modules need to be imported. I’ve also included the Enums (enumerations), which allows us to reference states in our case with values such as ‘ONEP_IF_STATE_OPER_UP’ instead of ‘3’. Although Python doesn’t officially support Enums as a native type, you can define your own type and be done with it (as Cisco have done). Mapping of Enums are the two lines at the bottom.

```python
from onep.interfaces import InterfaceFilter
from onep.interfaces import InterfaceStatus
from onep.interfaces import NetworkInterface
from onep.element import NetworkElement
from onep.core.util import  OnepConstants
from onep.core.util import enum

InterfaceTypes = NetworkInterface.InterfaceTypes
InterfaceStatusTypes = InterfaceStatus.InterfaceState
```

The final task it to make the information presentable to the end user, administrator or operator. This involves creating a `def __str__(self):` method in our class object and printing the information in string representation. The code for that object is directly below. It’s straight forward. We create a pretty title in ASCII, then go through each field and then iterate over the interface information.

```python
def __str__(self):
    '''
    This is our special print function which returns a string (text) version of the object.
    We need to build our text up and structure it. We do this by appending the required text to a variable
    which we've called 'return_string'.
    n is a special sequence to insert a new line and t (can you guess?) is a tab.
    Once our string is complete, we 'return' it to the caller.
    '''
    return_string = ''
    return_string += 64*"="
    return_string += "n"
    return_string += 24*" " + "Element Report"
    return_string += "n"
    return_string += 64*"="
    return_string += "n"
    return_string += "Hostname:tt" + str(self._hostname)
    return_string += "n"
    return_string += "Model:ttt" + str(self._model)
    return_string += "n"
    return_string += "Uptime:ttt" + str(self._uptime)
    return_string += "n"
    return_string += "Version:tt" + str(self._version)
    return_string += "n"
    return_string += "Serial:ttt" + str(self._serial)
    return_string += "n 
    return_string += 40*'-'+"n"
    return_string += 10*' ' + "Active Interface List    return_string += 40*'-' +"n"
        
    for _key in self._interfaces.keys        
        return_string += "Interface " + str(_key) + " MAC is " + str(self._interfaces.get(_key)) + "n"
    
    return_string += 40*'-' +"n"
               
    return return_string 
```

At the bottom of the page is the complete code listing. In Eclipse (because you’re using that right?) create a new package and call it what you will. Create a new .py file and drop the code in and save. Either via the bash shell or a run configuration, give the code a whirl. Directly below is the pretty output we so desire! Note that the version number is missing. This is a development limited version of vIOS so we can’t expect miracles!

```bash
cisco@onepk:~/onePK-sdk-1.2.0.173/python/tutorials$ ./ACMELift/ACMELift.py -a 10.10.10.110 -R ~/ca.pem
INFO:onep:NetElementBase:Reading arguments...
Enter Username : dgee
Enter Password : 
INFO:onep:BaseTutorial:We have a NetworkElement : 
NetworkElement [ 10.10.10.110 ]

INFO:onep:BaseTutorial:Successful connection to NetworkElement - 
Connected to Network Element 10.10.10.110
================================================================
                        Element Report
================================================================
Hostname:               10.10.10.110
Model:                  IOSv
Uptime:                 216521
Version:		
Serial:                 9DOX22DL6UTZJVXWO2ZA5
----------------------------------------
          Active Interface List
----------------------------------------
Interface GigabitEthernet0/3 MAC is 52.54.00.c0.9f.3e
Interface GigabitEthernet0/2 MAC is 52.54.00.46.d6.7f
Interface GigabitEthernet0/1 MAC is 52.54.00.6d.11.f9
Interface GigabitEthernet0/0 MAC is 52.54.00.10.30.12
----------------------------------------
```

And the code. Please note I’ve left in ‘code’ which allows you to enter interactive mode and play with the loaded objects using the Python functions `help(x)` and `dir(x)`. If you can’t figure how to handle an object I highly recommend doing this.

```python
#!/usr/bin/env python

# 
# * Copyright (c) 2010-2013 by Cisco Systems, Inc.
# *
# * THIS SAMPLE CODE IS PROVIDED "AS IS" WITHOUT ANY EXPRESS OR IMPLIED WARRANTY
# * BY CISCO SOLELY FOR THE PURPOSE of PROVIDING PROGRAMMING EXAMPLES.
# * CISCO SHALL NOT BE HELD LIABLE FOR ANY USE OF THE SAMPLE CODE IN ANY
# * APPLICATION.
# *
# * Redistribution and use of the sample code, with or without
# * modification, are permitted provided that the following conditions
# * are met:
# * Redistributions of source code must retain the above disclaimer.
# 
# package: NetElementInfoObjs.interfaces

"""
# 
 The goal is to get network element attributes as below and pretty print them.
 
1.  Hostname
2.  Model
3.  Uptime of each device
4.  Current software version
5.  Device serial number
6.  MAC address for each active Ethernet interface
 
  @author The onePK Team (onepk-feedback@cisco.com) and modified by @LSP42
  
"""
import logging
from BaseTutorial import BaseTutorial
from onep.interfaces import InterfaceFilter
from onep.interfaces import InterfaceStatus
from onep.interfaces import NetworkInterface
from onep.element import NetworkElement
from onep.core.util import  OnepConstants
from onep.core.util import enum
import code

InterfaceTypes = NetworkInterface.InterfaceTypes
InterfaceStatusTypes = InterfaceStatus.InterfaceState
logger = logging.getLogger('onep:NetElementBase')
logger.setLevel(logging.INFO)


class ACMENetData(BaseTutorial):
    _hostname = ''
    _model = ''
    _uptime =  ''
    _version = ''
    _serial = ''
    _interfaces = {}
    _element = ''
    _properties = []
    
    def __str__(self):
        '''
        This is our special print function which returns a string (text) version of the object.
        We need to build our text up and structure it. We do this by appending the required text to a variable
        which we've called 'return_string'.
        n is a special sequence to insert a new line and t (can you guess?) is a tab.
        Once our string is complete, we 'return' it to the caller.
        '''
        return_string = ''
        return_string += 64*"="
        return_string += "n"
        return_string += 24*" " + "Element Report"
        return_string += "n"
        return_string += 64*"="
        return_string += "n"
        return_string += "Hostname: " + str(self._hostname)
        return_string += "n"
        return_string += "Model: " + str(self._model)
        return_string += "n"
        return_string += "Uptime: " + str(self._uptime)
        return_string += "n"
        return_string += "Version: " + str(self._version)
        return_string += "n"
        return_string += "Serial: " + str(self._serial)
        return_string += "n"
        return_string += 40*'-'+"n"
        return_string += 10*' ' + "Active Interface Listn"
        return_string += 40*'-' +"n"
        
        for _key in self._interfaces.keys():
            return_string += "Interface " + str(_key) + " MAC is " + str(self._interfaces.get(_key)) + "n"
            
        return_string += 40*'-' +"n"
               
        return return_string 
    
    def get_data(self):
        '''
        This method obtains the required data and populates the fields in this object.
        '''
        self._element = self.get_network_element()
        self._hostname = self.get_element_hostname()
        self._properties = self.get_network_element().properties
        self._model = self._properties.product_id
        self._uptime = self._properties.sys_uptime
        self._version = self._properties.version_id
        self._serial = self._properties.SerialNo
        
        #_element = self.get_network_element()
        _filter = InterfaceFilter(None,InterfaceTypes.ONEP_IF_TYPE_ETHERNET)
        _int_list = self._element.get_interface_list(_filter)
        
        for _interface in _int_list:
            _intStatus = _interface.get_status()
            
            if (_intStatus.link == InterfaceStatusTypes.ONEP_IF_STATE_OPER_UP and _intStatus.lineproto == InterfaceStatusTypes.ONEP_IF_STATE_OPER_UP):
                _intConfig = NetworkInterface.get_config(_interface)
                self._interfaces.update({_intStatus.interface_name : _intConfig.mac_address })
                    
                    
if __name__ == '__main__':
    import sys
    NetElementObj = ACMENetData(sys.argv)
    logger.info("Reading arguments...")
    if not NetElementObj.parse_command_line():
        logger.error("Error in parsing arguments")
        sys.exit(1)

    try:
        if not NetElementObj.connect("ISR1"):
            sys.exit(1)
        
        print "Connected to Network Element " + str(NetElementObj.get_element_hostname())
        
        NetElementObj.get_data()
        print NetElementObj
        
                 
        code.interact(local=locals())
    
    except Exception, e:
        print e
    finally:
        
        
        print "Disconnecting from the Network Element"
        NetElementObj.disconnect()
        sys.exit(0)
```

Please feel free to comment whether it be positive or negative. All feedback is gratefully received and helps to improve the quality of future posts.



