---
title: "My UI Skill Building Journey - Week Six (End June 21)"
date: 2021-06-30T10:00:00+00:00
image: images/blog/uijourney_header.png
author: David Gee
description: "My UI dev skills journey...and getting them"
signoff: Dave
mermaid: true
categories: 
- uijourney
tags:
- Software Development
- UI
draft: true
---

# Thursday 

A fair amount of doing and learning has happened in the last month and there are some conclusions worth font-based screen estate.

#### Templating on Steroids

React is templating on steroids, with callbacks into JavaScript. For example, if the value of a text box changes, you can call a JavaScript function into the template data. The template data in React is typically with JSX (looks like HTML) with a mix of HTML. The ultimate take is, you can have higher order components, calling other components (which return page content) as well as pure HTML if you so desire. 

#### Lack of Hacks?

React has the concept of hooks which allow you to deal with things like state and page load events using a native method to React instead of JavaScript hacks. A huge gain to this is lots of example code organises around hooks and instead of a million ways to solve a challenge, React reduces the problem space nicely and many blog posts tend to converge on repeatable patterns. I love this aspect.

If you don't care about React's entire approach but like the hooks, there is a framework called [`Haunted`](https://github.com/matthewp/haunted) (thanks to Matt Oswalt for pointing this out to me!) which focusses on React hooks.

#### State

You can manage state either individually as part of React hooks like `useState` which returns a reference to the state (more on this in a minute) and an update function. Note, if you update the state and re-read it in the same function, you will get the previous value because of the async nature of useState. Accessing the current value can be handled relatively simply if you want to work with the latest value, there are some lovely methods of doing it. It took me a while to find nice methods without it feeling like hackery.

Method 1: Use a `useRef` (works but hacky)
```javascript
function Example() {
  const [count, setCount] = React.useState(0)
  const stateRef = useRef();

  stateRef.current = count;
  // stateRef will now have the current value
}
```

Method 2: Use a module that someone wrote to make this easier
```javascript
import useState from 'react-usestateref'

function Example() {
  const [count, setCount,counterRef] useState(0)
  // counterRef holds the current value. Simple eh.
}
```

Method 3: Use `useEffect` to work on the data once it's changed
```javascript
function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("useEffect", count);
  }, [count]);
}
```

There are other methods which involve indexing into count, but don't do that. The other option is something like Redux with one or more reducer functions.

#### Functional Approaches

React can be used in an OOP way with classes with closures, or you can opt to go functional all the way. I chose the latter after puking a little in my mouth when reading code scattered with class declarations. It seems so much simpler to deal with React hooks and closures. The functional approach is all about passing function closures to other components and references. Also, it's possible to use the fat arrow below to embed functions inside of functions that return functions. Get it?

```javascript
  const [count, setCount] = useState(0);
  // other code
  setCount(count => count + 1);
```

The idea here is that the setCount returned updater function has a functional form, in which it returns the previous value. Here, the count to the left hand-side of the fat arrow `=>` is a reference to the original value and the right hand side is a form of a function in which we post the previous version of count and add 1 to it. I love this. So simple. This form is used a lot when say expanding arrays. You can also spread out the original contents using the spread operator `...`  in the case where count is an array.

#### Libraries

React requires you install a metric ton of libraries. Some are stupid simple and others are more complex. You will require some JavaScript knowledge, HTML, CSS and server-side knowledge if you want to create meaningful functionality. 

Some libraries and components that you will use won't have any React functionality and you'll be required to do classic JavaScript stuff, like reference a html element using `useRef` to get access to values and state.

#### Frameworks & Templates

I've found multiple approaches to building things work quite well. One is to use a template like Material UI or Themeberg's Volt, the other is to go down the native route. The former is more fun and provides a lot of the heavy lifting.

#### Getting Started

The `create-react-app` is powerful and simple for getting started. It provides in my somewhat new opinion, the perfect amount of scaffolding to build out new apps.

```bash
npx create-react-app my-app
cd my-app
npm start
```

The new app `my-app` will be served using the development webserver and you can hack around until your heart is content.

#### Storybook

I have to admit that I didn't understand the point of Storybook until I got knee-deep in React development. Storybook provides a means of focussing on building the components you need for your product or project, without worrying about the complexities of deployment and build pipelines. Storybook is really useful and now "FINALLY" get it.

https://storybook.js.org/

#### This Blog

As part of skilling up with React, I've enabled the blog to work with React components so I can show as well as tell. In the blog frontmatter, you reference a script and in the blog create a `div` that the React component referenced in the script will render. Simple right? It's proved incredibly useful as an educational piece and in the future if I want to show future me some stuff past me did, it's all possible!

In the front matter for each post:

```bash
scripts:
- scripts/ui_journey_app_1.jsx
```

This script is stored in the `assets/scripts` directory.

#### Wrap

This skilling-up will continue in the background, but I suspect the major gains have been had. Anything that's revelational I'll post to act as a record and reminder, but the focus will subside.