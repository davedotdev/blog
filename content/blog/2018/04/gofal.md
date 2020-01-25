---
title: "goFAL - File Abstraction in Go"
date: 2018-04-24T10:00:00+00:00
image: images/blog/arsonistgopherported.png
author: David Gee
description: "goFAL - File Abstraction in Go"
signoff: Dave
categories:
- Golang
tags:
- Golang
---

When writing scripts that create or manipulate file and directories, it’s all too easy to get lost using `chmod` and `chdir` operating system directives. Move here, do that, change this, write that. Bah. Unless you track very carefully what directory your script is working in, it’s all too easy to get lost. There is always an easier way.

After a quick hunt around using my Google powers and checking out various Go sites, I didn’t find what I was looking for. That might have been due to not looking for the right thing or using the correct keywords, but find it I did not. Therefore, the next logical step was to build what I required, then consume. The result may prove useful.

__How do we use it?__

1. Build a root node
2. Add directories or files using the concept of parents
3. Generate the tree
4. Manipulate the file contents
5. Generate hashes
6. Set permissions
7. Use

Steps 1 through 6 rely on exported package level functions with package level constants for ease of use.

*__What does goFAL stand for?__* goFAL = `Go File Abstraction Layer`.

#### Example

The example makes use of Godeps, so restore the dependencies with ease and build.

```bash
cd exampleCode
godep restore
go build
./exampleCode
```

This assumes a working Go toolchain install. I always work with the latest stable. Simples.

This example involves:

1. Create root directory
2. Create content directory
3. Create file in root directory
4. Create file in content directory

Each file and directory has permissions associated with them. Hashes will only be calculated for files.

Source code is [here](https://github.com/arsonistgopher/gofal.git).

```golang
/*
Copyright 2018 David Gee

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"fmt"
	"os"

	"github.com/Sirupsen/logrus"
	gf "github.com/arsonistgopher/gofal"
)

func main() {

	/*
		Example of how to use the goFAL package.

		goFAL builds a tree of file type instances. This tree is then used
		to build a real file tree when the correct package functions are called.
		Each file has both SHA1 and SHA256 hashes calculated for easy use.

		This was created to make projects easier to build for packaging and scripting.

		This is an alpha release at best and comes without support.

		Author: David Gee
		Copyright: David Gee
		Date: 20th April 2018
		Contributors welcome!
	*/

	logrus.Info("--- Welcome to the goFAL Demo ---")

	// Create root node called 'build'
	build, err := gf.BuildRoot("build", os.ModePerm)
	if err != nil {
		logrus.Error(err)
	}

	// Add a content directory called 'content' and set the permissions
	content, err := gf.BuildNode(build, "content", os.ModePerm, gf.DIR)
	if err != nil {
		logrus.Error(err)
	}

	// Add a file under the build directory called 'content1' and set perms
	file1, err := gf.BuildNode(build, "content1.txt", 0444, gf.FILE)
	if err != nil {
		logrus.Error(err)
	}

	// Add a file under the content directory called 'content2' and set perms
	file2, err := gf.BuildNode(content, "content2.txt", 0444, gf.FILE)
	if err != nil {
		logrus.Error(err)
	}

	// Generate file tree on disk
	err = gf.Generate(build)
	if err != nil {
		logrus.Error(err)
	}

	// Insert content
	file1Content := []byte("Hello from ArsonistGopher once.")
	file2Content := []byte("Hello from ArsonistGopher twice.")
	err = gf.FileWrite(file1, file1Content)
	if err != nil {
		logrus.Error(err)
	}
	err = gf.FileWrite(file2, file2Content)
	if err != nil {
		logrus.Error(err)
	}

	// Create hashes using the build root as an anchor
	err = gf.BuildHashes(build)
	if err != nil {
		logrus.Error(err)
	}

	// Set permissions (post writing) as per tree data
	err = gf.SetPerms(build)
	if err != nil {
		logrus.Error(err)
	}

	// Uncomment line below to print build info
	// fmt.Println(build.String())

	// Because we have a String() method, we can also call print directly. Uncomment line below.
	// fmt.Print(build)

	// This builds our stringfied object tree
	fmt.Println(build.TreeString())
}
```

Note, it’s possible to print out string representations of the tree nodes in a couple of ways which includes the full tree with hierarchical indentations. Two examples below. TreeString will print the tree from the perspective of the node that `TreeString()` is being called on.

```plaintext
fmt.Println(<node>)
fmt.Println(<node>.TreeString())
```

Tree output as follows:

__Dir/File Perm(Octal)__

```bash
build                   0755
├── content             0777
│   └── content2.txt    0444
└── content1.txt        0444
```

__ToDo__
1. Write some tests
2. Add signature capabilities for specific branches or the tree

#### The Burn Down
This made my life easier!

### Contributing
Fork and work on master. Create PR and I’ll review.
