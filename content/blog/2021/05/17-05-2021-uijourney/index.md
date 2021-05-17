---
title: "My UI Skill Building Journey - Week One (17-21 May 21)"
date: 2021-05-17T10:00:00+00:00
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

---

Initially I'll commit 30 minutes per day to this. That should be long enough for new material to stick and short enough so that some new info doesn't converyorbelt other new info through my brain and out the other side. 
Jumping in with both feet, I started the Pluralsight course (https://www.pluralsight.com/paths/building-web-applications-with-react).

# Monday 17th May 2021

So far, the presenters style is compatible and some interesting points were observed:

* React is a library based on JavaScript
* It's a declarative means for describing human interfaces
* React is described as small - *doesn't feel like it currently*
* The author said "without React, we would have to build interfaces with native web APIs and JavaScript. That's not as easy - *I find that easier, but won't end up with maintainable or readable code*
* React gives developers the ability work with a virtual browser than the real browser - *Ook, not sure what this means yet*
* The React API is small, then it's plain ol' JavaScript - *This may be an issue, my JS skills are also non-existent*
* Can use React skills for mobile too - *Woohoo!*
* React is released after thorough testing by Facebook
* React can describe stateful UI and state

You can read [this article](https://jscomplete.com/why-react) referenced from the course for more information on React and why.

React has three fundamental components:

__1. Components (like functions)__

* Like functions
* Re-usable
* Receive input objects
* Output user interface descriptions
* Components can contain other components
* Use as a regular HTML element
* Can have private state

Two versions: Function Component and Class Component, with an ask to use Function Components.

'Props' and 'State' are inputs and 'DOM' is the output.
Props are explicitly passed in. The state object can be changed whereas the props are immutable.


__2. Reactive Updates__

React will take care of browser updates and do it so we don't have to worry about it, even partial updates.

__3. Virtual views in memory__

We use JavaScript to generate HTML instead of creating HTML. 

No HTML templates. It also does 'Tree reconciliation' and compares versions of the view in memory to figure out what to update. *Neat*

---
#### What the fresh hell

Urgh. There is something called JSX which is a form of JavaScript that looks like HTML, that is compiled to JavaScript. This won't at all be confusing.

```javascript
class Hello extends React.Component {
    render () {
        return (
            <div className="container">
                <h1> Getting Started</h1>
            </div>
        )
    }
}

ReactDOM.render(<Hello />, mountNode);
```

The code above is the same as the below - */sob*:

```javascript
class Hello extends React.Component {
    render () {
        return (
            React.createElement("div", { className: "container"},
            React.createElement("h1", null, "Getting Started"))
        );
    }
}

ReactDOM.render(React.createElement(Hello, null), mountNode);
```

Ok, after typing the above, I can see why the JSX is nicer. So this isn't HTML templating, but some form of dodgy HTML transpilation - *don't quote me on this*.

#### Playground

This is neat. There is a website sandbox, much like JSFiddle, Go's Playground and many others that is dedciated to React.

https://jscomplete.com/playground

This environment supports JSX and ES2015+ JavaScript. This could be useful as I follow along like Elmo.

```javascript
// Grab the mountNode for displaying content

document.getElementById("mountNode").innerHTML = "Hello";
```

There is also a React Developer Tools browser extension - *Yes, I installed that*. The extension allows us to interact with React components. The initial example is to observe the state when the broswer separator bar is dragged and watch the Width value change. Ok, this is cool. I know very little about debugging with browsers other than basic inspection capabilities.

It is worth noting, that 'mountNode' above in the code example is where we want React to take over in the HTML document object model (DOM). In this case, the playground has an element called `mountNode` which is what React renders to. I had a bit of a hack around, turns out you can render to elements within the iFrame of the output HTML document.

Some more code is below. The function returns JSX code and the playground has JSX built in (else it wouldn't work). You call the JSX into existence through the `<Hello />` call in the render function, then divert the DOM output to the `mountNode` element. 

```javascript
function Hello() {
  return <div>Hello React!</div>;
}

ReactDOM.render(
  <Hello />,
  document.getElementById('mountNode'),
);
```

You can use https://babeljs.io/repl to play with JSX and watch it transpile to React code.

#### Monday Note Worthy Items

1.  Name your React components with an initial upper-case letter, else React will think they're HTML elements.
2.  Make sure JSX is installed if using it.

#### Monday Progress

I got up to and finished `Your First React Component` on Monday with the [React: Getting Started Pluralsight](https://www.pluralsight.com/paths/building-web-applications-with-react) course by Samer Buna.

So far so good.

#### Monday Issues

Immediately I've hit a roadblock in so much as JavaScript. I do not know it. There is a course by Samer which looks to be reasonable: https://jscomplete.com/learn/complete-intro-modern-javascript 

# Tuesday 18th May 2021

Coming tomorrow...

