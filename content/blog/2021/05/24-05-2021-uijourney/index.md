---
title: "My UI Skill Building Journey - Week Two (24-30 May 21)"
date: 2021-05-24T10:00:00+00:00
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
scripts:
- scripts/ui_journey_app_1.jsx
- scripts/ui_journey_app_2.jsx
---

# Monday 24th May 2021

I decided to install Storybook so I can follow along on my local machine. Sandboxes are great, but they're too forgiving. I don't want forgiving, nor easy because the trainer thought of everything. Call me mad. 

I've been on training in which the labs bypass the security setup in the name of speed and simplicity. When you get to real world, you're in no better place than you were prior to the training, because you missed out the most important part. 

    Be cruel to me training for I shall rise.
    - me

Install steps to get a 14.x version of `node` working. Note, I messed this up on the first attempt due to out-of-date packages and documented approaches.

```bash
sudo apt update

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash
sudo apt-get install -y nodejs

sudo npm install -g npx

npx degit chromaui/intro-storybook-react-template taskbox

cd taskbox

# Install dependencies
npm install --global yarn
yarn

# Open this in a new terminal
yarn test --watchAll

# Open this in a new terminal (web server on port 6006)
yarn storybook

# Open this in a new terminal (web server on port 3000)
yarn start
```

Some of the above involved some Googling around and sheer luck. I touched NodeJS a long LONG time ago (seven years or so) and forgot pretty much everything I knew about `npm`. It's working for me, but your mileage may vary.

#### Monday Knowledge Gain

Turns out JSX is pretty useful. Not only can you reference components like they're HTML elements, but also you can insert expressions using curly braces.

```javascript
function Button() {
  const [counter, setCounter] = useState(0);
  return <button>{counter}</button>;
};

ReactDOM.render(
  <Button />,
  document.getElementById('mountNode'),
);
```

Doesn't take much to figure out what's going on here, but you get a button with `0` as the displayed text. The `useState` function is called a `hook`. *noted*. Samer says this is similar to a mixin or module *(I don't know what those are currently...)*.

__Behold, a button__

<html>
<button>Button that displays 0</button>
</html>
<br/>&nbsp;

I can make buttons work with HTML. They submit stuff right. 
With React, we don't want submissions. We want dynamic stuff to happen. So, the next bit was a lightbulb moment. The `onClick` handler receives a function reference and not a value. *Would this be a callback?*

What about updating the value? There are two ways you can do this; explicit function and inline function. I don't like the inline function style. The code isn't reusable, and the syntax makes me cry. Note, the contents of the curly braces are executed.

```javascript
# Inline example
function Button() {
	const [counter, setCounter] = useState(0);
	return 
    <button onClick={() => setCounter(counter+1)}>
        {counter}
    </button>;
}

ReactDOM.render(
  <Button />, 
  document.getElementById('mountNode'),
);
```

I have a feeling in true JavaScript style, having a function to handle the increment will be long winded.

Some other interesting notes, the `ReactDOM.render` function, renders a function with an output to an element. That means, you can do something like the below. The only snag is, passing properties around will be fun.

```javascript
function Display() {
}

function App() {
  );
}

ReactDOM.render(
  [<App />, <Display />], 
  document.getElementById('mountNode'),
);
```

Also with divs!

```javascript
function Display() {
}

function App() {
  );
}

ReactDOM.render(
  <div>
    <App />
    <Display />
  </div>, 
  document.getElementById('mountNode'),
);
```

A new DOM parent will be introduced with the above. React has another way to handle this.

```javascript
ReactDOM.render(
    <React.Fragment>
        <Button />
        <Display />
    </React.Fragment>,
    document.getElementById('mountNode'),
);
```

JSX has a shortcut for this with empty tags.

```javascript
ReactDOM.render(
    <>
        <Button />
        <Display />
    </>,
    document.getElementById('mountNode'),
);
```

I'm not keen on a lot of these nerd bytes. I'm looking for a re-usable pattern with functions for handling events outside of the component.

Further in the lesson, `props` was introduced. Each function receives these properties which is handy, and you can add properties to a JSX function call like this:

```javascript

function Display(props) {
    return (
        <div>{props.message}</div>
    )

<Display message={"Hello"}/>
}
```

Data flow observably goes downwards from parents through children. I.e., you can pass props downwards. *This will be interesting later I imagine*.

Parents can also flow behaviour downwards. This is one of the reasons I don't like JavaScript. You can pass a function downwards. Yeesh. Function as a prop. The author calls this 'responsibility isolation'. *I'm fighting my Go knowledge here. This would be scope?*

#### References vs Functions

One of the hardest things I'm struggling with is React needs a reference to function and not a function invokation. My attempt at a re-usable function for a button is below.

```javascript
// This is my function that receives some properties
function Button(props) {
	return (
    // props.onClickFunction is a reference to the incrementCounter
  	<button onClick={props.onClickFunction(props.increment)}>
      +{props.increment}
    </button>
  );
}

function Display(props) {
	return (
  	<div>{props.message}</div>
  );
}

function App() {
	const [counter, setCounter] = useState(0);
  
  // I don't like this bit...a function object, calling back the set method on useState()
  const incrementCounter = (incrementValue) => setCounter(counter+incrementValue);
	return (
    <div>
      <Button onClickFunction={incrementCounter} increment={1} />
      <Button onClickFunction={incrementCounter} increment={5} />
      <Button onClickFunction={incrementCounter} increment={10} />
      <Button onClickFunction={incrementCounter} increment={100} />
      <Display message={counter}/>
    </div>  
  );
}

ReactDOM.render(
  <App />, 
  document.getElementById('mountNode'),
);
```

It doesn't work and the reason it doesn't work is because I have a function call for onClick.
You have to return a reference for the function, and the syntax is ugly.

```javascript
function Button(props) {
	return (
  	<button onClick={() => props.onClickFunction(props.increment)}>
      +{props.increment}
    </button>
  );
}

function Display(props) {
	return (
  	<div>{props.message}</div>
  );
}

function App() {
	const [counter, setCounter] = useState(0);
  
  // I don't like this bit...a function object, calling back the set method on useState()
  const incrementCounter = (incrementValue) => setCounter(counter+incrementValue);
	return (
    <div>
      <Button onClickFunction={incrementCounter} increment={1} />
      <Button onClickFunction={incrementCounter} increment={5} />
      <Button onClickFunction={incrementCounter} increment={10} />
      <Button onClickFunction={incrementCounter} increment={100} />
      <Display message={counter}/>
    </div>  
  );
}

ReactDOM.render(
  <App />, 
  document.getElementById('mountNode'),
); 
```

I need to explore the syntax to get my head around this.

```javascript
onClick={() => props.onClickFunction(props.increment)}
```

What is `=>` and why does the `()` result in a reference? Golly this is confusing.

#### => The arrow function and ()

If you have kids, you probably know the cartoon 'Hey Dougie'. I'm about to earn my arrow badge.

This document helped me lots: https://www.w3schools.com/js/js_arrow_function.asp 

There is a difference between the `this` keyword when used with `=>` and not too. Be sure to read about that. 

With a regular function call, `this` represents the object that calls the function. With an arrow, `this` represents the ower of the function. *Not going to get confused by this*.

Also note, the arrow function doesn't require you to use a `return` keyword. It does that for you, along with brackets. Golly +1.

Nothing in the article that says the arrow function returns a reference, the w3schools page just says, "Arrow functions allow us to write shorter function syntax:". So how does a shorter syntax result in a reference??????? Come on JS. Do better. Is this a function expression? The author refers to this as a closure (ok, I get that).

Below, the lesson code continues, and we've got something I can at least follow.

```javascript
function Button(props) {
	const handleClick  = () => props.onClickFunction(props.increment);
  return (
  	<button onClick={handleClick}>
      +{props.increment}
    </button>
  );
}

function Display(props) {
	return (
  	<div>{props.message}</div>
  );
}

function App() {
	const [counter, setCounter] = useState(0);
  
  // I don't like this bit...a function object, calling back the set method on useState()
  const incrementCounter = (incrementValue) => setCounter(counter+incrementValue);
	return (
    <div>
      <Button onClickFunction={incrementCounter} increment={1} />
      <Button onClickFunction={incrementCounter} increment={5} />
      <Button onClickFunction={incrementCounter} increment={10} />
      <Button onClickFunction={incrementCounter} increment={100} />
      <Display message={counter}/>
    </div>  
  );
}

ReactDOM.render(
  <App />, 
  document.getElementById('mountNode'),
);
```

The next lesson covers React's tree reconciliation capabilities! This will be Tuesday's fun.

#### Monday Issues

* How does the arrow function provide a reference? I wonder if this is because the arrow function provides an anonymous function through an expression and that anonymous function can be called arbitrarily. No function signature required etc etc. I might email the author because I can't find documentation that suggests the arrow function returns a reference and my guess is the anonymous function binding with variable pass-thru is the centre of my brain issue.

* A const doesn't seem to be a const the way I understand them elsewhere. It looks like a constant reference to an object (a pointer?): https://www.w3schools.com/js/js_const.asp 

# Wednesday 26th May 2021

I had the bright idea of integrating React with this blog. It's a modified Hugo theme and with little effort I managed to include some useful capabilities. Call me stupid. I like to learn the fun stuff.

Here's what I did to get React working with JSX and Babel on Hugo.

1.  Add CDN links for React required scripts in the header partial.
```html
<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>

```

2.  Install npm, npx and follow some simple rules.

- This one was painful
- I did this work on Windows 10 with WSL. I ran into major issues with `npm` on Ubuntu for WSL, so installed `node` on Windows instead, but used Hugo from WSL. Not at all confusing.
- It was the standard Node installer for Windows 10, Nothing fancy.

3.  Initialise npm in the blog directory.

```bash
npm init
npm install -g @babel/cli @babel/core @babel/preset-env --save-dev
```

When you do these actions, a `package.json` file is created within the directory. That contains your dependencies like below.

```json
{
  "name": "blog",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/davedotdev/blog.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/davedotdev/blog/issues"
  },
  "homepage": "https://github.com/davedotdev/blog#readme",
  "dependencies": {
    "@babel/cli": "^7.14.3",
    "@babel/core": "^7.14.3",
    "@babel/preset-react": "^7.13.13"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.14.2"
  },
  "description": ""
}
```

A builder like the Netlify CICD pipeline, will consume this file and provide the resources via npm, so you don't need to include the node modules in your build.

4.  Ensure that Babel is configured (for JSX) within Hugo and the contents lie in the `babel.config.js` file. This file resides in the root of the blog.

```javascript
module.exports = function (api) {
  api.cache(true);
  const presets = [
    ["@babel/preset-react"]
    ]
  const plugins = [];
  return {
    presets,
    plugins
  };
}
```

5.  Add frontmatter keys so the footer partial template can dynamically add React code, instead of the kitchen sink approach (i.e. include all the scripts). In this instance, I added a `scripts` key and iterate over the keys if scripts are present in the footer, which acts as a dynamic import. This step is solely focussed on Hugo and works really quite well. I wasn't sure it would work to be transparent, because of the internal Hugo pipeline ordering. Turns out, it not only works, it does so rather nicely.

6.  Test by adding a DOM element and a simple script. You can find the post Babel script here: https://dave.dev/scripts/ui_journey_app_1.js

The original script isn't on the blog because it's been processed by Babel, but you can find it here: https://github.com/davedotdev/blog/blob/master/assets/scripts/ui_journey_app_1.jsx

The script is stupid and only operate a display function through a push button. It does however cement some of the javascript like behaviours together in my brain.

7.  Test by adding a DOM element that the script refers to in to this post. Directly below this section, I included the following `div` with the required elemet ID. As a result, my crappy component should be displayed below.

```html
<div id="app42"></div>
```
---

<div id="app42"></div>

---

#### Wednesday issues

1. The build system on Netlify needed some tweaks. I bumped the Go version to 1.16.4, Node version to 14.17.0 and Hugo version to v0.83.1
2. The package.json file needed some cleaning up, again creating issues on Netlfiy
3. I ended up building out the Netlify environment on a container to troubleshoot a pesky message surrounding Babel. It was a combination of issues, but as you can now see, it's working!

# Thursday 27th May 2021

Now the blog can show React & JSX demonstrations (w00t), I'll be leaving the evidence of progress directly on the blog.

I started the day off wondering more about `=>` and figured I'm missing some brain glue. I'm still reading React and JavaScript code scratching my head. This article: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions helped a LOT when it came to pinning the understanding.

I've tried to play around a bit with the understand to verify them. Below is a script from the Mozilla site:

```javascript
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map(material => material.length));
// expected output: Array [8, 6, 7, 9]
```

Let's say I want to multiply the each item in the array by the index, how would I go about doing that?

- I can create a callback to a function, which explodes all the data out. 
- I can create a function inline within `map()` to do the work for me.

I'll explore both here, because when I forget how I got to this point of clarity, I can re-read!

Read the map documentation. If you don't know how map behaves, it's guess work.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

Below is the syntax for the simple `map`.

```javascript
// Arrow function
map((element) => { ... } )
map((element, index) => { ... } )
map((element, index, array) => { ... } )

// Callback function
map(callbackFn)
map(callbackFn, thisArg)

// Inline callback function
map(function callbackFn(element) { ... })
map(function callbackFn(element, index) { ... })
map(function callbackFn(element, index, array){ ... })
map(function callbackFn(element, index, array) { ... }, thisArg)
```

What about doing something like creating a new array with the contents of the original elements lengths multiplied by the index?

```javascript
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map((material, index) => material.length * index));
// > Array [0, 6, 14, 27]
```

One of the primary issues in my brain, is that I see the fat arrow crop up everywhere and I have no idea how people use it so...freely. Turns out, this is like everything else in IT. Go RTFM. If the calculations or operations get a bit cumbersome, we can add curly braces, providing you return from them with the value.

```javascript
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map((material, index) => {return material.length * index}));
// > Array [0, 6, 14, 27]
```

When things get really hairy or unreadable, you can externalise the logic into a callback function.

```javascript
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

// My code
function explodeTheDatas(element, index) {
  console.log("Element is: ", element "with index: ", index);d
  return element.length * index;
}

console.log(materials.map(explodeTheDatas))
// > "Element is: " "Hydrogen" "with index: " 0
// > "Element is: " "Helium" "with index: " 1
// > "Element is: " "Lithium" "with index: " 2
// > "Element is: " "Beryllium" "with index: " 3
// > Array [0, 6, 14, 27]
```

#### Back to Tree Reconciliation with React

I got a bit side tracked with JavaScript (because I don't know well enough yet) but we're now back at React.

Ok, the tree reconciliation bit is especially interesting. For my next trick, I'll display Unix Time and refresh it every second with the below div.

```html
<div id="unixtime">Unix time here</div>
```
---

<div id="unixtime">Unix time here</div>

---

This is interesting, because React will only update the DOM when there is a reason to update it, like the state changing from events, timers and underlying APIs. The page can remain stable and thus we build a mental feeling of how one page apps work.

The script for the Unix timer is here: https://github.com/davedotdev/blog/blob/master/assets/scripts/ui_journey_app_2.jsx

#### Thursday Issues

- My build environment is currently manual. I'm thinking I'll build out a local pipeline so I can work on the blog in a similar light as Netlify.
- The combination of Windows and WSL is starting to not mix well. I should mend npm on WSL (somehow).

# Weekly Wrap

I've focussed on larger chunks of the puzzle this week and have made time over three days instead of the full five. I expect I'll be diving deeper into ECMAScript (JS) more next week as I try and get my head around its gifts.

In a couple of weeks time, it would be great to have a dashboard that I can login as a user and manipulate some stored data. I can do this today with my old crappy HTML, CSS and back-end skills, but that's not the point. I want to do it with a React app. This last couple of weeks I've learnt loads on JavaScript, Netlify, React, JSX and JWTs. Initially this felt like a royal smack in the face, but today I'm looking back with a whole heap of new knowledge.

