---
title: "Golang: Exercising pointers, interfaces, functions and wrapping"
date: 2016-07-03T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Golang: Exercising pointers, interfaces, functions and wrapping"
signoff: Dave
categories:
- Golang
tags:
- Golang
---

![gophercloud](/images/blog/gophercloud.png#center)

This article is inspired by my somewhat confused learning experience with interfaces, methods and wrapping functions in Golang. Needless to say, there was some serious learning to do here given first of all I was a C junkie then moved swiftly to Python for ease and speed in the networking world. Lots to learn.

#### Golang

The reason for concentration on Golang? It’s simple, powerful, quick to compile and massively supported with a vibrant community. A little like the film ‘Lock Stock and Two Smoking Barrels’, I take the tenet of ‘guns for show, knives for a pro’ approach with Python and Golang; roughly translating to Python for proof-of-concepts, speed and simple apps, Golang for performance and services. Therefore knowing how interfaces, pointers, types and methods based on types are critical knowledge components!

#### Show me the code

The code below is an exercise of interfaces, function wrapping, pointers and mixing usage of them all. It does not cover why you might want to do it, so go and learn that yourself. Pointers are great for highly optimised applications and can also save memory if used correctly. With Golang’s garbage collection, worrying about freeing memory is not an issue. Exercise 6 will not compile when you uncomment and try to. Creating a pointer to an interface doesn’t work due to what an interface is, a two word object.

![golang_pointers](/images/blog/golang_pointers.png#center)

Try it, read the error then read the links at the bottom of this article to help it make more sense. The code by the way converts the text to the decimal ASCII representation of the text and then it returns the length of the text along with an error which is <nil>, so do not be alarmed when you see blocks of data.

```go
/*

Copyright David Gee 2016

License
View license here https://creativecommons.org/licenses/by/4.0/

This code exercises creating types, methods on those types and wrapping functions, also pointers.

*/

package main

import (
	"fmt"
	"io"
	"strings"
)

// Types

type WriteFunc func(p []byte) (n int, err error)

type interfaceWrite interface {
	Write(p []byte) (n int, err error)
}

// Funcs

func (wf WriteFunc) Write(p []byte) (n int, err error) {
	return wf(p)
}

func myWrite(p []byte) (n int, err error) {
	fmt.Printf("Byte array = %v, String = %v\n", p, string(p))
	// returns length of p (n int) and the err of type error, which is nil
	return len(p), nil
}

// Main entry()

func main() {
	// This example uses io.Copy and the Write() invocation
	fmt.Println("Exercise [1] ==== Variable invocation of WriteFunc(myWrite)")
	fmt.Println(io.Copy(WriteFunc(myWrite), strings.NewReader("Hello")))
	fmt.Println("Exercise [1] ==== END \n\n")

	// Create a variable based on the type WriteFunc
	// and fill it with custom function myWrite()
	var a WriteFunc
	a = myWrite

	// next, we call the Write method on the type WriteFunc, which happens to point at myWrite
	fmt.Println("Exercise [2] ==== Write method invocation on the var a which is of type WriteFunc, containing myWrite")
	fmt.Println(a.Write([]byte("Hello")))
	fmt.Println("Exercise [2] ==== END \n\n")

	// Here we invoke Write directly on the type, wrapping myWrite as we do it
	fmt.Println("Exercise [3] ==== Write method invocation on the WriteFunc type, being passed the func myWrite directly")
	fmt.Println(WriteFunc(myWrite).Write([]byte("Hello")))
	fmt.Println("Exercise [3] ==== END \n\n")

	// Let's create an interface var. Note, you can do this as a pointer using new()
	var b interfaceWrite
	b = WriteFunc(myWrite)

	// We point it at WriteFunc with the myWrite custom func wrapped
	fmt.Println("Exercise [4] ==== Write method invocation on the interface typed variable of b")
	fmt.Println(b.Write([]byte("Hello")))
	fmt.Println("Exercise [4] ==== END \n\n")

	// Now let's do this with a pointer

	// Create pointer using new to WriteFunc type
	c := new(WriteFunc)
	// Point contents of c type WriteFunc to myWrite func
	*c = myWrite
	// Invoke Write method on c
	fmt.Println("Exercise [5] ==== Pointer based Write method invocation on the WriteFunc type, pointed at the myWrite func")
	fmt.Println(c.Write([]byte("Hello")))
	fmt.Println("Exercise [5] ==== END \n\n")

	/*
		DO THIS BIT LAST - Interesting outcome
		Let's do a pointer to an interface, and point that at the WriteFunc type passing the function myWrite
		When you've got the above working, uncomment below and run it.
	*/

	// d := new(interfaceWrite)
	// *d = WriteFunc(myWrite)
	// fmt.Println("Exercise [6] ==== Pointer based Write method invocation on the interfaceWriter interface, pointed at the wrapped myWrite func")
	// fmt.Println(d.Write([]byte("Hello")))
	//	fmt.Println("Exercise [6] ==== END \n")

	/*
		I knew this wouldn't work because I did some homework!

		Interface values are represented as a two-word pair giving a pointer to information
		about the type stored in the interface and a pointer to the associated data.

		Not sure if it's possible to separate these pointers? Not sure why you would want to either.

	*/

	// Next, let's set up a pointer as exercise 5 and create an interface to that pointer

	// Create pointer using new to WriteFunc type
	e := new(WriteFunc)
	// Point contents of c type WriteFunc to myWrite func
	*e = myWrite

	var ei interfaceWrite

	ei = e
	// Invoke Write method on c
	fmt.Println("Exercise [7] ==== Interface based method invocation on a pointer to the wrapped myWrite func via WriteFunc")
	fmt.Println(ei.Write([]byte("Hello")))
	fmt.Println("Exercise [7] ==== END \n\n")

}
```

__Halt! This is on GitHub, do this the easy way__

The code is on GitHub, so download it the easy way to play. 

```bash
go get http://github.com/davidjohngee/go-iface-ptr-meth-wrap-func
cd $GOPATH/src/github.com/davidjohngee/go-iface-ptr-meth-wrap-func
go build
./go-iface-ptr-meth-wrap-func
```

__Golang: Remember!__

Golang is fast, efficient for computers
Golang is fun, fast for humans

Programs compile to machine code. There’s no VM
Control over memory layout, fewer indirections

Simple, concise syntax
Statically linked binaries
Function values and lexical closures
Built-in strings (UTF-8)
Built-in generic maps and arrays/slices
Built-in concurrency
No classes
No inheritance
No constructors
No final
No exceptions
No annotations
No user-defined generics

__Other reading and sources of data__

Links below refer to articles that provide explanations of certain concepts

Look at answer 81

[http://stackoverflow.com/questions/13511203/why-cant-i-assign-a-struct-to-an-interface](http://stackoverflow.com/questions/13511203/why-cant-i-assign-a-struct-to-an-interface)

Look at answer 22

[http://stackoverflow.com/questions/13255907/in-go-http-handlers-why-is-the-responsewriter-a-value-but-the-request-a-pointer](http://stackoverflow.com/questions/13255907/in-go-http-handlers-why-is-the-responsewriter-a-value-but-the-request-a-pointer)

A good bed time read!

[http://research.swtch.com/interfaces](http://research.swtch.com/interfaces)

This article is what triggered my curiosity around wrapping functions

[http://stackoverflow.com/questions/20728965/golang-function-pointer-as-a-part-of-a-struct](http://stackoverflow.com/questions/20728965/golang-function-pointer-as-a-part-of-a-struct)

