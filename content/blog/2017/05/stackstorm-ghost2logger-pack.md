---
title: "StackStorm: Ghost2logger Pack"
date: 2017-05-02T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "StackStorm: Ghost2logger Pack"
signoff: Dave
categories:
- StackStorm Ghost2logger
tags:
- StackStorm Ghost2logger
---

![St2](/images/blog/st2_stackstorm.jpg#center)

Coinciding (roughly) with the version 2.2 release of StackStorm, the Ghost2logger pack has been released.

This pack provides in essence a “Syslog sensor” that provides the user a tuple match on a Syslog entry, tuples in this case being:

* Syslog Message (Actual syslog message)
MANDATORY AND
* Syslog Source (IPv4 address)

The actions can then be anything you so desire, either triggering a sinlge action or full blown workflow with Mistral or Cloudslang.

#### Getting Started

In terms of using the pack, all that is required from the user is the creation of rules and pointing your syslog source to the Ghost2logger location. Most of the time Ghost2logger will live on the same install as StackStorm, so point it at the IP address StackStorm resides. Worried abut StackStorm load? Don’t be. Syslogs aren’t actually processed by StackStorm, but are processed by the Ghost2logger binary. Only matched entries dispatch triggers. There is some inception going on here. Prepare yourself for this: “Rules will only match what the rules have created the match conditions for”. If you understand this hypothesis correctly, you will understand that this is simple feedback from the rules base back to Ghost2logger.

The pack itself consists of a number of simple components:

* A loopback sensor
* A dispatcher sensor
* A Golang binary called “Ghost2logger”
* A config file that provides attributes to tie these things together

The loopback sensor ([ghost2loggerloopback.py](https://github.com/StackStorm-Exchange/stackstorm-ghost2logger/blob/master/sensors/ghost2loggerloopback.py)) provides the linkage between StackStorm and the Ghost2logger binary executable. It polls StackStorm for it’s rule database and builds a small in memory database of rules relating to Ghost2logger. The sensor then parses them and sends changes onwards to the Ghost2logger binary.

The dispatcher sensor ([ghost2loggersensor.py](https://github.com/StackStorm-Exchange/stackstorm-ghost2logger/blob/master/sensors/ghost2loggersensor.py)) receives “alerts” from the Ghost2logger binary when a match occurs. This sensor “dispatches” the Ghost2logger trigger in to StackStorm.

[Ghost2logger binary](https://github.com/StackStorm-Exchange/stackstorm-ghost2logger/tree/master/bin) is the crown jewel in this pack. It can be ran in the foreground (original idea was to run it in a screen session) or the preferred route of running it as a [systemd service](http://ipengineer.net/2017/03/linux-systemd-golang-services-using-kardianos-service/).

Configuration relates to all three sensors. The configuration is generated post installation and with the latest release (1.0.1 at the time of writing) if the Ghost2logger service is not running, the Ghost2logger sensors will continue to run. Next step, the Ghost2logger service (ghost2logger.service) will need to be copied to the systemd directory and the service will need starting. Specific instructions are below. Over time I will try and make this easier (perhaps with a Make file).

The first thing you need to do is install the pack. Great news! The pack is now part of the StackStorm Exchange so you can install it straight from StackStorm itself.

#### Install Procedure

```bash
st2 pack install ghost2logger
```

Then configure the pack.

```bash
st2 pack config ghost2logger
```

You can safely accept all the defaults if you are happy with “admin/admin” for the user/password respectively.

You will also need to generate an st2api key and paste in the key in to the config file or in to the config procedure input.

```bash
st2 apikey create -k -m '{"used_by": "Ghost2logger"}'
```

The key that is presented, make a note of (somewhere like Keepass) and paste it into the config file, replacing the st2api key line default entry.

Location of config file:

```bash
/opt/stackstorm/configs/ghost2logger.yaml
```

Replacing the default value of this line “REPLACE_ME” with the key.

```
  st2_api_key: "REPLACE_ME" <<< Key goes here.
```

Once these steps have been followed, then you can copy the ghost2logger service unit file across to the systemd directory and start the service and validate that it’s running.

```bash
sudo cp /opt/stackstorm/packs/ghost2logger/bin/ghost2logger.service /etc/systemd/system/
systemctl start ghost2logger.service
systemctl is-active ghost2logger.service
systemctl status ghost2logger.service
```

At this point we need to restart the sensor container, allowing each sensor to pick up it’s associated configuration.

```bash
sudo st2ctl restart-component st2sensorcontainer
```

Now that we’ve started things up (the binary and the sensors), let’s check that everything is working! Check the output here to make sure everything is ok and nothing has exited.

```bash
Now that we’ve started things up (the binary and the sensors), let’s check that everything is working! Check the output here to make sure everything is ok and nothing has exited.
```

If you’ve made it this far without any errors, then create a rule using the criteria below and check that the constituent parts appear in the output of journalctl. The rule has an action of nothing, but it’s not important. It’s a test rule.

```plaintext
name: rule_1
pack: ghost2logger
ref: ghost2logger.rule_1
criteria:
    trigger.host:
        pattern: 192.168.16.1
        type: eq
    trigger.pattern:
        pattern: Logical link.*down$
        type: eq
enabled: true
tags: []
trigger:
    parameters:
    ref: ghost2logger.pattern_match
    type: ghost2logger.pattern_match
type:
    parameters:
    ref: standard
uid: rule:ghost2logger:rule_1
action:
    ref: core.noop
```

There is a Python script which can generate the test Syslog located [here](https://github.com/DavidJohnGee/ghost2logger-tools/blob/master/switchtest.py). Inside the script, modify the IP address and run using:

```bash
python switchtest.py
```

At this point, you have a running Ghost2logger install and know how to check logs for anything weird. If you happen to spot something, feel free to raise an issue on the StackStorm repository or email directly.

There is a video here of the final test procedure including what the rule criteria looks like on the GUI. The action is different in the video as it pushes a message to Slack, but that’s fine detail. The core of the demo is the same.

{{<youtube OlHT8HIEuts>}}