---
title: "Custom Python Packages With PyPi For Networking Peoples"
date: 2014-11-16T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Custom Python Packages With PyPi For Networking Peoples"
signoff: Dave
categories:
- Python
tags:
- Python
---

![pypi](/images/blog/pypi.jpg#center)

Quite frequently I write and build code to control and harvest data from network infrastructure. Whether it’s writing modules for a stack automation tool like Ansible or writing modules for run to completion scripts, code is often spawned to meet requirements. Sometimes this code is more than a little complex with many dependencies. In addition, sometimes code is written to extend an existing module, like the Python NetConf library NCClient. This happened recently for example when the NCClient library failed to meet expectations.

Two options exist for complicated projects from an arbitrary point of view:

1. Include all of the dependencies in a directory and provide everything including the kitchen sink to allow your code to function as per design.
2. Create an installable which takes care of all dependencies.

With Python, option 2. is an interesting one that I’ve never previously thought about doing.

Information for this post and my initial requirement came from these two sources which were most helpful:

[http://www.scotttorborg.com/python-packaging/minimal.html](http://www.scotttorborg.com/python-packaging/minimal.html)
[http://peterdowns.com/posts/first-time-with-pypi.html](http://peterdowns.com/posts/first-time-with-pypi.html)

#### PyPi Introduction

How many times have you installed a module using something like
`sudo pip install 'blah'` without really wondering what the repository is that hosts the code for you to just automagically install it?

[PyPi](http://pypi.python.org/) is a hosted package index that anyone can setup an account on for free, which ultimately helps you deliver your code in a nice installable. Matt Oswalt ([@Mierdin](http://twitter.com/mierdin)) via Twitter queried layer eight issues, of which there are non. No membership, no costs, it’s just down to you to create something that works and accept it’s a widely used system for indexing packages. It’s a little more complex than just creating an account however and this post covers off where to get started and what worked for me including some lessons learnt.

Finally, there is also a test PyPi repository for you to run tests against and explore with which is found [here](http://testpypi.python.org/). The ability to test against something which gets wiped from time to time is great as it means you can bash away without worrying about clearing up your learning aftermath! Whilst I recommend you use the testpypi repo, this blog post does not use it for testing as this is a very simple example. Technically, the run through is identical baring the use of testpypi instead of the production pypi index.

#### Project Structure

For a project to be made in to an installable and eventually uploaded to PyPi, a structure needs to be applied to your project directories which includes a `setup.py` file amongst other things. Using a real example, let’s take my project “ipngxmlr2d”. This project uses `libxml` and returns a dictionary of child element rows, with a custom ingress point to a given XML tree. Please note too that this article was written with Mac users in mind, but should work for Windows users in a round about way. The file structure is shown below. Note that the actual code is in the `__init__.py` file and not shown for the purpose of brevity. The file structure in itself is quite prescriptive and it is wise not to deviate from the pattern found in the two articles linked to at the beginning of this blog post.

![Init_Tree](/images/blog/Init_Tree.png#center)

For anyone who’s familiar with Eclipse, you’ll notice that the directory is also a .git repository. This article does not go in to git, but git is a snapshot system that allows you to check files in and out. It is at a high level a popular version control system. Not this:

![git](/images/blog/git.png#center)

In addition, this project is on GitHub located [here](http://github.com/davidjohngee/ipngxr2d). Also if you’re not sharing code, then shame on you! Get yourself an account at [https://github.com](https://github.com/) right now! Not only is it good to share, by welcoming the criticism of your peers, you can only get better at this!

Here is the content of the `setup.py` file.

```python
# Copyright 2014 David Gee (@davidjohngee)

from setuptools import setup, find_packages
from distutils.command.install import install as _install

import sys
import platform

if not sys.version_info[0] == 2:
    print "Sorry, Python 3 is not supported (yet)"
    exit()

if sys.version_info[0] == 2 and sys.version_info[1] &lt; 6:
    print "Sorry, Python &lt; 2.6 is not supported"
    exit()

setup(name='ipngxr2d',
      version='0.1',
      description="Python XML parsing utility returning dictionary of children (uses lxml)",
      long_description = "Python XML utility for returning a dictionary of dictionaries from XML children.",
      author="David Gee",
      author_email="david.gee@ipengineer.net",
      url="https://github.com/DavidJohnGee/ipngxr2d",
      packages=find_packages('.'),
      license="Apache License 2.0",
      platforms=["Posix; OS X; Windows"],
      keywords=('XML Parser'),
      classifiers=[
          'Development Status :: 5 - Production/Stable',
          'Programming Language :: Python :: 2.6',
          'Programming Language :: Python :: 2.7',
          'Topic :: System :: Networking',
          'Intended Audience :: Developers',
          'Operating System :: OS Independent',
          'Topic :: Software Development :: Libraries :: Python Modules',
      ]
      )
```

Before building a package and registering it against PyPi, let’s make sure this code is usable locally.

#### Local Test

From the directory of the project, I ran the following bash command to generate the build and install locally in to my Python install directory.

```bash
Davids-MacBook-Pro-2:ipngxr2d davidgee$ sudo python setup.py install
```

The output looked like:

```bash
running install
Checking .pth file support in /Library/Python/2.7/site-packages/
/usr/bin/python -E -c pass
TEST PASSED: /Library/Python/2.7/site-packages/ appears to support .pth files
running bdist_egg
running egg_info
creating ipngxr2d.egg-info
writing ipngxr2d.egg-info/PKG-INFO
writing top-level names to ipngxr2d.egg-info/top_level.txt
writing dependency_links to ipngxr2d.egg-info/dependency_links.txt
writing manifest file 'ipngxr2d.egg-info/SOURCES.txt'
reading manifest file 'ipngxr2d.egg-info/SOURCES.txt'
writing manifest file 'ipngxr2d.egg-info/SOURCES.txt'
installing library code to build/bdist.macosx-10.9-intel/egg
running install_lib
running build_py
creating build
creating build/lib
creating build/lib/ipngxr2d
copying ipngxr2d/__init__.py -> build/lib/ipngxr2d
creating build/bdist.macosx-10.9-intel
creating build/bdist.macosx-10.9-intel/egg
creating build/bdist.macosx-10.9-intel/egg/ipngxr2d
copying build/lib/ipngxr2d/__init__.py -> build/bdist.macosx-10.9-intel/egg/ipngxr2d
byte-compiling build/bdist.macosx-10.9-intel/egg/ipngxr2d/__init__.py to __init__.pyc
creating build/bdist.macosx-10.9-intel/egg/EGG-INFO
copying ipngxr2d.egg-info/PKG-INFO -> build/bdist.macosx-10.9-intel/egg/EGG-INFO
copying ipngxr2d.egg-info/SOURCES.txt -> build/bdist.macosx-10.9-intel/egg/EGG-INFO
copying ipngxr2d.egg-info/dependency_links.txt -> build/bdist.macosx-10.9-intel/egg/EGG-INFO
copying ipngxr2d.egg-info/top_level.txt -> build/bdist.macosx-10.9-intel/egg/EGG-INFO
zip_safe flag not set; analyzing archive contents...
creating dist
creating 'dist/ipngxr2d-0.1-py2.7.egg' and adding 'build/bdist.macosx-10.9-intel/egg' to it
removing 'build/bdist.macosx-10.9-intel/egg' (and everything under it)
Processing ipngxr2d-0.1-py2.7.egg
Removing /Library/Python/2.7/site-packages/ipngxr2d-0.1-py2.7.egg
Copying ipngxr2d-0.1-py2.7.egg to /Library/Python/2.7/site-packages
ipngxr2d 0.1 is already the active version in easy-install.pth

Installed /Library/Python/2.7/site-packages/ipngxr2d-0.1-py2.7.egg
Processing dependencies for ipngxr2d==0.1
Finished processing dependencies for ipngxr2d==0.1&
```

Now the tree in Eclipse looks like below after the build process.

![Post_Build_Tree](/images/blog/Post_Build_Tree.png#center)

At this point, I will see if I can use the code as part of a simple test. See below!

```python
from ipngxr2d import *

test_data = """
<stuff>
    <data>blah</data>
        <child>
            <name>Dave</name>
            <mood>relaxed</mood>
            <modifier>+1 sarcasm</modifier>
        </child>
        <child>
            <name>Alternate Dave</name>
            <hero>Spider Man</hero>
        </child>
</stuff>       
"""
#----------------- MAIN ENTRY POINT ---------------
if __name__ == '__main__':

# Create Dictionary ready for output
table_result = {}

# Using our test data, send the data and the TABLE_ENTRY_POINT and ROW_ENTRY_POINT to 'return_table(data, TABLE_FORMAT, ROW_FORMAT)'
table_result = return_table(test_data,"data", "blah", "child")

print "TEST 1"
for each in table_result:
print table_result[each]
```

And the result?

```bash
TEST 1
{'modifier': '+1 sarcasm', 'name': 'Dave', 'mood': 'relaxed'}
{'hero': 'Spider Man', 'name': 'Alternate Dave'}
```

Cool! So the package code works and the sample code too. The next step is to get this on to PyPi. Make sure that GitHub is up to date at this point too.

Loading the package to PyPi
From the working directory where the root of ipngxr2d is located, I ran the following command:

```bash
Davids-MacBook-Pro-2:ipngxr2d davidgee$ python setup.py register
```

The output looked like below. It’s worth mentioning at this point I already have an account registered with pypi.python.org and my credentials are stored. If you have followed the two links in the first paragraph of this blog post, then you should be set and non of this should be a surprise.

```bash
running register
Davids-MacBook-Pro-2:ipngxr2d davidgee$ sudo python setup.py register
running register
running egg_info
writing ipngxr2d.egg-info/PKG-INFO
writing top-level names to ipngxr2d.egg-info/top_level.txt
writing dependency_links to ipngxr2d.egg-info/dependency_links.txt
reading manifest file 'ipngxr2d.egg-info/SOURCES.txt'
writing manifest file 'ipngxr2d.egg-info/SOURCES.txt'
running check
Registering ipngxr2d to http://pypi.python.org/pypi
Server response (200): OK
```

The next step is to create the source distribution and upload.

```bash
Davids-MacBook-Pro-2:ipngxr2d davidgee$ sudo python setup.py sdist upload
running sdist
running egg_info
writing ipngxr2d.egg-info/PKG-INFO
writing top-level names to ipngxr2d.egg-info/top_level.txt
writing dependency_links to ipngxr2d.egg-info/dependency_links.txt
reading manifest file 'ipngxr2d.egg-info/SOURCES.txt'
writing manifest file 'ipngxr2d.egg-info/SOURCES.txt'
warning: sdist: standard file not found: should have one of README, README.rst, README.txt

running check
creating ipngxr2d-0.1
creating ipngxr2d-0.1/ipngxr2d
creating ipngxr2d-0.1/ipngxr2d.egg-info
making hard links in ipngxr2d-0.1...
hard linking setup.py -> ipngxr2d-0.1
hard linking ipngxr2d/__init__.py -> ipngxr2d-0.1/ipngxr2d
hard linking ipngxr2d.egg-info/PKG-INFO -> ipngxr2d-0.1/ipngxr2d.egg-info
hard linking ipngxr2d.egg-info/SOURCES.txt -> ipngxr2d-0.1/ipngxr2d.egg-info
hard linking ipngxr2d.egg-info/dependency_links.txt -> ipngxr2d-0.1/ipngxr2d.egg-info
hard linking ipngxr2d.egg-info/top_level.txt -> ipngxr2d-0.1/ipngxr2d.egg-info
Writing ipngxr2d-0.1/setup.cfg
Creating tar archive
removing 'ipngxr2d-0.1' (and everything under it)
running upload
Submitting dist/ipngxr2d-0.1.tar.gz to http://pypi.python.org/pypi
Server response (200): OK
```

So far so good! Let’s check my PyPi account found [here](http://pypi.python.org/). Obviously you will need to sign in with your own credentials as you can’t have mine 🙂

![pypi-1024x497](/images/blog/pypi-1024x497.png#center)

Voila! The package is there and listed. The next step is for me to remove the locally installed one, install from PyPi using `pip` and test once more.

```bash
Davids-MacBook-Pro-2:ipngxr2d davidgee$ sudo pip uninstall ipngxr2d
Uninstalling ipngxr2d:
  /Library/Python/2.7/site-packages/ipngxr2d-0.1-py2.7.egg
Proceed (y/n)? y
  Successfully uninstalled ipngxr2d
Davids-MacBook-Pro-2:ipngxr2d davidgee$ sudo pip install ipngxr2d
Downloading/unpacking ipngxr2d
  Downloading ipngxr2d-0.1.tar.gz
  Running setup.py (path:/private/tmp/pip_build_root/ipngxr2d/setup.py) egg_info for package ipngxr2d
    
Installing collected packages: ipngxr2d
  Running setup.py install for ipngxr2d
    
Successfully installed ipngxr2d
Cleaning up...
```

And for the test in Eclipse to make sure the test code still works…

![test-1024x820](/images/blog/test-1024x820.png#center)

Awesome. It works. Interestingly, I did this in a live sense. The package ipngxr2d wasn’t on PyPi before this post and I’m happy to say I ate my own dog food. Rock on.


