---
title: "Coding Basics: Python in Visual Studio"
date: 2015-01-26T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Coding Basics: Python in Visual Studio"
signoff: Dave
categories:
- Python On Windows
tags:
- Python On Windows
---

#### Python on Windows with Visual Studio

Whilst I’m an OSX and Linux fan, Windows is a key operating system in any enterprise and developing network applications in a Windows environment is also an important topic to cover off. Visual Studio (VS) is a Windows IDE (Integrated Development Environment) which will also soon be available for OSX (at the time of writing, it isn’t released). Whilst I’ve brushed over this previously, this post is a quick guide on how to setup a very easy to use environment to play with Python. This is not however an in depth tool chain guide. This is a 101 post but will be enough for most people to get to grips with Python who use Windows. Let’s face it, you don’t really want to be sitting on the command line doing this do you and Eclipse is not to everyone’s taste, especially if you have prior experience coding with .net for instance.

1. Install the free version of Microsoft’s Visual Studio found [here](http://visualstudio.com/)
2. Install Python 3.x (or 2.x depending on your reasons) found [here](https://www.python.org/downloads/)
3. Install the Python tools for Visual Studion found [here](https://pytools.codeplex.com/)

I install both Python 2.x and 3.x as you never know what modules you might need that are version dependent.

#### What about environment variables so I can call Python from the command prompt?

Personally, I don’t bother putting Python in my environment path because of one reason; virtualenv! Virtualenv’s are self contained installations of Python where you can install whatever packages you need to without trashing your default installation of Python. It means if you mess up, you can destroy your Python environment and rebuild without affecting any other project (so long as each project has it’s own virtualenv!). Check out [virtualenv here](http://virtualenv.readthedocs.org/en/latest/virtualenv.html).

Next up, start Visual Studio. If you’ve installed both versions of Python, the Codeplex Python plugin will ask you which your default environment is. I normally go with 2.7. Hit “Make Default” and you’re now into coding territory.

What about installing Python modules?

With Python, we regularly install modules that we need in our coding. If you’re not ready to start exploring virtualenv’s yet, then feel free to install modules as you need them in to your default installation using something like the below:

`C:\Python27\python -m pip install nxosNCRPC`

Then switch back to Visual Studio and you should be set. The Completion database within Visual Studio that allows intellisense (and auto completion) to operate will need to rebuild, but have some fun with it and play.

#### Other Information…

In addition to using Visual Studio due to company politics, it’s also worth getting familiar with VS as you can run Python byte code on the Microsoft CLR – or common language runtime – that means from Microsoft C# (.net) you could call Python code. You might want to do this if you’re using Python for scripting in a C# application. Interesting eh? If this piques your interest, Google for ‘Iron Python’ and take a read!

As a closing statement, this is a 101 post. Python on Windows is not magic and despite it being associated with *nix, it works just fine.