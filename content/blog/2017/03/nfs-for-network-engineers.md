---
title: "NFS For Network Engineers"
date: 2017-03-20T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "NFS For Network Engineers"
signoff: Dave
categories:
- NFS
tags:
- NFS
---

Without beating the ‘old drum’ without reason, sometimes you have to ask does the drum still need beating. Quick 5 minute articles like this one are always worth asking that question. As system administrators make the journey to SREs or ‘Site Reliability Engineers’, network engineers are also on the same trajectory. We might start from an expected Liam Neeson story point (I have some very specific skills etc), but it’s time to become a better Dad and just stop letting them take your daughter. Sometimes we just need to understand why it’s good to understand certain technology and in this case dream boat (I watched ‘The Accountant’ night, what an excellent film), NFS provides us with the ability to write and test code on remote machines for automation use cases. Sure, it’s just a network based file share, but the power of what it allows us to do is far more interesting.

Needless to say, on the same theme as the last blog post, this is another one that is anchored around [StackStorm](https://www.stackstorm.com/). With our trusty platform, when we create components for a pack like a actions and sensors, it’s important to have access to an IDE or set of tools that assist and accelerate productivity. These could be style tools like [flake8](http://ipengineer.net/2017/03/nfs-for-network-engineers/), or it could be a fully featured IDE like JetBrains PyCharm which has excellent debugger integration. Sure, I’ve seen it’s possible to create a Linux VM and install the trial versions of tools and then VNC or RDP to it. Not great sometimes fighting that additional graphical layer to access tools. Why bother? Just share the underlying directory and access the files using the host with tools. Install them once, get used to them and use them remotely. Makes much more sense.

#### A Quick Overview of NFS

Network File Share (NFS) was originally developed in 1984 by Sun Microsystems and is based on RFCs (no different from routing protocol RFCs!) and implemented on top of [Open Network Computing Remote Procedure Calls (ONC RPC)](https://en.wikipedia.org/wiki/Open_Network_Computing_Remote_Procedure_Call). Boilerplate explanations put to one-side, it allows us to share a directory from a remote machine over the network using the TCP/IP stack. This remote directory is mounted on a chosen directory mount point. We access it like any other local file system.

#### The Basics

For the purpose of this blog post, there is a remote host and a local host. The remote host exposes the directory or set of directories to mount by another host. These directories can have different permissions (read/write etc) and different attributes like ‘root squashing’ which ‘prevents root users connected remotely from having root privileges and assigns them the user ID for the user nfsnobody[^1].

#### Instructions

__Remote Host__

On the host that you wish to expose a directory, follow these steps (which were tried last on a Ubuntu Xenial 16.04 LTS release):

```bash
apt install nfs-kernel-server rpcbind
```

{{<infobox>}}
With Ubuntu 16.04, it’s recommended to use `apt` instead of ‘apt-get’. Other changes include systemd by default. I’ve gone on a bit of a journal, sorry, journey, with this recently and I’ve warmed to it. I also realise I had no real reason not to embrace it other than some theoretical gripes which have been satisfied.
{{</infobox>}}

Next bit, we need to edit the

```bash
/etc/exports
```

file which is where NFS takes it’s configuration information. I use VIM or VI and you will need to access this as root or with sudo.

```plaintext
# /etc/exports: the access control list for filesystems which may be exported
#               to NFS clients.  See exports(5).
#
# Example for NFSv2 and NFSv3:
# /srv/homes       hostname1(rw,sync,no_subtree_check) hostname2(ro,sync,no_subtree_check)
#
# Example for NFSv4:
# /srv/nfs4        gss/krb5i(rw,sync,fsid=0,crossmnt,no_subtree_check)
# /srv/nfs4/homes  gss/krb5i(rw,sync,no_subtree_check)
/opt/stackstorm/packs/test 192.168.16.1(rw,sync,no_subtree_check,no_root_squash)
```

bottom line is the only line that is read as the rest are comments. I expose the directory

```plaintext
/opt/stackstorm/packs/test
```

to host 192.168.16.1 with attributes[^2]:

* read/write: Need it be explained?
* sync: All file writes are committed to the disk before the write request by the client is completed. Be warned, can lower performance.
* no_subtree_check: If only part of a volume is exported, a routine called subtree checking verifies that a file that is requested from the client is in the appropriate part of the volume. If the entire volume is exported, disabling this check will speed up transfers.
* no_root_squash: Allow root level access to files on the remote machine! (Warning! I’ll let you figure out why :)).

Next, run the command below to resynchronise the exports with what’s in the exports file. This is effectively a refresh!

```bash
sudo exportfs -r
```

In order to whitelist access to our remote host (we don’t want anyone accessing this right?), we need to lock it down using the

```bash
hosts.allow
```

file. Let’s add our remote host to that file.

```plaintext
# /etc/hosts.allow: list of hosts that are allowed to access the system.
#                   See the manual pages hosts_access(5) and hosts_options(5).
#
# Example:    ALL: LOCAL @some_netgroup
#             ALL: .foobar.edu EXCEPT terminalserver.foobar.edu
#
# If you&apos;re going to protect the portmapper use the name "rpcbind" for the
# daemon name. See rpcbind(8) and rpc.mountd(8) for further information.
#

service: 192.168.16.1/32
```

Save and exit, then restart the NFS services.

```bash
sudo /etc/init.d/nfs-kernel-server restart
```

__Mount Host__

The mount host in this instance is the host we wish to mount the files on to from the remote NFS server. In my case, the mount host is my Mac Book.

In order to complete our recipe, create a directory you wish the remote files to appear in (called a mount point). You could use something totally unimaginative like

```bash
/mnt
```

, but that’s hardly descriptive. Let’s use

```bash
/home/davidgee/mynewpack
```

instead.

```bash
cd /home/davidgee
mkdir mynewpack
```

Finally, on our mount host, we need to actually try the mount out!

```bash
sudo mount -o resvport 192.168.16.20:/opt/stackstorm/packs/testpack /home/davidgee/mynewpack
```

The arguments here are:

* -o: Options (see below)
* resvport: This is a privileged port (i.e. below port number 1024). It helps with non-root users trying to access the remote NFS share.
* 192.168.16.20:/opt/stackstorm/packs/testpack: This is the remote mount point information.
* /home/davidgee/mynewpack: This is the local mount point.

Now we know how to mount, here’s how you unmount.

```bash
sudo umount /home/davidgee/mynewpack
```

If you get resource busy, try exiting the directory from terminal or any applications that have file descriptors open.
Sometimes you have to brute force the exit with the below.

```bash
sudo diskutil umount force /home/davidgee/mynewpack
```

So that’s that. Now you know how to get access to a remote file share using NFS. It’s easy to use and super powerful. Sure, it’s simple stuff, but for network engineers on this journey, this might be a useful trick you haven’t thought about previously!

Resources used for the above include:

[^1]: Quote taken from https://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-nfs-server-config-exports.html

[^2]: Information for attributes taken from running the man pages command `man exports`

