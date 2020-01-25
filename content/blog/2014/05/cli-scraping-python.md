---
title: "CLI Scraping with Python"
date: 2014-05-24T13:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "CLI Scraping with Python"
signoff: Dave
---

This is a self contained guide on how to use code driven CLI scraping to connect to a Cisco Catalyst 3560 device and interact with it. As well as being a self contained guide, it’s also linked to from [this](http://ipengineer.net/2014/05/from-cli-to-python-beginner/) article which provides an overview of Python programmability.

#### What is CLI scraping?

Driving the CLI from code and useful libraries.

![NetOS_DataConnectivity_CLI](/images/blog/NetOS_DataConnectivity_CLI.png#center)

#### Why should I do it?

What’s the first rule of CLI scraping? Just don’t do it. Simples. Go and find a supported API method. If you can’t find one on the device that you need to communicate with then upgrade the software. If no upgrade exists for said device that facilitates your objective, then go beat your vendor on the head with a big stick with some sharp things embedded. Maybe a crown of barbed wire. Vendor gone out of business or no longer supporting the product? Can you forklift it out? No? Welcome to CLI scraping 101.

#### So you have to do CLI scraping? You have sympathy from the industry

CLI scraping done well can prove useful and if you write the code well, will prove repetitively useful to your company or employer. Write it once, use it many times etc. As per the introduction article found here, a good method of CLI scraping is to create objects which then can be populated as the output from the CLI is parsed. Need to update the device as well? Create clean functions and methods that allow you to retrieve and parse information in addition to those that build configuration statements. If you carried out the paper exercise in the introduction article, you could transpose this information in to set of objects or classes. You will quickly discover much manual bodgery is required to get your code to do what you want. Let’s get a bit more real world. Does your code work on a Cisco router? How about Alcatel Lucent? What about Brocade? What about a different model in the same range? The answer normally is _“Of course not, each CLI is different.” Fancy writing lots of plugins for your code to make it re-usable? sigh I don’t. Your CLI scraping code will inherently have narrow usage unless you get real determined and hire some coders to make a re-usable library based set of CLI scraping code. Suddenly have more respect for Tail-F NCS? You should.

#### Ok, I’m going to have a go. What information do you want me to find from the Cisco Catalyst switch?

At this point kindness hasn’t been forthcoming and the objectives are not either. It’s important that the horrendous nature of CLI scraping is experienced first hand so that you enthusiastically join the voices in the industry screaming at vendors for programmable ease, with either vendor proprietary APIs or the likes of OpenFlow, I2RS etc etc.

Here is the data to be obtained with code from our Cisco Catalyst switch. If you didn’t complete the exercise described in the [introduction article](http://ipengineer.net/2014/05/from-cli-to-python-beginner/), it might be worth doing it to help gain the mindset. It’s not mandatory however!

1. Hostname
2. Model
3. Uptime of each device
4. Current software version
5. Device serial number
6. MAC address for each active Ethernet interface

#### So how do you propose I get this information?

For anyone familiar with Cisco’s IOS on the Catalyst 3560, you’ll know that the `show version` command and it’s derivatives ( `sh ver` etc) lists the information required from point 1. through point 5. How about to get the hostname? You could take the prompt line, but instead of just reading that, let’s go for `show run | inc hostname`, which is a command piped in to a regular expression which will filter out everything else but the hostname line. Next challenge, how to get the MAC address list for each active interface? How about `show interface sum`? That will provide a list. So, to find the active interfaces `show interface sum | inc *`. The backslash is a special escape sequence which allows you to search against * as opposed to it being entered as a literal wildcard character. Next, we take the list and run a command for each one in order to gain the MAC address detail. I’ve gone for this: `show interface X | inc bia`. Why bia (burned in address)? Address could also represent an IP address. The more granular we need to get, the more obscure the keywords to search against without getting data collisions (two things called address etc). So now we have lines of output, how can programmatically isolate the data? That involves needing to know where the expected output is. The great bit with CLI scraping needs an example. If we want to take a MAC address from a routed interface, the place of the data is different to the output from an SVI interface. The MAC address for an SVI is at word place 7 in the output of the last command, whilst a MAC address for a routed port is at place 8! Typical. Our data is a moving target.

Below are commands with regular expressions which can be used to extract the required information from the specified device.

```bash
show version | inc System serial|uptime|image|Model number
show run | inc hostname
show interface sum | inc *
show interface <+ interface +> | inc bia
```

#### Ok, you’ve made your point. Thou shalt only CLI scrape when absolutely necessary

Great.

#### Show me the code!

For this exercise, I’ve used the Python library [Paramiko](https://github.com/paramiko/paramiko) which allows you to drive SSH programmatically. Install that using the below (if you haven’t got it installed yet).

```bash
pip install parakmiko
```

To use Paramiko, you must obtain the SSH key of the network element you wish to connect to. On OSX this can be found at `tail ~/.ssh/known_hosts | grep x.x.x.x` where `x.x.x.x` is the IP address of the node. You also need a valid username and password to create a connection. One final note, make sure the host key is complete. It must be padded to the correct 64 bit length due to the way the key is decoded. Here is the basic code required to get a connection to our network element:

```python
import paramiko, base64

key = paramiko.RSAKey(data=base64.decodestring('AAAA<*snip*>=='))

client = paramiko.SSHClient()
client.get_host_keys().add('192.168.0.1', 'ssh-rsa', key)
client.connect('192.168.0.1', username='dgee', password='Passw0rd')
```

In an ideal world, we would then create an object, pass the client object to it and call a get() or parse() function to populate the object with our information. THen we should be able to refer to the object and call out the information we require.

Something like this:

```python
dev1 = NetElement()
dev1.data_fetch(client)

# Now let's print out the network element report

print "n"
print "=" * 64 + "n" + 20 * " " + "Network Element Reportn" + "=" * 64
print "Hostname:t" + dev1.get('hostname')
print "Model:tt" + dev1.get('model')
print "Serial:tt" + dev1.get('serial')
print "Uptime:tt" + dev1.get('uptime')
print "Version:t" + dev1.get('flash')
print ""

print "Active Interface List:"
print 32 * "-"
for key in dev1.interfaces.keys():
    print "Interface ", key, "nt", dev1.interfaces.get(key)
    
print "=" * 64 + "n"
```

Ultimately what we’re asking for then is a nasty text search algorithm that extracts data and inserts it in to a searchable object, ideally a dictionary. Without any more introduction, here’s some code that works. It’s not the prettiest code and it could be tidier. Why isn’t it tidier? It’s a demonstration of the real world. I had one evening to write some code to facilitate reaching the requirements. Will I go back and tidy up? No. Like the real world, I will not. Why? BECAUSE CLI SCRAPING IS BAD! If this code was not an implementation of CLI scraping, then I would go back and iteratively improve it. Many organisations however would not. Once it’s deemed working, it’s signed off. The person leaves the company and it works in an arcane magic kind of way from that moment onwards. Here’s the code in it’s grandeur and in image of our class object used to store and process the data.

![PyEZ_Object_2](/images/blog/PyEZ_Object_2.png#center)

```python
#    Class to store interface attribute data
#
#    This class allows you to create dict fields and store them in the object.

class InterfaceObject(dict):
    """
    This object is inherited from a Dictionary object. This allows us to dynamically create fields programmatically.
    """
    def __getattr__(self, attr):
        """
        If attr is not a key, fall-back and get the attr
        """
        if self.has_key(attr):
            return super(InterfaceObject, self).__getitem__(attr)
        else:
            return super(InterfaceObject, self).__getattr__(attr)


    def __setattr__(self, attr, value):
        """
        Output the dict in its entirety.
        """
        super(InterfaceObject, self).__setitem__(attr, value)



#       Class to construct element and interface data store
#
#       Easiest way to get this information is: show version | inc System serial|uptime|image|Model number
#
#       self._up_time = uptime
#       self._version = version
#       self._serial = serial
#       self._hostname = hostname
#       self._model = model
#
#       To get interface information, obtain an interface list that's up using:
#       
#       show interfaces | inc *
#
#       Then from that list, generate a list of "show interface X | inc address"
#
#       This information then needs to be parsed to form the object below.
#
#       self._interfaces = interfaces


class NetElement(dict):
    """
    This class loads some fields with data from a Cisco IOS network element governed by the list here
    #
    #       Easiest way to get this information is: show version | inc System serial|uptime|image|Model number
    #
    #       self._up_time = uptime
    #       self._version = version
    #       self._serial = serial
    #       self._hostname = hostname
    #       self._model = model
    #
    #       To get interface information, obtain an interface list that's up using:
    #       
    #       show interfaces | inc *
    #
    #       Then from that list, generate a list of "show interface X | inc address"
    #
    #       This information then needs to be parsed to form the object below.
    #
    #       self._interfaces = interfaces
    """
    
    _element_array = []          # Array that stores unstructured element data
    _interface_array = []        # Array that stores unstructured interface names
    _interface_attrib_array = [] # Array that stores unstructured interface attribute data
    interfaces = InterfaceObject()

    def __init__(self):
        pass
    
    def __getattr__(self, attr):
        """
        If attr is not a key, fall-back and get the attr
        """
        if self.has_key(attr):
            return super(NetElement, self).__getitem__(attr)
        else:
            return super(NetElement, self).__getattr__(attr)


    def __setattr__(self, attr, value):
        """
        Output the dict in its entirety.
        """
        super(NetElement, self).__setitem__(attr, value)
        super(NetElement, self).__setattr__(attr, value)
    
    def data_parse(self):
        
         # Create an updater object components
        
        _dname = "" 
        _daddress = "" 
        _dmtu = ""

        interface_attrib_key = {}
        
        # These dictionaries below represent where each keyword is in the output, not digit position!
        interface_attrib_key_svi = {"interface": 2, "address" : 7, "MTU" : 3}
        interface_attrib_key_hw = {"interface": 2, "address" : 8, "MTU" : 3}
        
        # Let's parse the element objects
        
        # We need a bit more control over the text we receive. I've generated a buffered stream and populated it with our text.
        # A buffered stream will allow us to readlines and do seek operations etc.
        # Now we have the data, let's find what we're looking for. 'keys' represents our search strings, keys_left 
        # and keys_right represents our actual text digit position.
         
        keys = ["hostname", "uptime", "flash", "Model", "serial"]        
        keys_left = [9, 20, 29, 34, 34]
        keys_right = [18, 56, 65, 49, 45]
                
        for element_data in self._element_array:
            # This loop scans each line for our 'key' word which identifies our content
         
            key_offset_counter = 0
            for key in keys:
                 
                try:
                    if element_data.find(key) != -1:
                        self[key.lower()] = element_data[keys_left[key_offset_counter]:keys_right[key_offset_counter]] 
                except:
                    pass
                 
                key_offset_counter += 1

        
        # Parse the interface attributes
    
        
        # Easiest way is to use a template like this {"NAME" " {"ATT_NAME": "ATT_VALUE"}
        # Then we can use a list of attrib keys to index in to the dict like this:
        # attrib_keys = ["address", "MTU"]        
   
        for _array in self._interface_attrib_array:
              
            interface_attrib_list_stream = io.BytesIO(_array)
         
            EOF = False
         
            while EOF != True:
                data = interface_attrib_list_stream.readline()
             
                if "Vlan" in data:
                    interface_attrib_key = interface_attrib_key_svi
                elif ("Fast" or "Gig") in data:
                    interface_attrib_key = interface_attrib_key_hw
                
                
                if data == '':
                    EOF = True
                if any([x in data for x in interface_attrib_key]):
                    
                    # This section could be so much more tidier.
                    # Instead of using this routine, it would be cleaner to decouple the actual search
                    # terms like 'interface' or 'address' and use a key &amp; value search method like the element
                    # information search method.
                    # However, it shows how attempts to keep code tidy and reusable isn't always possible
                    # when you just 'need' to get something done. Data decoupling and meta data would solve this issue.

                    split_array = data.split (" ")
                    
                    for key in interface_attrib_key.keys():
                        if key in split_array:
                        
                            _temp_field =  split_array[interface_attrib_key.get(key)]
                            if key == "interface":
                                _dname = _temp_field
                            elif key == "address":
                                _daddress = _temp_field
                            elif key == "MTU":
                                _dmtu = _temp_field
            
            dict_updater = { _dname : {'address' : _daddress, 'MTU' : _dmtu}}
            self.interfaces.update(dict_updater)    
            
        # We get to this level and we've parsed our interface attributes and interfaces   
                            
    
    def data_fetch(self, client):
        
        client_conn = client.invoke_shell()
        client_conn.send("term len 0n")
        print "[DEV] Logged in and setting terminal length"
        time.sleep(1)
        output = client_conn.recv(1000)
        client_conn.send("n")
        output = client_conn.recv(1000)
        client_conn.send("show version | inc System serial|uptime|image|Model numbern")
        print "[DEV] Submitted element regular expression"
        time.sleep(1)
        
        self._ssh_output = client_conn.recv(500000)
        
        # We need a bit more control over the text we receive. I've generated a buffered stream and populated it with our text.
        # A buffered stream will allow us to readlines and do seek operations etc.
        
        element_stream = io.BytesIO(self._ssh_output)

        # ELEMENT TEXT EDITING
        # We need to move the position in the buffer beyond the first line, which is the regex itself.
        element_stream.next()
        
        for x in range(0, 4):
            self._element_array.append (element_stream.readline()[:-1])
        
        
        client_conn.send("show run | inc hostnamen")
        print "[DEV] Submitted element hostname regular expression"
        time.sleep(5)
        
        self._ssh_output = client_conn.recv(500000)
        
        # We need a bit more control over the text we receive. I've generated a buffered stream and populated it with our text.
        # A buffered stream will allow us to readlines and do seek operations etc.
        
        element_stream = io.BytesIO(self._ssh_output)
        
        element_stream.next()
        
        self._element_array.append(element_stream.readline()[:-1]+"n")
        
        # Now to get the active interface list
        
        client_conn.send("show interface sum | inc *n")
        print "[DEV] Submitted interface list regular expression"
        time.sleep(1)
        
        self._ssh_output = client_conn.recv(500000)
        
        interface_list_stream = io.BytesIO(self._ssh_output)
        
        EOF = False
        
        interface_list_key = ["Vlan", "Fast", "Gig"]
        
        while EOF != True:
            data = interface_list_stream.readline()
            
            if data == '':
                EOF = True
            if any([x in data for x in interface_list_key]):
                
                split_array = data.split (" ")
                self._interface_array.append(split_array[1])
            else:
                pass
        
        # Once we have the active interface list, we need to get attributes from them and store them in an unstructured array
        
        for interface in self._interface_array:
            
            client_conn.send("show interface " + interface + " | inc bia|MTUn")
            print "[DEV] Submitted interface regular expression for interface " + interface + " attributes"
            time.sleep(1)
        
            self._ssh_output = client_conn.recv(500000)
            
            self._interface_attrib_array.append(self._ssh_output)

        self.data_parse()



import paramiko, base64, time, io, code

key = paramiko.RSAKey(data=base64.decodestring('AAAA<*snip*>=='))

client = paramiko.SSHClient()
client.get_host_keys().add('192.168.0.1', 'ssh-rsa', key)
client.connect('192.168.0.1', username='dgee', password='Passw0rd')



dev1 = NetElement()
dev1.data_fetch(client)

# Now let's print out the network element report

print "n"
print "=" * 64 + "n" + 20 * " " + "Network Element Reportn" + "=" * 64
print "Hostname:t" + dev1.get('hostname')
print "Model:tt" + dev1.get('model')
print "Serial:tt" + dev1.get('serial')
print "Uptime:tt" + dev1.get('uptime')
print "Version:t" + dev1.get('flash')
print ""

print "Active Interface List:"
print 32 * "-"
for key in dev1.interfaces.keys():
    print "Interface ", key, "nt", dev1.interfaces.get(key)
    
print "=" * 64 + "n"

# Finally, drop in to the interactive shell

print "nnWelcome to the interactive shell"
code.interact(local=locals())


# client.close()
```

#### Output from our dirty code

```bash
[DEV] Logged in and setting terminal length
[DEV] Submitted element regular expression
[DEV] Submitted element hostname regular expression
[DEV] Submitted interface list regular expression
[DEV] Submitted interface regular expression for interface Vlan10 attributes
[DEV] Submitted interface regular expression for interface Vlan20 attributes
[DEV] Submitted interface regular expression for interface Vlan30 attributes
[DEV] Submitted interface regular expression for interface Vlan40 attributes
[DEV] Submitted interface regular expression for interface FastEthernet0/1 attributes
[DEV] Submitted interface regular expression for interface FastEthernet0/11 attributes
[DEV] Submitted interface regular expression for interface FastEthernet0/12 attributes
[DEV] Submitted interface regular expression for interface FastEthernet0/19 attributes
[DEV] Submitted interface regular expression for interface FastEthernet0/20 attributes
[DEV] Submitted interface regular expression for interface FastEthernet0/21 attributes
[DEV] Submitted interface regular expression for interface FastEthernet0/22 attributes
[DEV] Submitted interface regular expression for interface FastEthernet0/24 attributes
[DEV] Submitted interface regular expression for interface GigabitEthernet0/1 attributes
[DEV] Submitted interface regular expression for interface GigabitEthernet0/2 attributes


================================================================
                    Network Element Report
================================================================
Hostname:   Home-3560
Model:      WS-C3560-24PS-E
Serial:     CAT1112ZJ5G
Uptime:     9 weeks, 1 day, 21 hours, 17 minutes
Version:    c3560-ipservicesk9-mz.122-55.SE1.bin

Active Interface List:
--------------------------------
Interface  Vlan10 
    {'MTU': '1500', 'address': '001b.2bec.8641'}
Interface  Vlan20 
    {'MTU': '1500', 'address': '001b.2bec.8642'}
Interface  Vlan30 
    {'MTU': '1500', 'address': '001b.2bec.8643'}
Interface  GigabitEthernet0/1 
    {'MTU': '1500', 'address': '001b.2bec.8601'}
Interface  FastEthernet0/24 
    {'MTU': '1500', 'address': '001b.2bec.861a'}
Interface  GigabitEthernet0/2 
    {'MTU': '1500', 'address': '001b.2bec.8602'}
Interface  FastEthernet0/1 
    {'MTU': '1500', 'address': '001b.2bec.8603'}
Interface  FastEthernet0/12 
    {'MTU': '1500', 'address': '001b.2bec.860e'}
Interface  FastEthernet0/11 
    {'MTU': '1500', 'address': '001b.2bec.860d'}
Interface  FastEthernet0/22 
    {'MTU': '1500', 'address': '001b.2bec.8618'}
Interface  FastEthernet0/20 
    {'MTU': '1500', 'address': '001b.2bec.8616'}
Interface  FastEthernet0/21 
    {'MTU': '1500', 'address': '001b.2bec.8617'}
Interface  Vlan40 
    {'MTU': '1500', 'address': '001b.2bec.8644'}
Interface  FastEthernet0/19 
    {'MTU': '1500', 'address': '001b.2bec.8615'}
================================================================
```

#### How could it be better? 

I don’t want to get beaten for CLI scraping, but I am curious
Good question and one that you will naturally ask as a diligent engineer, administrator or consultant.

1. The CLI command, along with regular expression and data cursor or word positions could be placed in a list or dictionary. 

2. The list or dict could then be iterated on and each function (i.e. list of CLI commands) will then be executed in a loop.

3. The updater object could be key and value driven from a dictionary object that could be iterated over.
It could be written to handle exceptions and errors. Currently it is experimental code without any error handling.

4. Delete it all and go ask a vendor to add some API capability.

#### Conclusion

Whilst this code isn’t reusable without some tweaking, the framework however is. You can replace keywords in the dictionaries and modify the updater object. The regular expressions can also be changed to suite another vendors platform. When it comes to CLI scraping, there is much more specific non-reusable code than anyone would like. That’s the nature of CLI scraping.
