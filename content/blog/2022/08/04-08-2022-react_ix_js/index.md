---
title: "React & Next.js calling imported JavaScript functions"
date: 2022-08-02T10:00:00+00:00
image: images/blog/uijourney_header.png
author: David Gee
description: "React & Next.js calling imported JavaScript functions"
signoff: Dave
mermaid: false
categories: 
- javascript
- react
- nextjs
tags:
- ui
---

For some time, the humble browser has been a source of frustration and an area that I've treated largely as a black box. Some browsers behave better than others and some should stay dead (I'm looking at your grave Internet Explorer). The browser, regarded by many as a mistake, can be a means of tracking and taming the doom scrolling human cattle, but it can also deliver sheer delight and fantastic user experiences. As a distracting but noteworthy tangent, adult entertainment can be thanked for many technological advances, including internet payments and content delivery systems, which other industries have since adopted. The browser has been in the eye of the storm and it's a gift that keeps on giving.

There are many ways of building applications that a browser will render using JavaScript (JS), including React, Preact, Vue.js, Next.js, Vite, Remix, Parcel, jQuery, Angular, Haunted ... the list is huge. Then there's all the JS specifics like CJS, AMD, UMD and ESM. It's common however to mostly see ESM or ECMAScript Modules in most of these frameworks and we're currently on ES6 which was released in 2015. 

Lots of SaaS platforms like payment providers, analytics and chat systems use scripts to integrate their products into your web app or website. Instructions like "just import the script and magic will happen" are strewn across the internet.

```html
<script async src="demo_async.js"></script>
```

With this example, a script will be downloaded in parallel to parsing the page and there might be a blip of interruption as the script bursts into life.  In fact, if you're reading this post on Dave.dev, notice the coffee cup floating button? That's an imported script!

But what happens when you're working with a React framework and not plain old JavaScript? When I was first wrapping my head around React, I didn't know what that answer looked like and now I feel like a right idiot. It's safe and very cliche for me to say, it's simple.

## It's just JavaScript

Each JS framework dictates the mechanics of importing scripts, but it's all just a pile of JS. One must allow for asynchronous behaviours and always put guard rail behaviour around interaction, but other than that, I felt stupid not figuring this out sooner. 

**React** scripts are normally imported by adding them to the `index.html` file, and they can also be programmatically appended to the head in the `DOM` if you don't want scripts loaded on pages where they're not used.

**Next.js** scripts are normally imported by adding them to the using a `Script` import to do the heavy lifting. It's also possible to apply parameters which instruct the browser how to load them. 

Below are some simple examples of programmatically adding scripts.

```javascript
  // Works for React and the return function does cleanup when the code unmounts*
  // Dynamically add the script
  useEffect(() => {
    // I always pass the original script import here for ease of reference
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://example.com/index.js";
    scriptTag.async = true;
    document.head.appendChild(scriptTag);
    
    // Do cleanup to avoid weird issues
    return () => { 
      document.head.removeChild(scriptTag);
  }
  },[])

  // An alternate method for React is to use the Helmet library
  // Works for React: Helmet is a library for importing scripts
  import React from "react";
  import {Helmet} from "react-helmet";

  {/*snip*/}
  <Helmet>
    <meta charSet="utf-8" />
    <title>My Title</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
  {/*snip*/}
```

Assuming you've imported a script, the next task is to call some functions, like below:

```javascript
{/*Can be a simple script like this or imported monster that's been webpacked etc*/}
<script>
    function AlertSay(saying) {
        alert(saying);
    }
</script>

{/*snip*/}
<Button onClick={() => AlertSay("Boom!")}></Button>
{/*snip*/}
```

**Next.js** requires something different because of the server-side rendering and it can throw hydration errors when the server rendered page is different to the page rendered by the browser because of these script imports, so be sure to use a compatible import method for your chosen JavaScript framework. Here I'm using the Script import to emulate importing an external script.


```javascript
// This is a Next.js example
// pages/index.js
import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (

    <>
        <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: `
            function MyAlert(saying) {
            window.alert(saying)
            }
        `,
        }}
        />

        <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex justify-center">
            <div className="my-10">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
                    onClick={() => MyAlert("Boom Baby!")}>
                    Push me
                </button>
            </div>
        </main>
        </div>
    </>
  )
}
```

If you want to build a Next.js app with TailwindCSS, here is a bash script to do that. It assumes you have `npx` and `npm` installed ahead of time.

```bash
npx create-next-app deleteme
cd deleteme
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Edit the tailwind.config.js to make it look like below
/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

# Paste these three lines to the /styles/globals.css file
@tailwind base;
@tailwind components;
@tailwind utilities;

# At this point, paste in the index.js content in the section above
# and then start the app!
npm run dev
```

### Wrap

These methods have helped me out a lot and they work for everything from Google Analytics, ConvertKit, Stripe, SumUp, HelpScout, BuyMeCoffee and many man more. This blog also serves as a means of playing with Next.js and TailwindCSS., which I'm a huge fan of, especially with TypeScript!

### Useful Links

Building the app with Next.js and TailwindCSS!
- https://nextjs.org/docs/getting-started
- https://tailwindcss.com/docs/guides/nextjs 

Helpful reading
- https://github.com/nfl/react-helmet
- https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/ 
- https://www.w3schools.com/Js/js_es6.asp
- https://github.com/matthewp/haunted
- https://preactjs.com/
- https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm
- https://blog.logrocket.com/commonjs-vs-es-modules-node-js/
- https://v1.tailwindcss.com/components/buttons