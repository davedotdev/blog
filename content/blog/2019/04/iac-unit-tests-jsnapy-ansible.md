---
title: "IaC – unit tests with jSNAPy and Ansible"
date: 2019-04-24T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "IaC – unit tests with jSNAPy and Ansible"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

JSNAPY is an open source tool released by Juniper Networks circa 2015 that is the Python version of the Juniper Snapshot Administrator. This tool in the most simplest sense gives us the ability to have unit-tests when working with Junos, much in the same way a developer would write tests against their code. JSNAPy creates snapshots of a device’s operational or configurational state, the content of which depends on tests. JSNAPy then can diff and check these snapshots, which when combined with your test logic, means you can detect when things change or don’t change as per your desire. It’s a simple but effective tool when working with Junos. In fact, if you have another system to take the snapshot, JSNAPy is really an XML snippet checking tool and thus, it can be used for multi-vendored environments!!!

JSNAPy is a great tool for not only dealing with operational changes, but also also for steady state change operations too through the use of both `pre` and `post` tests and the logical operators JSNAPy supports. It’s worth mentioning you can call the snaps and tests anything you want. Bob and Alice are both valid examples of a snap name, but the advice here is to use meaningful naming.

All tests and configuration are written in YAML and are quite simple providing you spend five minutes to get acquainted with the keywords.

Here are the installation instructions in case you haven’t installed it yet: [https://github.com/Juniper/jsnapy/wiki/1.-Installation](https://github.com/Juniper/jsnapy/wiki/1.-Installation)

Just in case you didn’t know, JSNAPy can also be used in Ansible directly, the gains of which need to be said. Here is a link to an Ansible example to help shortcut the ramp-up time! [https://github.com/arsonistgopher/Juniper5StepDemos/tree/master/Ansible](https://github.com/arsonistgopher/Juniper5StepDemos/tree/master/Ansible)

Here are the logical test operators supported by JSNAPy at the time of writing.

```plaintext
- Execute Tests Over Elements with Numeric or String Values
    1. all-same: Check if all content values for the specified element are the same. It can also be used to compare 
                 all content values against another specified element.
           - all-same: flap-count
             checks if all values of node <flap-count> in given Xpath is same or not.

    2. is-equal: Check if the value (integer or string) of the specified element matches a given value.
           - is-equal: admin-status, down
             check if value of node <admin-status> in given Xpath is down or not.  

    3. not-equal: Check if the value (integer or string) of the specified element does not match a given value.
           - not-equal: oper-status, down
             check that value of node <oper-status> should not be equal to down.  

    4. exists:  verifies the existence of an XML element in the snapshot.
           - exists: no-active-alarm 
             checks if node </no-active-alarm> is present or not  
 
    5. not-exists: verifies xml element should not be present in snapshot
           -not-exists: no-active-alarm 
            checks </no-active-alarm > node should not be present in snapshot.  

    6. contains: determines if an XML element string value contains the provided test-string value.
           - contains: //package-information/name[1], jbase
           checks if jbase is present in given node or not. 

    7. not-contains: determines if an XML element string value does not contain the provided test-string value.
           - not-contains: //output, sync_alarm
           checks if sync_alarm is present in given node or not.

 - Execute Tests Over Elements with Numeric Values
    1. is-gt: Check if the value of a specified element is greater than a given numeric value.
            - is-gt: cpu-total, 2
              checks value of <cpu-total> should be greater than 2  

    2. is-lt: Check if the value of a specified element is lesser than a given numeric value.
            - is-lt temperature, 55
              checks value of <temperature> is 55 or not.  

    3. in-range: Check if the value of a specified element is in the given numeric range.
            - in-range memory-buffer-utilization, 20, 70 
              check if value of <memory-buffer-utilization> is in range of 20, 70  

    4. not-range: Check if the value of a specified element is outside of a given numeric range.
              - not-range: memory-heap-utilization, 5 , 40
                checks if value of <memory-heap-utilization> is not in range of 5 to 40

 - Execute Tests Over Elements with String Values: 
    1. contains: determines if an XML element string value contains the provided test-string value.
           - contains: //package-information/name[1], jbase
             checks if jbase is present in given node or not.

    2. not-contains: determines if an XML element string value does not contain the provided test-string value.
           - not-contains: //output, sync_alarm
           checks if sync_alarm is present in given node or not.

    3. is-in: Check if the specified element string value is included in a given list of strings.
           - is-in: oper-status, down, up
             check if value of <oper-status> in is list (down, up)  

    4. not-in: Check if the specified element string value is NOT included in a given list of strings.
           - not-in :oper-status, down, up
             check if value of <oper-status> in not in list (down, up)
```

*Taken from https://github.com/Juniper/jsnapy/wiki*

JSNAPy is great for use in upgrade & update scenarios. The aim is to ‘finger print’ the pre change state and then take another fingerprint of the post state for comparison.

__Junos Upgrade__

You want to update Junos on a production device in the quickest and most reliable way possible. JSNAPy can be used to snapshot the state of interfaces, routing protocols and general health from both an operational and configuration perspective. Anywhere we can access XML data (everywhere on Junos), we can use JSNAPy to snapshot and run checks!

1. Take pre snapshots of test hotspot areas, for example:
- Number of routes in `inet.0` routing table
- Number of interfaces in physical up state
- Number of BGP peers in the established state

2. Upgrade Junos

3. Take new post snapshots after a short period of time (to allow protocols and state to settle)

4. Run JSNAPy checks to ensure the `post` state is the same as the `pre` state

This is a pretty straight forward example and the `is-equal` test operator will suffice here. The trickiest thing will be to find the correct XML xpath statement with regards to pinning the data described in the short list.

__Addition of an Interface__

This one isn’t so straight forward as ensuring the pre state matches the post state and so examples are included! Also the pre test is being used as a collision check to make sure that the network attribute isn’t being used before we intend to use it! If you’re familiar with Junos, you’ll also understand that if an interface isn’t configured, you just won’t see it in the configuration XML. If it’s an SFP based line card or fixed-form device, chances are you also won’t see it in the operational XML if the SFP is missing. All the fun of the circus with this example and exactly why I chose to write about it.

The way to deal with JSNAPy in this scenario is based on the logic of XML elements missing for pre-tests and on the logic of XML elements being present and correct for the post checks.

First of all, we need device configuration files for JSNAPy which are here:

Pre-configuration:

```plaintext
# Pre-Test for basic automation
hosts:
  - device: demo01
    username: tf
    passwd: Passw0rd
tests:
  - ./tests/pre.yml
```

Post configuration:

```plaintext
# Post-Test for basic automation
hosts:
  - device: demo01
    username: tf
    passwd: Passw0rd
tests:
  - ./tests/post.yml
```

Github link for pre config [here](https://github.com/arsonistgopher/Juniper5StepDemos/blob/master/Terraform/pre.yml).
Github link for post config [here](https://github.com/arsonistgopher/Juniper5StepDemos/blob/master/Terraform/post.yml).

The workflow for the set of pre tests looks like below:
1. Check that interface `ge-0/0/42` isn’t configured
2. Check that `irb.42` isn’t configured
3. Check that the `VLAN DT` isn’t configured – *DT for DeepThought, a large and beefy server that likes watching TV*

We could take this further and ensure that the VLAN number isn’t in use, so let’s assume we have one source-of-truth and name/number is tightly coupled. Also, we could add another test in the style of the existing ones if you’re paranoid!

Here are the actual pre tests. Note we iterate through the list of interfaces and check that all of them are not equal. Take the `test_phy` test as an example, here we check that each name of the interface in the interface list is NOT equal to `ge-0/0/42`. Simple but effective logic.

```plaintext
test_phy:
  - rpc: get-config
  - kwargs:
      filter_xml: configuration/interfaces
  - iterate:
      id: ./name
      xpath: 'interfaces/interface'
      tests:
        - not-equal: name, ge-0/0/42
          info: "Interface does not exist"
          err: "-"

test_irb:
  - rpc: get-config
  - kwargs:
      filter_xml: configuration/interfaces
  - iterate:
      id: ./name
      xpath: 'interfaces/interface[name="irb"]/unit'
      tests:
        - not-equal: name, 42
          info: "Interface does not exist"
          err: "-"

test_vlan:
  - rpc: get-config
  - kwargs:
      filter_xml: configuration/vlans
  - iterate:
      id: ./vlan
      xpath: 'vlans/vlan'
      tests:
        - not-equal: name, DT
          info: "VLAN does not exist"
          err: "-"
```

GitHub link for pre test [here](https://github.com/arsonistgopher/Juniper5StepDemos/blob/master/Terraform/tests/pre.yml).

The workflow for the post test is a little different to the pre. We’ll check for direct matches and do not iterate through the list.

1. Check that interface `ge-0/0/42` exists
2. Check that `irb.42` exists
3. Check that `VLAN DT` exists

```plaintext
test_phy:
  - rpc: get-config
  - kwargs:
      filter_xml: configuration/interfaces
  - item:
      id: ./name
      xpath: 'interfaces/interface[name="ge-0/0/42"]'
      tests:
        - is-equal: name, ge-0/0/42
          info: "Interface exists"
          err: "-"

test_irb:
  - rpc: get-config
  - kwargs:
      filter_xml: configuration/interfaces
  - item:
      id: ./name
      xpath: 'interfaces/interface[name="irb"]/unit[name="42"]'
      tests:
        - is-equal: name, 42
          info: "Interface exists"
          err: "-"

test_vlan:
  - rpc: get-config
  - kwargs:
      filter_xml: configuration/vlans
  - item:
      id: ./vlan
      xpath: 'vlans/vlan[name="DT"]'
      tests:
        - is-equal: name, DT
          info: "VLAN exists"
          err: "-"
```

GitHub link for post test [here](https://github.com/arsonistgopher/Juniper5StepDemos/blob/master/Terraform/tests/post.yml).

#### Executing Tests

JSNAPy tests are super easy to run providing you have it installed and the credentials to the device under test are correct.

The below example shows running both the pre and post tests using the `--snapcheck` switch. This switch makes JSNAPy do a snapshot and also perform a check against the tests referenced by the `x.yml` file the command line call references.

```bash
JSNAPy --snapcheck pre -f pre.yml
JSNAPy --snapcheck post -f post.yml
```

#### Close

Whilst this post doesn’t serve as a full blown guide with install, it does deliver some “how-to” logic if you’re wondering about the tool.

Hopefully this post has proved to be a useful view into a use of JSNAPy and has delivered some value in payment for your time.

You may want to trigger these tests within a CI/CD pipeline as separate stages to really get the value out of the tool and tests. This way, tests that fail can prevent the pipeline from progressing any further in the case of pre tests and failed post tests can be used to trigger revert workflows.

__Useful Links__

– Matt Oswalt wrote about JSNAPy [here](https://keepingitclassless.net/2018/02/unit-testing-junos-with-jsnapy/).

– [NRELabs has a JSNAPy lesson](https://labs.networkreliability.engineering/advisor/courseplan.html?lessonId=12) which means you can use it for free and extremely quickly in a browser session.

– [https://github.com/Juniper/jsnapy/blob/master/README](https://github.com/Juniper/jsnapy/blob/master/README)

– [https://github.com/Juniper/jsnapy/wiki/2.-Writing-test-and-config-file](https://github.com/Juniper/jsnapy/wiki/2.-Writing-test-and-config-file)

– [https://github.com/Juniper/jsnapy/wiki/3.-Command-Line-Tool](https://github.com/Juniper/jsnapy/wiki/3.-Command-Line-Tool)




