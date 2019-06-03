---
title: Converting a Gatsby Plugin to Typescript
date: "2019-05-23"
---
> Uncaught TypeError: Cannot read property 'welcomeToJavascript' of undefined 

Yes, we've all seen this infamous message one way or another. Wouldn't it be fantastic if we could catch such errors before we even execute our program? 

*Enter Typescript*

Typescript is a superset of JavaScript that will let us write our code in a type-safe way. Now, I will not be doing a deep dive on Typescript, as there are already quite a few articles for such endeavors at your disposal.

The goal of this article is to walk through adding TypeScript to a Gatsby plugin. Ok another pronoun. Gatsby is a popular framework for creating static web sites. By static, I mean rendering **page1.html, page2.html, page3.html, etc** on your server, versus something like **myHipsterTrendingSPA.html** that injects a javascript application and such. I like to associate a static website with semantic HTML. As in `<a href="/page2.html">Next</a>` will, in fact, direct you to that file's location.

Why Gatsby over just dumping your files onto a server? Gatsby let's you write JavaScript, specifically React, to create your static pages. Additionally, you get a rich plugin ecosystem, the capacity to use your fancy bundlers and loaders, and excellent documentation. Simply, it allows you to focus on solving your problems at hand, whether it's a CMS or a blog. Now (again), this article aims *not* and delve into its internals.  

In aiming to convert my own Gatsby plugin to TypeScript, I struggled looking for gatsby-plugins that had TypeScript support (checking the sourcecode or if they exposed an **index.d.ts** file) to serve as reference. Ultimately, such a task wasn't too burdening and hence, here we are.

## The Plugin

We're going to convert a made-up plugin called **gatsby-language-chooser-plugin**. This plugin allows us to access a language, as well as update it, at any time. It makes use of React's `context` api and Gatsby's `wrapRootElement` api.

Our file structure looks something like:

```
- src
    - languageProvider.jsx
    - gatsby-browser.jsx
- package.json
- languageProvider.js
- gatsby-browser.js
```

We edit files in `/src` and compile the files into vanilla JavaScript at the root so the Gatsby plugin reconciler can find them. More info on this here. Note, using a JavaScript transpiler/compiler is *optional*; you can very well write vanilla JavaScript directly on the root directory.

Let's take a look at our source files:

```javascript
file here
```

```javascript
file here
```

We can run `yarn build` to compile the files. This command stands for `babel --dir .` (FIXME)

We'll test our plugin locally by installing it in a sample gatsby project. Let's use (link to starter repo). We can install our local plugin by using the root path on our machine: 

Inside the root of your gatsby project, run 

`$ yarn add gatsby-language-chooser-plugin@YOUR_LOCAL_PATH_HERE` 

We'll now configure it in `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
     `gatsby-language-chooser-plugin`
  ],
}
```

If any of this setup seems strange to you, definitely check our the Gatsby docs (link).

Ok now with all the pieces in place, let's make sure our plugin works!

First, let's make sure we can get our project to start by running `$ yarn gatsby develop` and navigating to `localhost:8000` once it is ready.

Show display here

Excellent, let's finally make use of our plugin!

Our plan of attack:

- import and consume the `languageContext`
- display the current language
- change the language from English to Spanish

```javascript
// implementation here
```

Show display here

Great, we've got our Gatsby plugin with a test installation up and running. We have the implementation all set, so let's try to make the plugin type-safe without changing the public-facing API whatsoever. In theory, all we should have to do is install the plugin after the conversion and it should work exactly the same as before. However, if the Gatsby project itself was using TypeScript, it would be able to make use of our type definitions, allowing us to use the plugin properly as well as prevent bugs before ever getting to runtime.

## The Conversion

Installing typescript
Configure tsconfig.json
Change file names to ts/tsx
Change build to tsc -b
    
## Tutorial

- preface - react knowledge is presumed
- sample project that exposes a language setting and function to change it
- show in real project how to consume plugin
- use react provider that wraps gatsby-browser
    - gotcha - probably need to wrap this in gatsby-ssr
    - `wrapRootElement`
    - intuition says gatsby will probably combine/fix this api

The sample source code can be found here: (link here)
    
 Bonus section:
- setting up lint
