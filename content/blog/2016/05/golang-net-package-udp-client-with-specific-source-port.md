---
title: "Golang net package: UDP Client with Specific Source Port"
date: 2016-05-23T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Golang net package: UDP Client with Specific Source Port"
signoff: Dave
categories:
- Golang
tags:
- Golang
---

![gophercloud](/images/blog/gophercloud.png#center)

Well you found it if you were looking for it. If you are using the Golang net package and need to set a specific source port for the UDP or TCP dial functions, then look no further. Why might you want to control your source port and not leave it to random selection in the range of 1024-65535? Some server software might be hardwired to listen to communications coming from a specific source port and might not respond to packets originating from any other source port on a client. With the IoT world growing rapidly, this issue bit me recently and I didn’t figure it out immediately. Maybe it’s my old school brain not being down with the kids. Who knows. Solved it in the end, so sharing here to help you!

#### It was late on a Saturday night

Pizza had been eaten. Pepsi was being consumed. A crazy Saturday evening one would say. Alas, a friend and I had decoded the communications of an IoT device and wanted to write some better client software. The software client happened to carry out discovery using a specific source port destined to the same port, then when the mode changed from discovery to control, the remote port changed but the source port did not. “Easy right, just bind to a port”. Translation in to Golang? Much head scratching.

#### The Golang Way

So after hunting through the documentation, I ended up posting to the excellent go-nuts list only to solve the issue within about 20 minutes myself. 

Using the Golang net package, actually doing this was fairly trivial and not as I feared, did I have to do raw socket handling. What threw me off was a brain misfire and looking back now it should have been obvious.

#### There is only do, do not assume

Parameters passed to the net UDP Dial function (see below) include laddr and raddr. As with all hardware hacking sessions, the absolute minimum work is put in to making something work. After all, it’s about speed. Some examples of UDPDial were read and with great confidence I wrote the code needed for IoT endpoint discovery. 

![Golang net UDP dial](/images/blog/go_net_dial.png#center) 

Immediately dismissing laddr with the thought “Great, I can bind to a local address. That doesn’t solve it” prevented me from actually looking at laddr, which would have solved my problem in seconds. Turns out laddr also lets you bind to a local port as well as pick a local address. D’oh.

Here’s how:

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net"
)

func main() {

	LocalAddr, err := net.ResolveUDPAddr("udp", "<source_int>:50000")

	RemoteEP := net.UDPAddr{IP: net.ParseIP("<dest>"), Port: 50000}

	conn, err := net.DialUDP("udp", LocalAddr, &RemoteEP)

	if err != nil {
        // handle error
	}

    // fmt.FprintF Invokes the conn.Write() method and converts the string to a byte slice
	fmt.Fprintf(conn, "message\r")

	defer conn.Close()
	fmt.Println(ioutil.ReadAll(conn))

	return
}
```

Both laddr and raddr are type UDPAddr struct, which means both have port fields and the library happens to use it to set the source port. Here is the struct so you can see for yourself:

```go
UDPAddr struct {
        IP   IP
        Port int
        Zone string // IPv6 scoped addressing zone
}
```

#### Close

The Golang net package is actually quite feature rich and does most of what any of us could ask for out of the box. Although this was a leisure project, it still wasted an hour of time that could have been dealt with in seconds if I would have just RTFM. 

Check out the Golang net package documentation for more [info](https://golang.org/pkg/net/).