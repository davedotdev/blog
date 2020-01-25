---
title: "Ubuntu 16.04 git lfs broken install"
date: 2018-02-06T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Ubuntu 16.04 git lfs broken install"
signoff: Dave
categories:
- Linux LFS
tags:
- Linux LFS
---

When something simple goes wrong, frustration is never proportionate to the anticipated ease.

On Ubuntu 16.04 on a Fresh install, I came across this cracker.

```bash
sudo apt-add-repository ppa:git-core/ppa
Cannot add PPA: 'ppa:~git-core/ubuntu/ppa'.
ERROR: '~git-core' user or team does not exist.
```

Ok. Must be a typo. After spending twenty seconds or so on this, which is still way too long to be looking for typos on something so simple, it isn’t a typo.
This information comes straight out of the git community. Pun intended; what a git.

After cracking some knuckles and blowing warm air on my finger tips, I went on the hunt for a fix.

Most of the Google results for this issue gravitates around proxy devices interfering with the traffic. Being on corporate wifi, this is entirely possible.
After tethering to my cell phone, rebooting the OS and clearing out some caches, the issue persisted. Adding the sources to apt manually also failed.

There is always more than one way to skin a cat and in my case, installing via package cloud worked.

```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
```

In this world of virtualisation and micro-services, things like this are just infuriating, however, we always have options!