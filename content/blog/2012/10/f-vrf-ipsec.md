---
title: "F-VRF IPsec"
date: 2012-10-03T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Front Door VRF IPSec"
signoff: Dave
---

![FVRF](/images/blog/front_door_1.png#floatleft) VRF’s (Virtual Routing and Forwarding instances) are massively useful concepts within network operating systems. In the service provider industry VRFs are very much bread and butter. In the enterprise arena, they may also provide useful functions, although it is not as common to see them. Cisco with the Nexus 7k range have [VDCs](http://www.cisco.com/en/US/prod/collateral/switches/ps9441/ps9402/ps9512/White_Paper_Tech_Overview_Virtual_Device_Contexts.html) (Virtual Device Contexts) and Juniper have [logical-systems](http://www.juniper.net/techpubs/software/junos/junos94/swconfig-routing/logical-system-overview.html). Both of these concepts allow one tin to be divided up into separate instances.

![FVRF](/images/blog/front_door_2.png#floatright) VRF’s essentially provide path isolation functions. They provide separate routing tables, forwarding tables, associated policies and in some cases management. This is network virtualisation “lite”. Also, VRF’s do not rely on MPLS (which is a massive misconception). It’s just a container. Not a protocol . MPLS can be used to provide transport in and out of said container, but the two are not interdependent.

I wanted to present a nice edge case which currently works successfully with Cisco’s IOS but sadly not Junos (I’m hoping this is just time delayed and not permanent). It is now widely accepted that firewalls can provide contexts and logical-systems.  The first thing that springs to mind is within multi-tenanted ‘cloud’ providers. But did you know you can configure a Cisco IOS based router to perform highly available (active/standby) IPSec terminating within a VRF. It can save your company money and can reduce device count. The concept is called “FVRF IPsec”, or in English, Front door VRF IPSec.

Figure 1.0 shows a typical scenario (below)

![FVRF](/images/blog/front_door_3.png#center)

This scenario is common amongst service-providers and geographic separation is normally sold as part of the solution. Under the geographic separation scenario, EoMPLS would normally be used to link the two IP networks together which would be now be apart. L2 connectivity is a requirement for HSRP to function and EoMPLS satisfies this. Specific routes can be added on to each ‘edge x’ device within the VRF to reach the remote IPSec  endpoint .I feel I need to clarify what the IP transit situation would be under geographic separation and my answer to that is it depends. As long as the L2 pseudolink or LAN connection linked the two edge routers together,  it doesn’t matter which ingress path is taken via packets.  This is termed ‘hot potato’ routing for those who are uninitiated.

Presuming each node has IP transit to and from the internet, once HSRP has converged and each node now is aware of its responsibilities, IKE and IPSec can now go through their phases and agree terms.  Presuming again that all other configuration is correct, which includes filters for identifying traffic to be encrypted etc, at this point we should have a working topology.

It’s wise to lock down each FVRF ‘edge x’ interface using access-lists. In some environments I’ve worked on, internet breakout ingresses and egresses a different part of the topology and the ‘edge x’ devices have been shared between multiple customers. In these scenarios, you can lock the FVRF interfaces down to the remote peer for IKE , IPSec and ICMP.

As this is a poor mans version of an expensive firewall cluster, please do not expect hit-less failover and recovery. It will take time for IPSec to renegotiate and depending on the exact failure scenario, routing may take time to converge.

Please find a config snippet below for one of the ‘edge x’ devices. If you want a more comprehensive example, please email and I will generate a GNS3 topology with config files. This will include a basic MPLS, OSPF, LDP and MP-BGP topology. IPSec will also function in the manor this post describes. Make sure you have enough resources to run six routers (7200’s naturally)!!!

Please note the interface on the 10.10.10.0/24 LAN is the interface I refer to below called <FVRF_INTERFACE>.

```bash
ip sla 1
icmp-echo <IP Address of IPSec Endpoint> source-interface <FVRF Interface>
vrf <CustomerX>
timeout 15000
frequency 15
ip sla schedule 1 life forever start-time now
!
track 1 ip sla 1
!
crypto keyring CUST_X vrf custx
pre-shared-key address <IP Address of IPSec Endpoint> key <KEYSTRING>
!
crypto isakmp policy 1
encr aes
hash md5
authentication pre-share
group 2
lifetime 3600
!
crypto isakmp policy 10
encr 3des
hash md5
authentication pre-share
!
crypto isakmp profile CUST_X
vrf custx
keyring CUST_X
match identity address <IP Address and Mask for IPSec Endpoint> custx
!
!
crypto ipsec transform-set CUST_X esp-aes esp-md5-hmac
mode transport
!
crypto map CUST_X 10 ipsec-isakmp
set peer <IP Address for IPSec Endpoint>
set transform-set CUST_X
set isakmp-profile CUST_X
match address CUST_X
!
interface <FVRF_INTERFACE>
description **<INSERT_DESCRIPTION_HERE>**
encapsulation dot1Q xxx
ip vrf forwarding custx
ip address <FVRF_ADDRESS> <FVRF_MASK>
ip access-group CUST_X_FILTER_IN in
ip access-group CUST_X_FILTER_OUT out
no ip redirects
no ip unreachables
ip mtu 1500
standby 1 ip <HSRP_ADDRESS>
standby 1 priority 120
standby 1 preempt
standby 1 name HSRPCUSTX
standby 1 track 1 decrement 30
crypto map CUST_X redundancy HSRPCUSTX
!
!
ip route vrf custx <REMOTE_DEST> <MASK> 10.10.10.254 track 1
!
!
ip access-list extended CUST_X
permit ip <source> <dest>
ip access-list extended CUST_X_FILTER_IN
permit ip <FVRF_ADDRESS><FVRF_MASK> host 224.0.0.2 !(HSRP)
permit esp host <REMOTE_IPSEC><FVRF_ADDRESS>
permit udp host <REMOTE_IPSEC><FVRF_ADDRESS> eq 500
deny ip any any log
!
ip access-list extended CUST_X_FILTER_OUT
permit ip <FVRF_ADDRESS> host 224.0.0.2
permit esp <FVRF_ADDRESS> host <REMOTE_IPSEC>
permit udp <FVRF_ADDRESS> host <REMOTE_IPSEC> eq 500
deny ip any any log
```