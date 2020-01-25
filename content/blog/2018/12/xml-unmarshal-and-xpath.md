---
title: "XML Unmarshal and XPath"
date: 2018-12-05T10:00:00+00:00
image: images/blog/arsonistgopherported.png
author: David Gee
description: "XML Unmarshal and XPath"
signoff: Dave
categories:
- Golang
tags:
- Golang
---

Battling with data structures is a normal daily task and figuring out the best way manipulate XML isn’t just a case of writing something that works and walking away declaring job done. I’m currently working on a piece of software that is extensible and each designer will know ahead of time what the structure of the data is and a driver/client will go and retrieve said XML. To help these engineers that may extend the software, my desire is to create a re-usable pattern and not leave it to chance.

#### Initial Approach

For every great idea, there is a terrible solution, a mad solution and quite possible one or more that will result in success. The best solution might come down to readability or execution speed if it’s important. As per common sense, there is no need to just aim for speed by default, if re-usability and readability is the game! Ideas that I came up with that I had to second guess would even work I immediately discarded. Other than a sense of morbid curiosity, it would only waste time and probably result in much frustration. Here’s what was left on the drawing board:

* XML XPath to search to the part of the XML payload I’m interested in.
* Use the , innerxml rule of the Go encoding XML package.
* Create an elongated XML struct.
* Create a compact XML struct using annotations.

My objective here is to find the tidiest solution for my scenario and make it so that any engineer can come along and add plugins with ease, harnessing the pattern uncovered in this post. Tidiest generally means without mess or having to think about it too hard. For the sakes of completion, I’ll also include some benchmarks at the end. Thanks to the type of application that’s being created (there are clues throughout this post but that’s down to you to figure out), speed isn’t a guiding factor when all of them complete in less than a second. For the sake of repetition, here is the XML I’m interested in parsing.

```plaintext
<configuration xmlns="http://xml.juniper.net/xnm/1.1/xnm" junos:changed-seconds="1328506003">
    <groups>
        <name>customerXY</name>
        <vlans>
            <vlan>
                <name>VLAN100</name>
                <description>Customer-XYZ-28-11-2018</description>
                <vlan-id>100</vlan-id>
            </vlan>
        </vlans>
    </groups>
</configuration>
```

#### Experiment One: XML XPath

In the automation world, it’s quite normal to query XML using XPath and my initial thought was that it might be a tidy solution here. After a quick hunt around I found a library that looked like it would do the job. The initial approach was to use a simple XPath query to find the XML I’m interested in and then extract it. That way, it’s easy to unmarshall on to a data structure. The inner `vlan` element is what I’m interested in so something like `//configuration/groups/vlans/vlan` should give a nice easy way to obtain the data. The second challenge will be then unmarshalling that data on to a struct instance. The code does this.

```plaintext
// VLAN1 struct
type VLAN struct {
    XMLName xml.Name `xml:"vlan"`
    Name    string   `xml:"name"`
    Desc    string   `xml:"description"`
    ID      string   `xml:"vlan-id"`
}

func main() {
        var r io.Reader
        r = strings.NewReader(data)

        root, err := xmlquery.Parse(r)
        if err != nil {
            panic(err)
        }
        var n *xmlquery.Node

        n = xmlquery.FindOne(root, "//configuration/groups/vlans/vlan")
        d := n.OutputXML(true)

        cfgData := VLAN{}
        err = xml.Unmarshal([]byte(d), &cfgData)
}
```

This works and I think also think reads quite well. Any approach mentioned in this post requires intimate knowledge of the XML data structure that is to be worked with. In this example, the simple XPath query steps into the `vlan` part of the data structure within this post.

Innerxml Rule
The innerxml rule of the Go XML encoding/decoding package states: If the struct has a field of type []byte or string with tag “,innerxml”, Unmarshal accumulates the raw XML nested inside the element in that field.

Interesting rule and would allow the client interface to get the XML to remain the same for each and every call, returning the raw and unknown nested XML. One minor issue with this I discovered was if there aren’t any outer elements, the XML isn’t unmarshaled. For instance if I created a struct that ripped off the configuration and groups elements, I’m left with raw XML that has a `name` element and `vlans`. I couldn’t figure out how to make this work given all examples I’ve seen rely on an outer element being opened and closed.

I walked away from this idea, declaring defeat. I’ll pin it on the “one to look out for” Trello board. Just to note, I could retrieve the innerxml as per the library notes, but could not unmarshall. This is what that data looks like:

```plaintext
        <name>customerXY</name>
        <vlans>
            <vlan>
                <name>VLAN100</name>
                <description>Customer-XYZ-28-11-2018</description>
                <vlan-id>100</vlan-id>
            </vlan>
        </vlans>
```

#### Elongated XML Struct

In the effort engineer ease, I thought this was lacking:

```plaintext
type VLANStruct struct {
    XMLName xml.Name `xml:"configuration"`
    Groups  struct {
        XMLName xml.Name `xml:"groups"`
        VLANS   struct {
            XMLName xml.Name `xml:"vlans"`
            VLAN    struct {
                XMLName xml.Name `xml:"vlan"`
                Name    string   `xml:"name"`
                Desc    string   `xml:"description"`
                ID      string   `xml:"vlan-id"`
            }
        }
    }
}
```

It’s structured and some of it feels like it doesn’t belong, even though it does. This is a “feelings” conversation. It didn’t feel right and felt bloated. However, it works.

### Compact XML Struct

This version is a more compact version of the previous attempt. It feels less bloated but covers the same data structure. The important thing to remember here is the nested struct formation and ensuring the bottom tag accurately reflects the data structure. You could view this as synonymous to XML XPath! We’re effectively stepping in to the data we’re actually interested in being able to have in our struct.

```golang
type VLAN struct {
	XMLName xml.Name `xml:"configuration"`
	VLAN    struct {
		XMLName xml.Name `xml:"vlan"`
		Name    string   `xml:"name"`
		Desc    string   `xml:"description"`
		ID      string   `xml:"vlan-id"`
	} `xml:"groups>vlans>vlan"`
}

func main() {
	cfgData := VLAN{}

    err := xml.Unmarshal([]byte(data), &cfgData)

    if err != nil {
		fmt.Print(err)
	}

    fmt.Printf("%+v\n", cfgData)
}
```

This is super simple, compact and works well.

#### Decision Time

The aim of this post was to share research in choosing a pattern to do the XML unmarshalling with. I ended up picking the compact struct method because there is a lower surface area of code changes required to make a new plugin. I found both XPath and the compact struct to be as readable and curiosity got the better of me around execution speed. I had a healthy hunch that the xpath would take longer, but wasn’t sure how long. Here are the results between the compact struct and the xpath based approach. These benchmarks were ran from code [here](https://gist.github.com/arsonistgopher/1a9ea2de11c8ac4f2ee3a2ba46a23d86).

```plaintext
go test -bench=. -benchtime=10s
goos: linux
goarch: amd64
pkg: github.com/arsonistgopher/tests/XML_Marshalling/Tests
Benchmark1-12             500000             23522 ns/op
Benchmark2-12            1000000             14343 ns/op
PASS
ok      github.com/arsonistgopher/tests/XML_Marshalling/Tests   26.512s
```

So there we have it. The compact route is much quicker too! Speed isn’t important for this particular project, but it’s good to see benchmarks.