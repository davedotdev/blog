---
title: "Cloud Fog – Automation and Ruby step 1 with Junos"
date: 2013-05-03T00:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Automation with Ruby & Junos"
signoff: Dave
---

If you have taken your foot off the accelerator for as long as I haven’t written a blog post, you could quite rightly think the world has gone mad. In the last 12 months (OK, so slightly longer than my internet silence), we’ve seen much talk of SDN, NFV, automation and orchestration. Each topic has seen much action, including the introduction of the [OpenDaylight Project](http://www.opendaylight.org/) in order to bring some standardised organisation to the SDN chaos. Northbound and Southbound API’s have been the buzzwords of late with the addition of underlay and overlay networking. Underlay fitters…cloud plumbers….and so on. Open standards need to be in place so that API’s don’t look like the current state of CLI variations. Tried configuring QoS recently on a 6500 with a Sup2T? How about a 3750X? With any luck, the OpenDaylight Project will bring a standard way of passing configuration data and querying information between network elements. Yes, line cards and silicon will always be different, but there isn’t a need for the current proverbial soup that is configuration land today.

It’s inevitable that networking is going down the automated route to accelerate error free deployment. This makes some of us cringe as the phrase “what will I do for a living” hits home. Others see the potential carnage and the emerging opportunity to become a trusted resource to secure another few years of career enjoyment/torture. Most of us know several network platforms, some better than others, but the one thing that is common in the network warrior fraternity, is the fact that each of us learns technology both new and old constantly day in and day out in order to carry out customer requirements.

Whilst lavish SDN environments might be out of reach for most of us, virtual networking which SDN controllers will be tethered to eventually is very much within reach. We are no longer talking about Nexus1000v switching and the like, but virtualised network devices such as routers, load balancers, firewalls, WAN acceleration, caching, wireless controllers…the list goes on. Networking has always been messy, but now we’re verging on super messy. The demand for workflow based automation and orchestration has never been higher. I look at a bowl of spaghetti and can’t help but think it looks tidy in comparison to hand reared biological enterprise and datacentre networks. With Intel releasing the [Data Plane Development Kit (DPDK)](http://www.intel.com/content/www/us/en/intelligent-systems/intel-technology/packet-processing-is-enhanced-with-software-from-intel-dpdk.html) in order to make use of x86 cores to forward packets faster and more efficiently, we will see a huge influx of products based on COTS (Commercial Off The Shelf) hardware, all with ability to make the network not just cloudy, but foggy. If people on the ground access the cloud, surely it needs fog to bridge the air gap? This is a huge subject so please excuse the brevity of this post. I appreciate this is more of a debate opener than a post!

The problem as I see things at this stage is lack of a simple method of automation and control across the range of network elements. I get around this most of the time using Junos. I like it. Some people would argue, Junos on each device is as different as IOS, IOS-XE, IOS-XR and NX-OS. Personally, I like to think of Junos as a jug. Sometimes there is more water in it than others, sometimes there are soft drinks, other times beer. Bear with me…

Junos as most of us know is built using XML underneath the universally easy to use CLI.  Junos supports [NetConf](http://en.wikipedia.org/wiki/NETCONF), [Junoscript](http://www.juniper.net/support/downloads/?p=junoscript), [Junos XML API](http://www.juniper.net/support/downloads/?p=junosxml) and has an [SDK](https://developer.juniper.net/content/develop-overview/junos-sdk/getting-started.page). You can use [libslax](http://code.google.com/p/libslax/) and [Juise](https://code.google.com/p/juise/) to develop test scripts and now you can integrate Junos in to [Puppet](https://puppetlabs.com/) from [Puppet Labs](https://puppetlabs.com/).

When products integrate in to a network operating system, there has to be an underlying communication method. Currently the methods include CLI interpreters, SNMP, NetConf and Northbound API’s. As Junos is built on XML, it takes little effort to communicate using code. There are quite a few languages out there which are used for glue code, server side dynamic code generation, browser widgets and automating simple tasks. A selection would be Ruby, Python, Javascipt, C# and PHP. Ruby is an interesting one! Ruby is not only feature rich, it is also interpreted like PHP. This makes it a bit slower than C#, however, it is easy to work with and can development can begin with nothing more than a text editor and a ‘how-to’ guide. Puppet happens to use Ruby and as a result, [Jeremy Schulman](http://workflowsherpas.com/) of Juniper Networks has created several libraries to facilitate automation. He has also made these libraries available for GitHub! These libraries are below.

[ruby-junos-ez-srx](https://github.com/jeremyschulman/ruby-junos-ez-srx)

[ruby-junos-ez-stdlib](https://github.com/jeremyschulman/ruby-junos-ez-stdlib)

More importantly, these libraries let you interact with Junos via RPC calls through Ruby. Nice! I had some difficulties initially in building a decent development environment, but once I had that up and going, Jeremy’s code examples really helped to get up to speed. Ruby is a very rich language and I highly advise just playing with it with some ‘hello world’ variations. Also it’s worth setting up a local Git, so just in case you pwn your test files, you can restore them without losing sleep.

So, here’s my development environment:

```bash
Ubuntu 12.04.2 LTS (Precise)
Ruby 1.9.3dev (rev 33323)
Ruby Gems 1.8.10

    Gems:
    Junos-ez-srx (0.0.7)
    Junos-ez-stdlib (0.0.15)
    Net-ssh (2.6.7)
    Nokogiri (1.5.9)
    Pry (0.9.12.1)
    Therubyracer (0.11.4)
```

Gems are packages installed under Ruby and below lists the important ones to get Jeremy’s examples working. I have many more installed but for the purpose of this post these are the ones to worry about.

The below shows some output using [Pry](http://pryrepl.org/) which is a great way to interactively test Ruby libraries.

Below is the sample script which I’ve tested against SRX and EX platforms. You can execute it the bash command also below. The script executes three functions, which in turn returns L2 port information, VLAN catalogue information and the facts catalogue. The script returns the information contained in hashes, which are just data containers.

```bash
```

And the script...

```ruby
require 'pry'
require 'yaml'
require 'net/netconf/jnpr'
require 'junos-ez/stdlib'
require 'json'
require 'xmlsimple'

# login information for NETCONF session 

login = { :target => '192.168.0.253', :username => 'root',  :password => 'Passw0rd',  }

ndev = Netconf::SSH.new( login )
$stdout.print "Connecting to device #{login[:target]} ... "
ndev.open
$stdout.puts "OK!"

Junos::Ez::Provider( ndev )
Junos::Ez::L1ports::Provider( ndev, :l1_ports )
Junos::Ez::IPports::Provider( ndev, :ip_ports )
Junos::Ez::L2ports::Provider( ndev, :l2_ports )
Junos::Ez::Vlans::Provider( ndev, :vlans )
Junos::Ez::Config::Utils( ndev, :cfg )

puts "\n\rOutput of L2 Ports Catalog"

output = ndev.l2_ports.catalog
puts "#{output}"

puts "\n\rOutput of VLANS Catalog"

output = ndev.vlans.catalog
puts "#{output}"

puts "\n\rOutput of Facts Catalog"

output = ndev.facts.catalog
puts "#{output}"

binding.pry

ndev.close
```

Here is the output:

```bash
Connecting to device 192.168.0.253 ... OK!

 
Output of L2 Ports Catalog

{"fe-0/0/3"=>{:_active=>true, :_exist=>true, :vlan_tagging=>false, :untagged_vlan=>"VLAN600"}}

 
Output of VLANS Catalog

{"VLAN600"=>{:_active=>true, :_exist=>true, :vlan_id=>600, :interfaces=>["fe-0/0/3.0"]}}

 
Output of Facts Catalog

{:hardwaremodel=>"SRX100H", :serialnumber=>"XXXXXXXXXXXX", :hostname=>"SRX3", :domain=>"", :fqdn=>"SRX3", :RE=>{:status=>"OK", :model=>"RE-SRX100H", :up_time=>"7 hours, 23 minutes, 54 seconds", :last_reboot_reason=>"0x1:power cycle/failure "}, :personality=>:SRX_BRANCH, :version=>"11.2R4.3", :ifd_style=>:CLASSIC, :switch_style=>:VLAN}
```

You can also break out of the pry session and call functions interactively like below. Pretty neat stuff for testing.

```bash
[1] pry(main)> ndev.l2_ports.catalog

=> {"fe-0/0/3"=>

{:_active=>true,

:_exist=>true,

:vlan_tagging=>false,

:untagged_vlan=>"VLAN600"}}
 

[2] pry(main)> ndev.facts.catalog

=> {:hardwaremodel=>"SRX100H",

:serialnumber=>"XXXXXXXXXXXX",

:hostname=>"SRX3",

:domain=>"",

:fqdn=>"SRX3",

:RE=>

{:status=>"OK",

:model=>"RE-SRX100H",

:up_time=>"6 hours, 34 minutes, 7 seconds",

:last_reboot_reason=>"0x1:power cycle/failure "},

:personality=>:SRX_BRANCH,

:version=>"11.2R4.3",

:ifd_style=>:CLASSIC,

:switch_style=>:VLAN}

 
[3] pry(main)> ndev.vlans.catalog

=> {"VLAN600"=>

{:_active=>true, :_exist=>true, :vlan_id=>600, :interfaces=>["fe-0/0/3.0"]}}
```

By now, if you haven’t figured it out, the next step would be to tie together the Ruby libraries with Rails and create an MVC (Model/View/Controller) framework. With some simple workflow logic, you could submit data received above in to a database, add some metadata and create service structures. If you ever dreamed of a single click service provision and if your curiosity has been tickled by this very light weight post, you might want to check out the following:

[Sinatra](http://www.sinatrarb.com/intro.html) is a [DSL](http://en.wikipedia.org/wiki/Domain-specific_language) for quickly creating web applications in Ruby with minimal effort:

[Chef](http://www.opscode.com/chef/) is an automation platform that transforms infrastructure into code

[Ruby on Rails](http://rubyonrails.org/) is an open-source web framework

[Microsoft ASP (MVC)](http://www.asp.net/mvc) is a powerful, patterns-based way to build dynamic websites

The world is changing rapidly and I for one intend to change with it. Unleash your imagination and play in the fog.