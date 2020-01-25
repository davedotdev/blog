---
title: "Git For Network Engineers"
date: 2015-04-07T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Git For Network Engineers"
signoff: Dave
categories:
- Git
tags:
- Git
---

What is Git?

![git-logo](/images/blog/git-logo.jpg#center)

Git is a source control manager (SCM), also known as revision control. It manages changes to documents, computer programs and large websites. Arbitrarily it can manage versioning for collections of information.

Why is it important to network engineering? Well, currently we stick the config files in a directory and forget about them. Version control can be very regimented with commit comments and other markers, which helps to identify information. More importantly, as we move towards DevOps with open arms, we have to think about managing what we do in different ways. Just because something has been done a certain way, doesn’t mean it’s good to continue with that modus operandi.

Fear not – just because something is hidden away in a repository, doesn’t mean you can’t diff files etc.

Also you don’t have to have just local git repositories, you can have them on remote servers as well as the likes of [github.com](https://github.com/).

Before we start, be warned that this is a very simple example. You can use this for managing all sorts of configurations like core routers, firewall access-list entries, hell, even change control data. Be mindful of what you push and commit!!! Ensure that you secure your `.git` repository well.

{{<infobox>}}
Turns out it is git’s 10th birthday the week this article was intended to be published. Happy birthday you old Git! 😀
{{</infobox>}}

#### Installing Git

Git is really simple to install. Most operating systems have pre-made packages/binaries available so use those unless there is a burning desire to build from source.

__Debian__

`apt-get install git`

__Fedora__

`yum install git`

__Windows__

[http://git-scm.com/download/win](http://git-scm.com/download/win)

__OSX__

[http://git-scm.com/download/mac](http://git-scm.com/download/mac)

#### So how can I use it and why do people bang on about it?

Git is a version control system. Simple. It allows you to check in and check out files in to branches. These branches can then be later merged in to another branch or master pending change review (normally code sign off on something like Gerrit – not covered here for simplicity and brevity).

If you can get in to the habit of using git, your life will be easier when you start mingling with the DevOps community who use this stuff day in day out amongst other tools.

#### Creating a repository – also known as a repo

You create a repo by issuing the below in a directory of your choosing. Here is an example on OSX. You can do this on Windows and Linux using the same workflow (maybe not using the exact same bash sequence or syntax!)

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ pwd
/Users/davidgee/TESTGIT

Davids-MacBook-Pro-2:TESTGIT davidgee$ git init
Initialized empty Git repository in /Users/davidgee/TESTGIT/.git/
```

Adding files to the repo
Let’s create a simple text file and add it to the repo.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ touch hostname.txt

Davids-MacBook-Pro-2:TESTGIT davidgee$ echo "HOSTNAME=IPENGINEER" > hostname.txt

Davids-MacBook-Pro-2:TESTGIT davidgee$ cat hostname.txt 
HOSTNAME=IPENGINEER
```

For instance I have just created a directory, initialized a git repo and placed the text ‘HOSTNAME=IPENGINEER’ in to a text file called ‘hostname.txt’.

Next, lets add the file to the repo

`git add hostname.txt`

We can check the status of the git repo to make sure the file has been added:

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached ..." to unstage)

	new file:   hostname.txt
```

At this point we have a file added to the repo, but we haven’t committed it to the project history. This means it’s kind of cached and git knows about it, but it’s not actually checked in until it’s committed. We therefore add it to be committed and then commit it.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git commit -a -m "Initial commit"
[master (root-commit) 7a684a2] Initial commit
 1 file changed, 1 insertion(+)
 create mode 100644 hostname.txt
```

The -a switch means ‘all’ modified files and the -m switch adds a message to the commit.

Let’s take a look at the status of the repo now we have added a file to it:

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git status
On branch master
nothing to commit, working directory clean
```

Using the standard git tooling, we can also take a look at the files in git along with the information around the commit. Be warned, sometimes this can be a lot! The –abbrev-commit switch allows us to see a shorter version of of the commit ID that in this case is: 3dc5449 instead of the 40 byte hexadecimal monster.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git ls-files
hostname.txt

Davids-MacBook-Pro-2:TESTGIT davidgee$ git show --abbrev-commit
commit 7a684a2
Author: DavidJohnGee 
Date:   Tue Apr 7 17:52:58 2015 +0100

    Initial commit

diff --git a/hostname.txt b/hostname.txt
new file mode 100644
index 0000000..ef07d9e
--- /dev/null
+++ b/hostname.txt
@@ -0,0 +1 @@
+HOSTNAME=IPENGINEER
```

Note the bottom line? ‘+HOSTNAME=IPENGINEER’.

Now we’re cooking!

#### Branches

So what is a branch? A branch is a checked out version of the repo. You can create a branch called ‘shonky’ for example and checkout the current master repo content in to it. You could add all sorts of rubbish to the branch without it affecting anything else. At this point, we only have the one branch, which is the master. To check what branch you’re on do this:

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git branch
* master
```

To create a branch, you use the same ‘git branch’ input, however place a name after the branch part.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git branch shonky

Davids-MacBook-Pro-2:TESTGIT davidgee$ git branch
* master
  shonky
```

So now, let’s practice switching to the branch using ‘checkout’ which checks out something in to the directory. We’ll also modify the content of the hostname.txt file but not commit it.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git checkout shonky
Switched to branch 'shonky'

Davids-MacBook-Pro-2:TESTGIT davidgee$ git branch
  master
* shonky

Davids-MacBook-Pro-2:TESTGIT davidgee$ git status
On branch shonky
nothing to commit, working directory clean

Davids-MacBook-Pro-2:TESTGIT davidgee$ cat hostname.txt 
HOSTNAME=IPENGINEER

Davids-MacBook-Pro-2:TESTGIT davidgee$ echo "HOSTNAME=SHONKY" > hostname.txt 

Davids-MacBook-Pro-2:TESTGIT davidgee$ cat hostname.txt 
HOSTNAME=SHONKY

Davids-MacBook-Pro-2:TESTGIT davidgee$ git commit -a -m "Changed hostname to SHONKY"
[shonky d25bec7] Changed hostname to SHONKY
 1 file changed, 1 insertion(+), 1 deletion(-)

Davids-MacBook-Pro-2:TESTGIT davidgee$ git show
commit d25bec7f98e11b1a5692c587d1c219aee46343f7
Author: DavidJohnGee 
Date:   Tue Apr 7 17:55:58 2015 +0100

    Changed hostname to SHONKY

diff --git a/hostname.txt b/hostname.txt
index ef07d9e..f16ecde 100644
--- a/hostname.txt
+++ b/hostname.txt
@@ -1 +1 @@
-HOSTNAME=IPENGINEER
+HOSTNAME=SHONKY
```

At this point we have a new branch and we have committed our changes to it. Does that mean it’s overwritten the main branch? No!

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git checkout master
Switched to branch 'master'

Davids-MacBook-Pro-2:TESTGIT davidgee$ git branch
* master
  shonky

Davids-MacBook-Pro-2:TESTGIT davidgee$ cat hostname.txt 
HOSTNAME=IPENGINEER
```

See the difference? We can switch between two versions of our file, as it resides in two different workspaces, called branches! If we want to merge the changes to the master branch we can do that using the ‘merge’ feature, or we can just override the master and commit the branch in it’s entirety to the project history.

In this instance, let’s merge.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git merge shonky
Updating 7a684a2..d25bec7
Fast-forward
 hostname.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

Davids-MacBook-Pro-2:

TESTGIT davidgee$ cat hostname.txt 
HOSTNAME=SHONKY
```

Now we can delete the branch and move on.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git branch -d shonky
Deleted branch shonky (was d25bec7).
```

#### We have made a horrific mistake!!!

Oh dear god/s, we have made a terrible mistake and the world is going to end. We need to revert back the code prior to the hostname change.

We have two ways of achieving this. A heart stopping method versus a safer method.

Before we do this, we need to isolate the version we require by looking at the commits to the project history.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git checkout -b restore
Switched to a new branch 'restore'

Davids-MacBook-Pro-2:TESTGIT davidgee$ git rev-list --all --pretty --abbrev-commit
commit d25bec7
Author: DavidJohnGee 
Date:   Tue Apr 7 17:55:58 2015 +0100

    Changed hostname to SHONKY

commit 7a684a2
Author: DavidJohnGee 
Date:   Tue Apr 7 17:52:58 2015 +0100

    Initial commit
```

#### Method a) RESET < The scary one

This one involves resetting the current directory and resetting the head position (the current position of the git tracking mechanism) to our chosen restore point.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git reset --hard 7a684a2
HEAD is now at 7a684a2 Initial commit

Davids-MacBook-Pro-2:TESTGIT davidgee$ cat hostname.txt 
HOSTNAME=IPENGINEER

Davids-MacBook-Pro-2:TESTGIT davidgee$ git branch
* master
```

#### Method b) Branch and merge < the less scary one

The checkout method involves checking out the revision we require into a branch.

Ok – so our commit ID prior to the hostname change to ‘shonky’ was 7a684a2. Let’s check that out from the repo.

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git checkout -b restore
Switched to a new branch 'restore'
Davids-MacBook-Pro-2:TESTGIT davidgee$ git branch
  master
* restore

Davids-MacBook-Pro-2:TESTGIT davidgee$ git checkout 7a684a2
Note: checking out '7a684a2'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b new_branch_name

HEAD is now at 7a684a2... Initial commit
Davids-MacBook-Pro-2:TESTGIT davidgee$ cat hostname.txt 
HOSTNAME=IPENGINEER
```

Ok – that worked, but that isn’t master, however we’re good for now and we have our file content back the way it should be. When I say “good for now”, I mean we’re not going to get murdered for this change! Checkout this to a branch like

`git checkout -b potential_restore_point`

and commit it. We are not however on the master branch. We can merge to make this happen like we did before. I won’t do this, but will leave it to your curiosity.

#### Cloning from a public repo

Ok – so you have located a project you want a copy of. How does that work? Well, you clone it using git like this:

`git clone https://github.com/blah/blah`

Once this has been done, you will need to change in to the directory that git has cloned the repo in to.

#### How about pulling?

Git can be used to fetch and pull remote repositories.

`git fetch`

will pull any new work and

`git pull`

will fetch and merge a remote branch into your current branch.

Keep a track of what branch you are in at all times else face potential disaster!!!

```bash
Davids-MacBook-Pro-2:TESTGIT davidgee$ git clone https://github.com/davidjohngee/ipngnc
Cloning into 'ipngnc'...
remote: Counting objects: 100, done.
remote: Total 100 (delta 0), reused 0 (delta 0), pack-reused 100
Receiving objects: 100% (100/100), 150.02 KiB | 0 bytes/s, done.
Resolving deltas: 100% (41/41), done.
Checking connectivity... done.

Davids-MacBook-Pro-2:TESTGIT davidgee$ cd 
.git/         hostname.txt  ipngnc/    

Davids-MacBook-Pro-2:TESTGIT davidgee$ cd ipngnc/

Davids-MacBook-Pro-2:ipngnc davidgee$ ls -la
total 32
drwxr-xr-x  10 davidgee  staff   340  7 Apr 18:56 .
drwxr-xr-x   5 davidgee  staff   170  7 Apr 18:56 ..
drwxr-xr-x  13 davidgee  staff   442  7 Apr 18:56 .git
-rw-r--r--   1 davidgee  staff   360  7 Apr 18:56 .project
-rw-r--r--   1 davidgee  staff   423  7 Apr 18:56 .pydevproject
drwxr-xr-x   3 davidgee  staff   102  7 Apr 18:56 dist
drwxr-xr-x  14 davidgee  staff   476  7 Apr 18:56 ipngnc
drwxr-xr-x   6 davidgee  staff   204  7 Apr 18:56 ipngnc.egg-info
-rw-r--r--   1 davidgee  staff    42  7 Apr 18:56 requirements.txt
-rw-r--r--   1 davidgee  staff  2273  7 Apr 18:56 setup.py
```

With regards to working with remote repo’s, there is a link at the bottom of this article that explains things much better than I!

#### You seem to add a lot of switches in to the git commands…where do you get those from?

Good question. Git has a great –help system built right in. If you try

`git --help`

you get the common commands. If you then try a common command and –help again, you effectively get a man page. That’s the way to navigate git. There aren’t any secrets.

#### What about working with github or a remote repo?

It goes without saying you can push to Github or a remote git repo. The way to do this is:

```bash
git remote add remoterepo https://xxxxxxxxx
git remote -v
git push  
```

This post does not go into detail on this specific part of git and you should research carefully to ensure it’s what you actually want to do! The second line

`git remote -v`

outputs the repository you’ve just setup. Bare in mind your username and password will also be required for the remote repo. FINAL WARNING – ensure that you do not push accidentally any sensitive information to the public domain.

#### Where does the magic happen?

All of the magic happens with the git client, which interacts with the contents of the .git directory. The .git directory is created when you initialize git in your chosen directory and is updated when you perform actions like add and commit. If you delete the .git directory, not only do you lose git capabilities including the history, but also you’re stuck with the files you have in the branch you were in before deletion.

#### Useful links

[http://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging](http://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

[http://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes](http://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)

[http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks](http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

Check my [github repo](https://github.com/davidjohngee/githooks) github repo out which contains a hook for working with Golang

If all of the stuff around pushing to GitHub scares you, then you can use a GUI client, which is available for OSX and Windows

[https://mac.github.com](https://mac.github.com)
[https://windows.github.com](https://windows.github.com)

Finally, a great git book with an unfortunate name of “Pro Git” 🙂

http://git-scm.com/book/en/v2 which is a free guide.