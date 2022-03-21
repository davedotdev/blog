---
title: "GitHub Deploy Keys and port 443"
date: 2022-03-18T18:00:00+00:00
image: images/blog/devops_github_header.png
author: David Gee
description: "How to use multiple deploy tokens with GitHub when you can only use outbound port 443"
signoff: Dave
mermaid: false
categories: 
- devops
tags:
- devops
---
GitHub deploy keys, are single RSA key pairs locked to a single GitHub repository. It's much better for security than using an account wide RSA pair. RSA key pairs in turn are what's used for creating secure SSH sessions and interacting with Git for private repositories.

You may find yourself in a scenario where you need to use multiple private Git repositories in addition to only having certain ports open outbound! The [GitHub docs](https://docs.github.com/en/developers/overview/managing-deploy-keys) won't help much if you're looking for specific examples.

Git uses by default TCP 9418, but it can use 22 and 443 too.

This scenario comes up from time to time when outbound ports are severely limited, leaving you with TCP 443, UDP 53 and a handful of others. The challenge is doing a git clone or git pull on remote repositories with deploy tokens on a port other than 22 or 9418, i.e. 443. Here's one way of doing that.

1.  Create an RSA key for each repository you wish to interact with using git.
```bash
$ ssh-keygen -t rsa -b 4096
# Name it something specific when it asks and don't set a passphrase
```

2.  Load each public key to the git repository deploy keys section (under settings).

{{< img src="add-deploy-key.png" alt="GitHub deploy key" >}}

3.  On your server/container/whatever, create a `config` file located at `~/.ssh/config`.

This file contains some basic SSH aliases and a reference to a specific identity file/key to use.

```plaintext
# The line below is the ssh alias reference (note, not domain)
# You can use this alias with a git remote command
Host ssh.github.com-alias-1
  HostName ssh.github.com
  User git
  # Line below is the specific key
  IdentityFile /home/user/.ssh/github_repo1.id_rsa
  IdentitiesOnly yes

Host ssh.github.com-alias-2
  HostName ssh.github.com
  User git
  IdentityFile /home/user/.ssh/github_repo2.id_rsa
  IdentitiesOnly yes
```

4.  Try logging into github with this:

`ssh -T -p 443 git@ssh.github.com-alias-1`

If your token has been loaded correctly and you're targeting the right repository, you should be able to verify your authentication capability! You won't get a terminals session, but you will get a friendly message like below.

```bash
$ ssh -T -p 443 git@ssh.github.com-alias-1
  Hi davedotdev/repo-1! You've successfully authenticated, but GitHub does not provide shell access
```

5.  Now the bit you've been waiting for. If you've created deployment keys for `alias-1` and `alias-2` as an example, you can then try doing a git clone for each repo using their specific deployment keys. This is how to do a git clone for private repositories over port 443 on a limited system (because security told you no!).

```bash
git clone ssh://git@ssh.github.com-alias-1:443/YOURACCOUNT/YOURREPO-1.git
git clone ssh://git@ssh.github.com-alias-1:443/YOURACCOUNT/YOURREPO-2.git
```

#### Summary

So, there you have it. Separate GitHub deploy tokens for private repository interaction over HTTPS.