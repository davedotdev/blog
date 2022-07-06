---
title: "Candytext: Building an npm package"
date: 2022-07-06T10:00:00+00:00
image: images/blog/diary_entry_header.png
author: David Gee
description: "Building an npm package for some useful functionality"
signoff: Dave
mermaid: false
categories: 
- npm
- package building
tags:
- npm
- package building
---

There are lots of great blog posts and instructional examples on how to build packages and push them to `npm` or [GitHub Packages](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages). If you've ever done anything javascript related, there is almost a 100% probability you've installed a package from a repository like this:

`npm install thing --save`

Then there are the reasons as to why you would build an `npm` hosted package and mine was a set of common functionality that I kept copying into projects to use again and again. Brace yourself; my version of functionality might be your version of stupid. 

If you've never created and pushed a package to a registry, there is great article written by Alex Eagleson *(link at the bottom of this post)* on pushing one to the [GitHub package repository](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages) system. The same approach works for the [npmjs](https://www.npmjs.com/) registry with a couple of tweaks to the `package.json` file.

## What did I build?

A simple package written in Typescript with three React functional components. Those components are below and the source code on GitHub repository is here: [https://github.com/davedotdev/candytext.git](https://github.com/davedotdev/candytext.git). I called it Candytext because it's sugar coating of text!

__Pluralise__
does nothing more than pluralise a word if a count value warrants it. It accepts a `word` and a `count` property. Count can be a `number` or a `boolean` value. If count is above `1` or `true`, then the word has an `s` appended. I had some horrendous looking code to do this and it made it awful to read. 

__PrettyDate__ and __PrettyDateTime__
are similar. They both accept an `inputdate` property and optional `timezone` property. They output a string which represents a prettified date such as: `6th July 2022` or `10:00 PM 6th July 2022`. The `inputdate` property can be of types: `momentJS`, stringified `Date`,  `ISO8601` string or an `epoch` in milliseconds or seconds.

## Tests

Yes, each component has tests. They are here: [https://github.com/davedotdev/candytext/tree/main/src/tests](https://github.com/davedotdev/candytext/tree/main/src/tests).

{{< img src="candytext_npminstall.gif" alt="candytext_test" >}}
<br/>
<br/>

## Storybook

I'm a huge fan of Storybook and it's really changed how I've approached building React components and tweak them. I opted to include Storbook files for this library so you can use them without requiring a test harness.

{{< img src="candytext_storybook.gif" alt="candytext_storybook" >}}
<br/>
<br/>

## Using These Components

In your React app, these components are straight forward to use.

1.  Install: `npm install candytext`
2.  Import the component:

Here is a codesandbox example for Pluralise!: [https://codesandbox.io/s/pluralise-test-harness-v0lj3j](https://codesandbox.io/s/pluralise-test-harness-v0lj3j)

{{< img src="candytext_codesandbox.gif" alt="candytext_codesandbox" >}}
<br/>
<br/>

## TL;DR

I built a small set of React components for webapps that need some sugar adding to strings and put the package up on npmjs and GitHub's package system. In addition, the components have tests, Storybook stories and examples of Codesandbox use so you can play around.

## Reading Material

 [How to Create and Publish a React Component Library by Alex Eagleson](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe) is a really great post covering an end-to-end example.

 [How to publish packages to npm](https://zellwk.com/blog/publish-to-npm/) isn't as comprehensive, but it's a good read.

 [SPDX License Types](https://spdx.org/licenses/) is a handy reference. I'd never heard of SPDX prior to building this library and it was nice to learn something new. When doing things like `npm init`, it will ask you for a license type. You can pull one from this list.

 [IANA TimeZones](https://www.iana.org/time-zones) is a really important site that contains the browser time-zones that you're likely going to use in your web apps. I tested with a number of them for the `PrettyDate` and `PrettyDateTime` components. Good to have an official list instead of just pulling them from Stackoverflow.




