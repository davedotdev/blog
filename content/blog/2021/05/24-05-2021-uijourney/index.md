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





