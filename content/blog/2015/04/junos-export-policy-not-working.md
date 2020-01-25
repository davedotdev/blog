---
title: "Junos Export Policy Not Working?"
date: 2015-04-20T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Junos Export Policy Not Working?"
signoff: Dave
categories:
- Junos Export
tags:
- Junos Export
---

During a project recently, I was promptly reminded about the construction of clean Junos route export (i.e. route redistribution) policies. Specifically when filtering prefixes during the export/redistribution. The logic goes something like this:

1. Create prefix-list of prefixes to export
2. Create policy which references the protocol and prefix list to export
3. Attach policy to protocol

An example is here:

```bash
policy-options {
    prefix-list CUST_A {
        192.0.2.1/32;
    }

	policy-statement REDISTRIBUTE_STATICS_CUST_A {
    	/* FROM PREFIX-LIST TEST TO METRIC TYPE 1 FOR CUST A */
    	term 1 {
        	from {
            	prefix-list CUST_A;
        	}
        	to protocol ospf;
        	then {
            	external {
                	type 1;
            	}
            	accept;
        	}
    	}
	}
}

protocols {
	ospf {
		export REDISTRIBUTE_STATICS_CUST_A
		area 0.0.0.0 {
		interface x-x/x/x.x
		}
	}
}
```

With Junos export policies for routing, if you want to export more prefixes of the same type, you can add another policy and add it to the export line. ~~adding an additional policy which also references the same protocol for the export will just not work. If you do the below, then you’re out of luck~~ (Looks like I may have ran in to a bug with my original couple of attempts. It did work on attempt 3 on a different platform and more recent version of code. Not the first time this will happen and not the last! Thanks to ‘oldcreek’ for making me hit this again and making me question the logic).

```bash
policy-options {
    prefix-list CUST_A {
        192.0.2.1/32;
    }

    prefix-list CUST_B {
        192.0.2.2/32;
    }

	policy-statement REDISTRIBUTE_STATICS_CUST_A {
    	/* FROM PREFIX-LIST TEST TO METRIC TYPE 1 FOR CUST A */
    	term 1 {
        	from {
            	prefix-list CUST_A;
        	}
        	to protocol ospf;
        	then {
            	external {
                	type 1;
            	}
            	accept;
        	}
    	}
	}
	policy-statement REDISTRIBUTE_STATICS_CUST_B {
    	/* FROM PREFIX-LIST TEST TO METRIC TYPE 1 FOR CUST B */
    	term 1 {
        	from {
            	prefix-list CUST_B;
        	}
        	to protocol ospf;
        	then {
            	external {
                	type 1;
            	}
            	accept;
        	}
    	}
	}
}

protocols {
	ospf {
		export [REDISTRIBUTE_STATICS_CUST_A REDISTRIBUTE_STATICS_CUST_B]
		area 0.0.0.0 {
		interface x-x/x/x.x
		}
	}
}
```

It gets the job done, but looks awfully clumsy.

#### The bucket list methodology

When exporting prefixes originating from aggregates, statics, IGPs and BGP to something else, you could use the ‘bucket list’ method of dealing with prefixes to redistribute in to a routing protocol.

This bucket list method involves imagining walking up to a bucket and picking out several lists worth of items from the said bucket. Once you have all of the items, move on to the next bucket and repeat. The idea is you visit each in sequence without ever returning to a bucket previously visited.

Translating this to Junos, this logic will allow you to constantly add prefixes you want to export without breaking the logic or making a messs of your policy.

```bash
policy-options {
    prefix-list CUST_A {
        192.0.2.1/32;
    }

    prefix-list CUST_B {
        192.0.2.2/32;
    }
	
	policy-statement REDISTRIBUTE_STATICS_TO_OSPF_GLOBAL {
    	/* FROM PREFIX-LIST CUST_A TO OSPF TYPE 1 */
    	term 1 {
    	    from {
    	        prefix-list CUST_A;
    	    }
    	    to protocol ospf2;
    	    then {
    	        external {
    	            type 1;
    	        }
    	        accept;
    	    }
    	}
    	/* FROM PREFIX-LIST CUST_B TO OSPF TYPE 1 */
    	term 2 {
    	    from {
     	       prefix-list CUST_B;
    	    }
    	    to protocol ospf2;
    	    then {
    	        external {
    	            type 1;
    	        }
    	        accept;
    	    }
    	}
    	/* FROM PROTOCOL STATIC - REFERENCE ONCE! */
    	from protocol static;
	}
}

protocols {
	ospf {
		export REDISTRIBUTE_STATICS_TO_OSPF_GLOBAL
		area 0.0.0.0 {
		interface x-x/x/x.x
		}
	}
}
```

When dealing with a network operating system like Cisco IOS, you create a redistribute statement and then attach various controls to the statement in order to control what you redistribute into another protocol (assuming you wanted to control it!). The redistribute statement is a single entity and add the policy is expanded to redistribute further prefixes. The difference with Junos is policies can be added to the export statement, but the result is it doesn’t work the way you think it does if the multiple policies references the same ‘from protocol’ statement.

For what it’s worth, take care with redistribution. Unless you have modelled what you want to do, most of the time redistributing isn’t actually what you want to do. This is especially true when including interfaces in a routing protocol. Don’t redistribute when you have better knobs to tweak and it’s worth reviewing the different ways you can architect scenarios for multiple interactions between protocols and types of routes. Running two OSPF processes next to each other is better than trying to filter LSAs between interfaces. Some routers need to see two different OSPF domains. A likely scenario for that of a managed services provider.

In summary, go to the bucket, pick from it your list and move to the next bucket.

#### Taking it further

When you think about larger scale routing domains, think in terms of all of the moving parts. Having a set of routing policies that exist on every template configuration will help to remove clunky policies like this and reduce the time wasted. Your brain automatically will be reminded to think the right way and routing policies will become simpler. Replace TABLE with whatever routing table this policy is for. In my example above it was the standard global table.

REDISTRIBUTE_STATICS_TO_OSPF_TABLE
REDISTRIBUTE_BGP_TO_OSPF_TABLE
REDISTRIBUTE_AGGREGATES_TO_BGP_TABLE

Final tidbit, remember you can place annotations into Junos using the

`annotate`

syntax which results in the

`/* COMMENT */`

annotations within Junos config.
