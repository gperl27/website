---
title: Building Cross-platform Desktop Apps using Rust and Elm
date: 2019-08-24
description: Reflecting on an eclectic approach to building a desktop application
phase: live
keywords: ["rust", "elm", "cargo", "functional programming", "intro"]
---
There's [rust](https://www.merriam-webster.com/dictionary/rust). There's also [rust](https://www.google.com/search?q=rust+game&rlz=1C5CHFA_enUS805US805&oq=rust+game&aqs=chrome..69i57.1588j0j1&sourceid=chrome&ie=UTF-8). However today I'll be talking about this [rust](https://www.rust-lang.org/). Rust is a programming language, moreover a ["multi-paradigm system programming language"](https://en.wikipedia.org/wiki/Rust_(programming_language)). Well then. What I like to interpret this as is that Rust allows you to write low-level programs at a high level. If you want to talk to your GPU, you can. If you want to write your good ol' CRUD app, you [can](https://rocket.rs/).

The reason I wanted to give Rust a shot was to get a deeper understanding of lower-level computing; my prior experiences involved a couple problem sets in C from [cs50](https://www.edx.org/course/cs50s-introduction-computer-science-harvardx-cs50x) and making a print server in [Electron](https://electronjs.org/) (a way to make cross-platform apps using JavaScript).

For me, the best way to learn any new language or paradigm is to do a side project. Hence, I decided to make a video management app that keeps track of video files across multiple external devices. I used Rust to cache file references and serve data to a desktop [webview](https://github.com/Boscop/web-view), which renders HTML and JavaScript. However, I ended up using Elm to build the frontend, which I'll expand more on later.

## Getting my Feet Rusty

Though diving right into the project with docs by my side was enticing, Rust was just a bit too terse and foreign to wing it. Additionally, a co-worker recommended that I read the Rust [book](https://doc.rust-lang.org/book/) (*The Book*), which is exactly what I did. I, too, recommend anyone interested in Rust to read it; it is excellently written, updated regularly, and covers many non-Rust specific programming practices that any developer can benefit from. 

### Writing Rust

We all know the difference between reading about something and actually doing it. Reading through *The Book*, I went through some of the tutorial projects, so I was a tad familiar in writing Rust code. But finally it was time to sit down and do my own thing. 

Rust's compiler is the perfectionist that you want at your side. Though it is not *all-knowing* as far as understanding the intention of what your program needs to do; it knows what doesn't work and will tell you why. Your program will not compile if Rust deems it unsafe.

Though a bit foreign at first, Rust's syntax ended up being a pleasure to work with. It offers structs, enums, generics, and many other excellent programming features you'll find from your favorite languages. Additionally, the [standard library](https://doc.rust-lang.org/std/) is extremely robust and, more often than not, offers a utility that you are looking for.

I ran into some roadblocks when attempting to use functional iterators like `map` on my own custom structs due to trait implementation requirements. For example, if you want to `clone` a custom struct, you have define the requisite protocols so the compilier knows how to iterate through your data safely. Additionally, I encountered some difficulty trying to mutate data structures in iterators due to the strict borrowing system; I ended up either `cloning` data when needing to do filtering or other processes or creating a new `vec!` (like an array) to iteratively build the proper data structure.

Thankfully, the compiler will aid you in telling you where mutable and immutable borrows happen so you scope data properly; sometimes it will tell you to issue annotations called [lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html), which were needed sometimes when needing to explicitly describe how long some data needs to stay in memory.

### Cargo

Cargo is Rust's package manager and is a powerful tool. Cargo can check your code, run and build your program, run tests, and much more. I found it fairly easy to work with and manage dependencies. A Rust project is configured through a `Cargo.toml` file. To install a library all you need to do is add `mylib = 1.0.0` under `[dependencies]` and run `cargo check`. All rust *crates* can be found at [crates.io](https://crates.io/); it's an excellent ecosystem and most libraries I used were well documented and supported. I additionally made use of [cargo-make](https://sagiegurari.github.io/cargo-make/), a build tool and task runner that I utilized to write initialization scripts.

## The Bridge to Elm

To actually render the GUI, I used a Rust library called [webview](https://github.com/Boscop/web-view), which renders HTML like a web browser and supports two-way bindings between Rust and JavaScript. If you've ever used Electron, it's extremely similar to using [IPCs](https://electronjs.org/docs/api/ipc-main), which allow you to pass messages from the frontend to the backend and visa-versa. The cool thing about using Rust is the ability to send and receive type-safe JSON; something you can't get out of the box with Electron. 

Now, in the spirit of type-safety and reliability, I opted in to using [Elm](https://elm-lang.org/) for the frontend. Elm is a typed, functional programming language. The Elm compiler is quite friendly and readable, aiding in preventing runtime-errors (none of those `Cannot read property -stuff- of undefined`!). I've used the JavaScript library [Ramda](https://ramdajs.com/) in some of my projects at work, as well as have written some [Elixir](https://elixir-lang.org/) here and there. Thus, Elm was an excellent choice to satiate and improve my FP prowess. The learning curve wasn't too steep. It's lisp-like syntax was a bit off-putting at first, as I have never used a true lisp, but I eventually got the hang of it; understanding that every function in Elm curries only one parameter at a time was key. The way to compose functions was to wrap an invocation in parentheses. So a function that operates on data that also needs some other operation looks something like:

```elm
MyOuterFuncThatMaps (MyInnerFuncThatFilters thisIsYourData)
```

Additionally, I thoroughly enjoyed the document-update-view model that they employ. If you come from using [Redux](https://redux.js.org) (or most other Flux patterns) in your frontends, you'll feel right at home. 

### Using Ports

One thing that wasn't too straightforward was how to call vanilla JavaScript functions in Elm. The webview doesn't communicate between Rust and Elm, but between Rust and JavaScript. Luckily, Elm offers a way to send one-way messages through [ports](https://guide.elm-lang.org/interop/ports.html). Using ports, we can make a bridge that goes from Rust to JavaScript to Elm and back the other way.

What this translates to is:

#### Backend to Frontend
  1. Rust serializes app state into JSON 
  2. JavaScript port passes JSON through as a string to Elm
  3. Elm deserializes JavaScript message

#### Frontend to Backend
  1. Elm serializes message into JSON 
  2. Sends through a port 
  3. Rust deserialzes JavaScript message

## Getting Things to Production
Ultimately, users need to download and install the app. Cargo makes this process fairly simple. Running `cargo build --release` gives you an optimized executable for the system that you are developing on.

Additionally, we'll probably want to optimize our frontend code. For this, Elm's package manager has a command `elm make --optimize` that does exactly what we want. Running that will give us a file called `*.min.js`.

How I went about including the JavaScript in Rust was by using Rust string interpolation where you write HTML markup and pass in paths to your scripts and assets like you normally would.

Mine looked something like:

```rust
fn create_html() -> String {
    format!(
        r#"
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
    </head>
    <body>
        <div id="view"></div>
        <script>
            {elmJs}
        </script> 
    </body>
    </html>
    "#,
        elmJs = include_str!("../client/main.min.js") ,
    )
}
```

Not too bad right? If you're more interested in setting up a Rust project like this, definitely check out the webview library.

Once everything is compiled and you have an executable, well, that's pretty much it! 

One other tool I used was `cargo wix`. [Cargo-wix](https://github.com/volks73/cargo-wix) allows you to distribute a Windows installer for your app, so you can give your users the experience and familiarity of a legitimate Windows app.

## Final Thoughts
Overall, I felt I had a quality codebase, with little known bugs. Some deeper topics I'd like to explore further would be traits and multi-threading in Rust; for Elm, it'd be  to make a full-blown [Progressive Web App](https://developers.google.com/web/progressive-web-apps/).

For further inquiry, you can check out the sourcecode for the movie app [here](https://github.com/gperl27/movie-manager).

A huge thank you to [Carterj3](https://github.com/Carterj3/webview-minesweeper)'s minesweeper project, which I referenced heavily in bootstrapping this project.
