---
title: "Linux Systemd & Golang Services using Kardianos Service"
date: 2017-03-15T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Linux Systemd & Golang Services using Kardianos Service"
signoff: Dave
categories:
- Linux
- Go
- Processes
tags:
- Linux
- Go
- Processes
---

![Gopher](/images/blog/gopher.png#center)

This week I have done something new, but I found myself dealing with a ‘zero knowledge’ situation or something I like to call ZKS. This is one of those ones where it’s fun, but it also feels a bit stressy as there was enough rope to hang myself with.

That something new is Systemd, which is a Linux operating system thing that manages the initialisation of user things. To speak about this more technically, it is a drop in replacement ‘init’ system that starts services and sets up the user environment. Wikipedia has this to say about it:

> Systemd is an init system used in Linux distributions to bootstrap the user space and manage all processes

For those lacking [historic knowledge](http://www.zdnet.com/article/linus-torvalds-and-others-on-linuxs-systemd/) around systemd, it previously many upset devs and administrators, which in turn setup a site called ‘boycottsystemd’ which looks to be offline. They said it flies in the face of doing it the Unix way, which is (to summarise) do one thing and do it well. Systemd is now the default init system for Ubuntu 15x and newer releases. Can’t be that bad…right?

Whilst this is not a complete education around systemd, it’s popular and is reasonably easy to understand from a ‘getting things done’ aspect. This article is targeted at networking people and here’s the odd thing about networking, we rarely have to worry about how services start on the operating systems we’ve used for years. Cisco IOS, JunOS, NOS, whatever, they all start services for us and have never had to run about it. Linux provides us with fun like this as the power is in our hands. We can start services in whatever state or target state the underlying operating system is in. We can add services ourselves, destroy services and generally we have the power to cause utter chaos. However, don’t be scared. Like anything tech, be foolish and get bitten. Do the right thing or at least try and most people will forgive you for the odd error here and there.

#### Fun Of The Circus

The crux of this story begins here. I’ve been building a pack for StackStorm which allows users to create rules for regular expression pattern matching on syslogs sent to a special syslog collector I’ve written in Go. It’s very ‘alpha’ at the minute and the source code is not open sourced for the Golang part. The ST2 pack (with binaries) is available here:

[https://github.com/DavidJohnGee/ghost2loggeralpha](https://github.com/DavidJohnGee/ghost2loggeralpha)

Also see the video:

{{<youtube JnxoNuIs2hE>}}

The Golang code might be open sourced one day and it needs tidying from an aesthetic point of view, but it works and is efficient at what it does. Like most things Golang, I use channels and go routines quite heavily. Also I spit out logs via Stdout and via a log file for easy debugging of issues as and when they come up, plus getting a general feel to ensure that things are running smoothly. This causes other issues though as if I try to run this in the background, the Stdout messages (i.e. fmt.Print) pop out on the terminal.

My first attempt at releasing a Go binary to use a service was just a dumb console application which I ran in ‘screen’. Screen allows you to start an application in the foreground and then detach, leaving it running in the ‘back ground’. During writing this ‘service’ I also experienced a few high cpu bugs where something wasn’t yielding properly, which lead me down a rat maze. If the app ran in the foreground, everything was fine. If it ran in the background, CPU rocketed to 90%+. A little strange initially, but I found the problems and mended them. Much late night head scratching.

When I posted the Ghost2logger YouTube video, Irek Romaniuk got in touch about the pack and also made me aware of something I previously wasn’t. That thing is a project by GitHub user Kardianos called [service](https://github.com/kardianos/service). Turns out it solved my requirement to create a service that systemd can handle as well as still being able run in the foreground. Superb! It also handles MacOS (Darwin), Linux and Windows. One of my difficulties is I develop on OSX and cross compile for Linux. Can you see the circus now? Thanks as well to [William Kennedy](http://ipengineer.net/2017/03/linux-systemd-golang-services-using-kardianos-service/) for writing this post: [https://www.goinggo.net/2013/06/running-go-programs-as-background.html](https://www.goinggo.net/2013/06/running-go-programs-as-background.html) This was also recommended reading by Irek and proved to be both an excellent knowledge dump and educational.

Starting off quite simply with [this](https://github.com/kardianos/service/blob/master/example/simple/main.go) example file, I was able to port my code to ‘service’ with ease. I always launch go routines in main() (we all have our habits), so converting my code was a breeze. Almost drag and drop! I had to do a little more wiring like passing in my `svcConfig` into the `program{}` struct, but it works a treat. This service project also allows me to run run either in service mode or foreground mode. It’s the gift that keeps on giving!

```go
// Copyright 2015 Daniel Theophanes.
// Use of this source code is governed by a zlib-style
// license that can be found in the LICENSE file.

// simple does nothing except block while running the service.
package main

import (
    "log"

    "github.com/kardianos/service"
)

var logger service.Logger

type program struct{}

func (p *program) Start(s service.Service) error {
    // Start should not block. Do the actual work async.
    go p.run()
    return nil
}
func (p *program) run() {
    // Do work here
}
func (p *program) Stop(s service.Service) error {
    // Stop should not block. Return with a few seconds.
    return nil
}

func main() {
    svcConfig := &amp;service.Config{
        Name:        &quot;GoServiceExampleSimple&quot;,
        DisplayName: &quot;Go Service Example&quot;,
        Description: &quot;This is an example Go service.&quot;,
    }

    prg := &amp;program{}
    s, err := service.New(prg, svcConfig)
    if err != nil {
        log.Fatal(err)
    }
    logger, err = s.Logger(nil)
    if err != nil {
        log.Fatal(err)
    }
    err = s.Run()
    if err != nil {
        logger.Error(err)
    }
}
```

Finally, I created (well, stole from another service to be blunt) [this service file](https://github.com/DavidJohnGee/ghost2loggeralpha/blob/master/sensors/ghost2logger.service) for ghost2logger.

```plaintext
[Unit]
Description=Ghost2logger Service for ST2
Documentation=https://github.com/DavidJohnGee/ghost2logger

[Service]
Type=simple
ExecStart=/opt/stackstorm/packs/ghost2logger/sensors/ghost2logger-linux-x64-alpha-service
StandardOutput=null
Restart=on-failure

[Install]
WantedBy=multi-user.target
Alias=ghost2logger.service
```

#### Want To Test?

Download the ST2 pack using the below. You will also need to generate an st2-api-key and place it in the pack config file.

```bash
st2 pack install github.com/DavidJohnGee/ghost2loggeralpha
```

Copy the service file to systemd

```bash
ghost2logger.service file to /etc/systemd/system/
```

Start the service

```bash
systemctl start ghost2logger.service
```

Voila. From here you can check that ghost2logger is working by issuing the ss command below. First you need to get the PID of our running service. We can get this from systemctl.

```bash
ubuntu@st2vagrant:/opt/stackstorm/packs/ghost2logger/sensors$ systemctl status ghost2logger.service
● ghost2logger.service - Ghost2logger Service for ST2
   Loaded: loaded (/etc/systemd/system/ghost2logger.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2017-03-15 12:14:22 UTC; 2h 2min ago
     Docs: https://github.com/DavidJohnGee/ghost2logger
 Main PID: 18789 (ghost2logger-li)
    Tasks: 7
   Memory: 1.6M
      CPU: 439ms
   CGroup: /system.slice/ghost2logger.service
           └─18789 /opt/stackstorm/packs/ghost2logger/sensors/ghost2logger-linux-x64-alpha-service

Mar 15 12:14:22 st2vagrant systemd[1]: Started Ghost2logger Service for ST2.
Mar 15 12:14:22 st2vagrant Ghost2logger[18789]: Starting Ghost2logger

ubuntu@st2vagrant:/opt/stackstorm/packs/ghost2logger/sensors$ sudo ss -nlp | grep 18789
u_dgr  UNCONN     0      0         * 1116380               * 8995                users:(("ghost2logger-li",pid=18789,fd=5))
udp    UNCONN     0      0        :::514                  :::*                   users:(("ghost2logger-li",pid=18789,fd=8))
tcp    LISTEN     0      128      :::12023                :::*                   users:(("ghost2logger-li",pid=18789,fd=7))
```

#### Journal, Journald, Journalctl & Logging

We’ve not covered logging yet, which is excellent on Systemd based machines. If you use the logger implementation that Kardianos himself has provided, it logs to the Systemd journal system. Journald is the daemon that deals with the actual logging and ‘journalctl’ is the tool we can use to grab our logs! I’ve built a function which aggregates all informational logging in Ghost2logger, so whether it’s running in the foreground or as a service, logs make it somewhere. When we run Ghost2logger as a systemd service, logs hit the journal. We can find those logs by running this command:

```bash
journalctl -f -u ghost2logger.service
```

-f gives us the most recent
-u is the systemd unit, in our case, the ghost2logger.service unit.

#### Show Me Some Useful Systemd Stuff

These are the bash commands I found helpful whilst figuring out the basics of Systemd, where”x” is the name of your service.
Mask and unmask (the only non self-explanatory arguments) prevent the service from starting on boot and allow it to start on boot.
I did find a reference to enable and disable, but they were not accepted on my version, so have purposefully left them off the list below.

```bash
systemctl status x.service
systemctl start x.service
systemctl stop x.service
systemctl restart x.service
systemctl reload x.service
systemctl mask x.service
systemctl unmask x.service
systemctl list-unit-files –type=service
```

#### Sources of Info You Might Find Useful

* [https://www.howtogeek.com/216454/how-to-manage-systemd-services-on-a-linux-system/]()

* [https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units)

* [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sect-Managing_Services_with_systemd-Unit_Files.html](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sect-Managing_Services_with_systemd-Unit_Files.html)

* [http://www.devdungeon.com/content/creating-systemd-service-files](http://www.devdungeon.com/content/creating-systemd-service-files)

* [https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)

Thanks and happy hacking.


