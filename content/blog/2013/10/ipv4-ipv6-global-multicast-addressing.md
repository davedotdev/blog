---
title: "IPv4 and IPv6 Global Multicast Addressing"
date: 2013-10-15T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Global Multicast Addressing: IPv4 and IPv6"
signoff: Dave
---

This is a short post covering globally unique multicast IP addresses for both IPv4 and IPv6; this does not cover IGMP, MLD, PIM, BGP-MP, MSDP or any other MC technology other than global addressing. Whole books are dedicated to multicast so I’ll try and keep this focussed!

Multicast is often misunderstood and can be an uphill battle for those who are fresh to the technology. There can be quite a few moving parts to a multicast deployment, all of which are covered by the network friendly “it depends” statement.

March 1992 the MBone appeared on the internet, the Multicast Internet Backbone which used an application called SDR (Session DiRectory tool) to view what sessions were underway. Many multicast sessions were enjoyed across the infantile backbone, including live concerts by The Rolling Stones, NASA space walks and web broadcasts such as NANOG meetings.

The MBone was in fact not a physically disparate network, but one of the first network overlays that provided tunnels between different networks to transit multicast packets. The MBone is forgot about these days, however, there are IXPs globally such as LINX that have a separate peering multicast platform for Autonomous Systems (ASes) enable inter-AS multicast connectivity. Most ISPs limit intra-AS multicast to their own set of services such as cable TV, or on demand films, so don’t expect much joy on that front. Next generation multicast VPNs (i.e. MPLS L3 VPN supporting MC) are also sold as a premium service by ISPs, so they’re not going to give this stuff away for free J

Multicast is one of those things that crops up every now and then, so it’s always worth holding on to the knowledge and expanding it. Also with overlay networking becoming so prevalent, most of the technology gets released with multicast requirements first, with unicast lagging by a release or so. I still think there’s life in the old dog yet. Sure, with more bandwidth you could always argue multicast is superfluous, but as it’s user traffic that keeps pushing the demand for bandwidth, this never ending cycle could be improved on with higher usage of multicast, especially on the internet.

Global Multicast addressing is one of those things that you normally know about if you’ve had a requirement to use it, if not, you may not even know it exists. Globally unique (i.e. public) multicast addresses exist for both IPv4 and IPv6. There are numerous ways to get this address space, but the journey normally starts with IANA and registering a block of AD-HOC space. There really isn’t a need to do this though if you’re just starting out with inter-AS multicast.

Finally, if you’re wondering why there is any interest at all in this, with so many users joining the internet every year, it’s inevitable at some point that multicast usage will be picked up. On-demand TV, films and events delivered over a heterogeneous medium is desirable. Would you agree? The BBC have tried this several times: [http://support.bbc.co.uk/multicast/](http://support.bbc.co.uk/multicast/)

Now that I’ve veered off the beaten track, I’ll jump back on it with the two sections below.

#### Global Multicast Addressing: IPv4 GLOP

If you have a 16 bit ASN (AS Number), you already have a /24 prefix of globally unique multicast addresses. Cool right? This is known as GLOP addressing. GLOP doesn’t actually stand for anything. Just a made up term to describe the method below: “GLOP it together”!

```
Multicast GLOP Prefix range: 233.x.x.y/24
(where X.X is your 16 bit ASN split in two bytes)
```

Let’s take a well-known ASN of 31459 (BBC – from the link above), split this to form 2x octets:

```
+--------+----------------------+
ASN      | 31459 = BBC          |
+--------+----------------------+
Binary   | 0111 1010 1110 0011  |
+--------+----------------------+
Octets   | 122       227        |
+--------+----------------------+
```

```
BBC Range = <strong>233.122.227/24</strong>
```

This is defined in [RFC 3180](http://tools.ietf.org/html/rfc3180).

What if you do not have a 16 bit ASN? Do not panic. [RFC 6034](http://tools.ietf.org/html/rfc6034) defines a different method as the RFC extract demonstrates below.

```
A multicast address with the prefix 234/8 indicates that the address is a Unicast-Based Multicast (UBM) address. The remaining 24 bits are used as follows:
+-------+-------------------+-----------------------+---------------+
Bits:   |       0 thru 7    |         8 thru N      |  N+1 thru 31  |
+-------+-------------------+-----------------------+---------------+
Value:  |        234        |      Unicast Prefix   |   Group ID    |
+-------+-------------------+-----------------------+---------------+
```

So, ok, if you have a /24, you might not have a great range as you’ll have a single IPv4 multicast address as demonstrated:

```
Existing /24:    <strong>192.168.10.0/24</strong>
<em>(Using RFC1918 for demonstration purposes)</em>

Multicast group: <strong>234.192.168.10</strong>
```

It goes without saying, the larger the block of unicast address space you have, the more multicast address space you can get. If you have a prefix longer than a /24 are you scuppered? You can ask your provider to borrow addresses from a pool of RFC6034 or RFC3180 addresses. As long as it’s all documented and track-able, it’s down to the discretion of the provider.

#### Global Multicast Addressing: IPv6

I am a huge fan of IPv6, so I’ll treat IPv6 the same as IPv4. GLOP doesn’t exist for IPv6; however, “Unicast-Prefix-Based IPv6 Multicast” does, a bit like Unicast Based Multicast (UBM) for IPv4. It’s also worth having a read of [RFC 4291](http://www.ietf.org/rfc/rfc4291.txt) which covers IPv6 addressing.


[RFC 3306](http://tools.ietf.org/html/rfc3306) references the actual multicast addressing method used.

[RFC 2373](http://tools.ietf.org/html/rfc2373) is inherited by [RFC 3306](http://tools.ietf.org/html/rfc3306) for the explanation of certain flags. Both are well worth a read.

An excerpt from RFC3306.

```
This document introduces a new format that incorporates unicast prefix information in the multicast address. The following illustrates the new format:

+--------+----+----+--------+------+----------------+----------+
|   8    | 4  | 4  |    8   |   8  |        64      |    32    |
+--------+----+----+--------+------+----------------+----------+
|11111111|flgs|scop|reserved| plen | network prefix | group ID |
+--------+----+----+--------+------+----------------+----------+

11111111 at the start of the address identifies the address as being a multicast address.

flgs is a set of 4 flags: |0|0|P|T|

scope
1 = Node
2 = Link
5 = Site
8 = Organization
E = Global


o P = 0 indicates a multicast address that is not assigned based on the network prefix. 
This indicates a multicast address as defined in [<a title="&quot;IP Version 6 Addressing Architecture&quot;" href="http://tools.ietf.org/html/rfc3306#ref-ADDRARCH">ADDRARCH</a>].

o P = 1 indicates a multicast address that is assigned based on the network prefix.

o If P = 1, T MUST be set to 1, otherwise the setting of the T bit is defined in Section 2.7 of [<a title="&quot;IP Version 6 Addressing Architecture&quot;" href="http://tools.ietf.org/html/rfc3306#ref-ADDRARCH">ADDRARCH</a>].

T = 0 indicates a permanently-assigned ("well-known") multicast address, assigned by the  global internet numbering authority.

T = 1 indicates a non-permanently-assigned ("transient") multicast address.

The reserved field MUST be zero.

plen indicates the actual number of bits in the network prefix field that identify the subnet when P = 1.
```

So if we take a prefix such as: 2a00:bb40:1:1/64, the multicast version looks like:
*At the time of writing, this address block was under my own RIPE account*.

```
FF3E:40:2A00:BB40:1:1/96 = 32 bits worth of multicast 
group addresses!!!

FF3E = Multicast assigned based on unicast prefix of global scope

40 = prefix length in hex of /64
```

Bye for now.