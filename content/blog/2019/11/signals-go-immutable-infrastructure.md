---
title: "Signals, Go & Immutable Infrastructure"
date: 2019-11-23T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Signals, Go & Immutable Infrastructure"
signoff: Dave
categories:
- Golang
tags:
- Golang
---

![gopher](/images/blog/arsonistgopher_small.png#center)

From the days of old, setting fire to a large torch would signal to a neighbouring town something was going on. On the Great Wall in China, reports of signals reaching some 470 miles can be read on [Wikipedia!](https://en.wikipedia.org/wiki/Smoke_signal). Back to the future and modern day times, signals are transmitted and received as part of every application we touch. Signals underpin a system’s communications, irrelevant of what that system is. Software gives off many signals of a wide variety in normal operations and through signal correlation, we can yield useful events. Signals can also be used to achieve an outcome in a remote system as well as direct application API calls.

Being a fan of systems that have a natural synergy to them, I also look for ways to tie application functionality into natural system interactions.

For this post, I want to talk about the separation of concerns between an application’s functionality via it’s primary operational interface, likely an API of some sort, versus the application’s operational configuration, which allows it start on the correct TCP/IP port and consume the correct credential information.

Why not just get the application to refresh its configuration through the operational interface? The best way I can explain this would be akin to trying to chop ones axe wielding arm off whilst attempting to chop off the branch of the tree you’re sitting on with said arm.

#### Usable Signals
 
Whether an application is hosted in a Docker container or on an operating system directly, we can consume signals emitted from the kernel towards our application to achieve some operational tasks. Information below is relevant for Unix, Linux and OSX.

__SIGKILL__

We can intercept this signal and have our application code exit gracefully and safely. It doesn’t have to be a panic situation if we need to exit. If the application doesn’t exit on a `SIGKILL`, then it can be forcibly exited with `kill -9` being initiated from the operating system.

__SIGINT__

This signal interrupts a process, typically by `Ctrl+C`, `break` or `delete`.

__SIGHUP__

This signal is from the days of modem connectivity and represents a “Signal Hung-up” from the network. It can also be used to tell an application to reload its configuration as well as the controlling terminal has been closed.

__SIGUSR1, SIGUSR2__

These are custom signals and there are no recommended uses for them. If you use these signals, ensure that usage is documented in your code and user documentation.

__SENDING THE SIGNAL__
It’s a little disconcerting perhaps that in order to transmit your desired signal, the ‘kill’ application is used.

1. Get the process ID (PID) of the target application. If your application doesn’t store it’s PID in a file, then you can use the traditional methods to find the PID like using ps.

2. Once you have the PID, you can use kill --signal SIGHUP $PID to send the signal, in this case, it sends SIGHUP.

#### SO HOW DO WE INTERCEPT THE SIGNAL?

The example code I am using here is readily available from the [https://gobyexample.com](https://gobyexample.com/signals) website.

```golang
package main

import (
	"fmt"
	"os"
	"os/signal"
	"sync"
	"syscall"
)

func main() {

	sigs := make(chan os.Signal, 1)

	signal.Notify(sigs)

	wg := sync.WaitGroup{}
	wg.Add(1)

	go func(wg *sync.WaitGroup) {
		for {
			sig := <-sigs

			if sig == syscall.SIGINT {
				fmt.Println("Received SIGINT, exiting")
				wg.Done()
				break
			} else {
				fmt.Println("Received: " + sig.String())
			}
		}
	}(&wg)

	fmt.Printf("PID is: %d\n", os.Getpid())
	fmt.Println("Awaiting signal...")
	wg.Wait()
	fmt.Println("Exiting()")
}
```

*I edited this code just shortly after publishing to be idiomatic with regards to sync and WaitGroups. Without a significant hall-pass, it was just a bad display of an example.*

Next, compile the code and invoke it. The output below is from the sample application.

```bash
 $ go build
 $ ./signals
PID is: 4440
Awaiting signal...
Received: user defined signal 1
Received: hangup
^CReceived S
```

Output below is from a bash terminal where I sent signals to the application.

```bash
# Check for the available signals
$ kill -l
HUP INT QUIT ILL TRAP ABRT BUS FPE KILL USR1 SEGV USR2 PIPE ALRM TERM 16 CHLD CONT STOP TSTP TTIN TTOU URG XCPU XFSZ VTALRM PROF WINCH POLL 30 SYS
 
 $ kill -s USR1 4440
 $ kill -s HUP 4440 
```

#### Close

I hope this post was useful and despite it seeming kind of obvious, it’s a really useful pattern to embrace for your run-time configuration. With regards to immutable infrastructure, it could seem an anti-pattern, but being able to update the configuration of one container or service without restarting it potentially with much wider disruption, it feels like a nice capability instead of an anti one.