---
title: "Python: Real World Hacking on StackStorm (Network Engineer Focussed)"
date: 2017-02-27T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Python: Real World Hacking on StackStorm (Network Engineer Focussed)"
signoff: Dave
categories:
- StackStorm
- Automation
- Python
tags:
- StackStorm
- Automation
- Python
---

![ST2](/images/blog/st2_stackstorm.jpg#center)

It’s miserably cold, raining (the kind that gets you really wet) and a strange dark grey light covers the UK. Some would say a typical day on this island. That said, I have a coffee in hand and some thoughts to share!

For the last year working for Brocade, I’ve been heavily focussed on delivering talks, demonstrations and knowledge on the excellent StackStorm open-source project (referred to as ST2 from this point onwards for brevity). This post does not go in to what ST2 is, but for those who don’t know, it’s an event driven workflow engine. Input, decision/s, output. Simple! The ST2 website itself is a great resource for information as well as other well known blogs. ST2 is quite feature rich and under constant development. One would say it’s an agile tool for a growingly agile world.

#### So What Have You Been Making?

I can’t spoil what it is I’ve been building, but one of the challenges was to use the built in key-value (KV) store (currently built on Etcd with a ST2 specific abstraction layer) to use as a point of data convergence. What does this mean in real terms? I have multiple things happening and I want to use the KV store as a common point of reference to tie these things together. ST2 allows you to use the KV store in multiple ways:

In workflows via setting, getting, updating and deleting keys based on YAML and YAQL
Using the Python ‘st2client’ library which calls the ST2 REST API underneath
Directly using the ST2 REST API
For my specific use case, I want to access the ST2 KV store over the ST2 REST API and carry out operations using the st2client Python library on a virtual machine _not_ on the ST2 base host. The documentation is a great starting point but with all things development, my use case is my use case and we can’t expect documentation to exist for every imaginable thing! After all, I’m not a narcissistic psychopath (or am I?).

Before we start looking at the logic involved to achieve the ‘use case’, I’ve created a Ubuntu VM on 14.04. On this VM I’ll explore the st2client lib that’s used in the documentation and share all of the output so you can play along too!

On this VM, I’ve done the obligatory: `sudo apt-get update && sudo apt-get upgrade`.
Next, `sudo pip install st2client` to install the client library we’ll be working with.

#### The Hacking

ST2 itself is fronted by [NGINX](https://www.nginx.com/), the well known HTTP server and reverse proxy and I happen to know that it handles SSL termination for ST2.

![StackStorm_NGINX](/images/blog/StackStorm_NGINX.png#center)

hat means the example below directly taken from the documentation page is working on the ST2 host itself. See the ‘http’ below? If we were to try this on my test VM, what is the result? Let’s do this on the interactive Python shell for fun.

```bash
>>> from st2client.client import Client
>>> from st2client.models import KeyValuePair
>>> client = Client(base_url='https://192.168.16.20')
>>> output = client.keys.get_all()
...<snip>
   raise ConnectionError(e)
requests.exceptions.ConnectionError: HTTPConnectionPool(host='192.168.16.20', port=9101): Max retries exceeded with url: /v1/keys (Caused by <class 'socket.error'>: [Errno 111] Connection refused)
```

Notice the port above? Yep, it’s running on defaults and assuming it’s running local to the ST2 base installation. We can assume safely here the core developers have taken care of this and have included a method on the class that allows us to pass in a URL for the API.

So how do we find out where this helper might be? After all, we’ve tried passing in ‘https’ in to the Client constructor which made no difference.

We could start with the help() function.

```bash
>>> help(client)
```

This was no help.

What about:

```bash
>>> help(client.keys)
```

Nope. We’re specifically looking for help on arguments we can pass to the Client() base class. The best place to look for that is the code itself.

```bash
>>> exit()
me@testvm:~$ pip show st2client
---
Name: st2client
Version: 2.2.0
Location: /usr/local/lib/python2.7/dist-packages
Requires: jsonpath-rw, prettytable, python-dateutil, pyyaml, requests, six
```

Ok, now we know where to look for our class. We’re specifically looking for information surrounding the client and something relating to an API end-point or URL.

```python
me@testvm:~$ cat /usr/local/lib/python2.7/dist-packages/st2client/client.py
# Licensed to the StackStorm, Inc ('StackStorm') under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import logging

import six

from st2client import models
from st2client.models.core import ResourceManager
from st2client.models.core import ActionAliasResourceManager
from st2client.models.core import LiveActionResourceManager
from st2client.models.core import TriggerInstanceResourceManager
from st2client.models.core import PackResourceManager
from st2client.models.core import ConfigManager
from st2client.models.core import StreamManager


LOG = logging.getLogger(__name__)

# Default values for the options not explicitly specified by the user
DEFAULT_API_PORT = 9101
DEFAULT_AUTH_PORT = 9100
DEFAULT_STREAM_PORT = 9102

DEFAULT_BASE_URL = 'http://127.0.0.1'
DEFAULT_API_VERSION = 'v1'


class Client(object):
    def __init__(self, base_url=None, auth_url=None, api_url=None, stream_url=None,
                 api_version=None, cacert=None, debug=False, token=None, api_key=None):
        # Get CLI options. If not given, then try to get it from the environment.
        self.endpoints = dict()

        # Populate the endpoints
        if base_url:
            self.endpoints['base'] = base_url
        else:
            self.endpoints['base'] = os.environ.get('ST2_BASE_URL', DEFAULT_BASE_URL)

        api_version = api_version or os.environ.get('ST2_API_VERSION', DEFAULT_API_VERSION)

        if api_url:
            self.endpoints['api'] = api_url
```

I’m going to hinge on ‘api_url’ as an argument we can pass to the client. Let’s give it a shot and see what happens. From the NGINX config, we know that ‘/api/’ has an entry and when we run ‘st2 –debug key list’, I can also see ‘/v1’ is used as part of the URL. The ST2 client itself is helpful in terms of telling us what’s where on the API, as it uses the API directly.

Putting this together, I’ll hazard a guess at ‘/api/v1’ being the correct path.

Back to our Python shell:

```python
me@testvm:~$ python
>>> from st2client.client import Client
>>> from st2client.models import KeyValuePair
>>> client = Client(api_url='https://192.168.16.20/api/v1')
>>> output = client.keys.get_all()
...<Traceback snip>
requests.exceptions.HTTPError: 401 Client Error: Unauthorized
MESSAGE: Unauthorized - One of Token or API key required.
```

Ok, we need to pass in an API key or a token! API keys are long lived and are quick and easy to test, instead of a token! Let’s generate an API key on the ST2 client and see what we need to pass in to the Client class.

```bash
user@st2:~$ st2 apikey create
+------------+--------------------------------------------------------------+
| Property   | Value                                                        |
+------------+--------------------------------------------------------------+
| id         | 58b40f0cc4da5f072866a1bc                                     |
| created_at | 2017-02-27T11:35:40.606623Z                                  |
| enabled    | True                                                         |
| key        | NjM0OTMzNzc4YzYyMjI1ZDliOWZjYTVmYjU3MWRlMGM5N2JlNDhkZDc0N2M1 |
|            | ZjNlNTFiYzE2MTE5NzhhYTJhYg                                   |
| metadata   |                                                              |
| uid        | api_key:0ac3e2e47360928159839a0b5dbf2685f22aac71b4f3b6127ccb |
|            | 2b5b4d08715dca9070cd13e20fd5de829534271c655f622eb85cbb3cf3f0 |
|            | 469da0f161e32072                                             |
| user       | st2admin                                                     |
+------------+--------------------------------------------------------------+
```

How do we pass the API key in to the Client? Let’s hack.

```bash
>>> dir(client)
['__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'actions', 'api_key', 'apikeys', 'cacert', 'debug', 'endpoints', 'keys', 'liveactions', 'managers', 'packs', 'policies', 'policytypes', 'ruleenforcements', 'rules', 'runners', 'sensors', 'token', 'tokens', 'trace', 'triggerinstances', 'triggertypes']
```

We can see here the ‘api_key’ field. We could assume that as a good practice the core devs will allow us to pass in key word (kwarg) argument to the base Client class, but let’s check.

```python
me@testvm:~$ cat /usr/local/lib/python2.7/dist-packages/st2client/client.py
# Licensed to the StackStorm, Inc ('StackStorm') under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import logging

import six

from st2client import models
from st2client.models.core import ResourceManager
from st2client.models.core import ActionAliasResourceManager
from st2client.models.core import LiveActionResourceManager
from st2client.models.core import TriggerInstanceResourceManager
from st2client.models.core import PackResourceManager
from st2client.models.core import ConfigManager
from st2client.models.core import StreamManager


LOG = logging.getLogger(__name__)

# Default values for the options not explicitly specified by the user
DEFAULT_API_PORT = 9101
DEFAULT_AUTH_PORT = 9100
DEFAULT_STREAM_PORT = 9102

DEFAULT_BASE_URL = 'http://127.0.0.1'
DEFAULT_API_VERSION = 'v1'


class Client(object):
    def __init__(self, base_url=None, auth_url=None, api_url=None, stream_url=None,
                 api_version=None, cacert=None, debug=False, token=None, api_key=None):
        # Get CLI options. If not given, then try to get it from the environment.
        self.endpoints = dict()

        # Populate the endpoints
...<snip>
        if api_key:
            os.environ['ST2_API_KEY'] = api_key

        self.api_key = api_key
```

Behold! It seems we can pass in the api_key as a key word argument, but it could also be set as an environmental variable. Let’s keep this simple and pass it in to the __init__ function.

```bash
>>> from st2client.client import Client
>>> from st2client.models import KeyValuePair
>>>
>>> client = Client(api_key=API_KEY, api_url='https://192.168.16.20/api/v1')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'API_KEY' is not defined
>>>
>>> API_KEY = 'NjM0OTMzNzc4YzYyMjI1ZDliOWZjYTVmYjU3MWRlMGM5N2JlNDhkZDc0N2M1ZjNlNTFiYzE2MTE5NzhhYTJhYg'
>>>
>>> client = Client(api_key=API_KEY, api_url='https://192.168.16.20/api/v1')
>>>
>>> client.keys.get_all()
[]
```

Seems to have worked. See the empty list? Let’s now create a key and test for it’s presence!

```bash
>>> client.keys.update(KeyValuePair(name='testkey', value='testvalue'))
<KeyValuePair name=testkey,value=testvalue>
>>> client.keys.get_all()
[<KeyValuePair name=testkey,value=testvalue>]
```

Success! The code below is a working proof-of-concept example of how to create and get keys and values over the ST2 REST API using the Python `st2client`.

This code does not involve any error checking. What would that look like? Let’s be a good citizen and screw up our known working code and add in a ‘try except’ block.

```bash
from st2client.client import Client
from st2client.models import KeyValuePair

API_KEY = 'NjM0OTMzNzc4YzYyMjI1ZDliOWZjYTVmYjU3MWRlMGM5N2JlNDhkZDc0N2M1ZjNlNTFiYzE2MTE5NzhhYTJhYg'

client = Client(api_key=API_KEY, api_url='https://192.168.16.20/api/v2000')

try:
    client.keys.get_all()
except Exception as e:
    exit(1)
```

From here, in your except block you could print a message, exit silently or perhaps even throw an event to StackStorm!

Working code from this hacking session below.

```python
from st2client.client import Client
from st2client.models import KeyValuePair

API_KEY = '<INSERT_YOUR_API_KEY_HERE>'
API_URL = '<https://192.168.16.20/api/v1>'

client = Client(api_url=API_URL, api_key=API_KEY)

try:
    client.keys.update(KeyValuePair(name='testkey', value='testvalue'))

    keys = client.keys.get_all()

    for k in keys:
        print "Key :" + str(k.name)
        print "Value: " + str(k.value)

except Exception as e:
    exit(1)
```

In this post we’ve exercised some basic Python skills in order to satisfy the set of light requirements. Hopefully for those of you wondering ‘how the hell do I begin this stuff?’, the logic in this post might help with your adventures!

Until the next time, have fun!