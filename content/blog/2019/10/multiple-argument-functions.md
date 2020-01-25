---
title: "Multiple Argument Functions"
date: 2019-10-07T10:00:00+00:00
image: images/blog/arsonistgopherported.png
author: David Gee
description: "Multiple Argument Functions"
signoff: Dave
categories:
- Golang
tags:
- Golang
---

[Dave Cheyney, Wizard extraordinaire](https://dave.cheney.net/2019/09/24/be-wary-of-functions-which-take-several-parameters-of-the-same-type) posted a challenge on clarity for multi-argument functions. It got me thinking and whilst trying to consume a sawdust and milk breakfast arrangement, I let my brain chew on the post. An excerpt from Mr Cheyney’s original post is below.

#### A Challenge

When this situation is unavoidable my solution to this class of problem is to introduce a helper type which will be responsible for calling CopyFile correctly.

```golang
type Source string

func (src Source) CopyTo(dest string) error {
    return CopyFile(dest, string(src))
}

func main() {
    var from Source = "presentation.md"
    from.CopyTo("/tmp/backup")
}
```

In this way CopyFile is always called correctly and, given its poor API can possibly be made private, further reducing the likelihood of misuse. Can you suggest a better solution?

#### An Alternate Way?

Not sure mine is a better solution, but is this an acceptable alternate solution? Both solutions require the use of a type, where one uses a method and the other a plain ol’ function. I’m not brave enough to take on such a wizard, but there’s nothing stopping me from making a straw Dave and throwing rocks at it.

```golang
type fileCopyParts struct {
    source string
    dest   string
}

func Copier(f fileCopyParts) error {
    return CopyFile(f.dest, f.source)
}

func main() {
    f := fileCopyParts{source: "presentation.md", dest: "/tmp/backup"}
    err := Copier(f)
    if err != nil {
        // etc
    }
}
```

Wind the clock forward some 20 minutes of beard scratching ponder, I trashed my sketchy proposal on the grounds of single-use and code for the sake of code. Despite there being absolute discrimination for the parts going into the copier, it strikes me more of a factory approach than solution. I think it’s simple but it doesn’t bode well if we’re also trying to re-use code in a standard way through interfaces in much the same way the standard API handles this.

Why write about it? For personal posterity and for me to laugh at when I do this again when I search Google for opinions.

