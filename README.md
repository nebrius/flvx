Flvx
====

A lightweight web framework derived from Facebook's [Flux](http://facebook.github.io/react/docs/flux-overview.html)
application architecture and is intended to be used with Facebook's [React](http://facebook.github.io/react/) UI library.

Flvx modifies the Flux paradigm slightly to give it a little more structure, and to help enforce the immutable nature
of the Flux philosophy.

# Overview

Flvx is an alternative to traditional MVC architectures that features unidirectional data flow and immutable pieces.
A Flvx app is composed of the following pieces:

- views - A set of React components.
- view controllers - A single controller that oversees the React components.
- stores - A set of pieces that store state. These can be Backbone Models, custom written code, etc.
- store controller - A single controller that oversees the stores.
- dispatcher - A single piece that receives events from views and propagates them to the store controller
- aggregator - A single piece that recieves updates from the stores and propagates them to the view controller
- router - A single piece that wires up view controllers and store controllers to the dispatcher and aggregator. Can be supplemented with a Backbone router, etc.

# Usage

Coming Soon! In the mean time, check out the [example](example). Note that everything is written in ECMAScript 6, and compiled back
to ECMAScript 5 using [Traceur](https://github.com/google/traceur-compiler/wiki/GettingStarted) and [Gulp](http://gulpjs.com/). A built version of the example, ready to be loaded in a browser, is
available in the [example-dist](example-dist) directory.

License
=======

The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes bryan@theoreticalideations.com (https://theoreticalideations.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.