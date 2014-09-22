Flvx
====

A lightweight web framework derived from Facebook's [Flux](http://facebook.github.io/react/docs/flux-overview.html)
application architecture and is intended to be used with Facebook's [React](http://facebook.github.io/react/) UI library.

Flvx modifies the Flux paradigm slightly to give it a little more structure, and to help enforce the immutable nature
of the Flux philosophy. Flvx is written in ECMAScript 6 and can be used directly, or can be compiled to AMD or CommonJS
compatible ECMAScript 5 code.

# Installation

You can download the library in the following formats using the links below:

* [ES6](https://gitlab.theoreticalideations.com/nebrius/flvx/raw/master/flvx.js)
* [AMD](https://gitlab.theoreticalideations.com/nebrius/flvx/raw/master/dist/flvx.amd.js)
* [Minified AMD](https://gitlab.theoreticalideations.com/nebrius/flvx/raw/master/dist/flvx.amd.min.js)
* [CommonJS](https://gitlab.theoreticalideations.com/nebrius/flvx/raw/master/dist/flvx.commonjs.js)
* [Minified CommonJS](https://gitlab.theoreticalideations.com/nebrius/flvx/raw/master/dist/commonjs.amd.min.js)

Alternatively, you can use bower to install the ES6 version of the code:

```
bower install flvx
```

# Overview

Flvx is an alternative to traditional MVC architectures that features unidirectional data flow and immutable pieces.
A Flvx app is composed of a variety of pieces. Flvx provides the following pre-built pieces out of the box:

- dispatcher - A method that receives events from views/links and propagates them to the store controller
- aggregator - A method that receives updates from the stores and propagates them to the view controller
- router - A pair of methods that wires up view controllers, link controllers, and store controllers to the dispatcher and aggregator.

Flvx provides base classes that you extend to provide functionality for your app:

- view controllers - A single controller that oversees all React components.
- views - A set of React components that that are instantiated by a view controller.
- store controller - A single controller that oversees the stores.
- stores - Entities that store state that that are instantiated by a store controller. These can be backed by Backbone Models, custom written code, etc.
- link controller - A single controller that oversees all connections between a server and the app.
- links - A set of pieces that communicate with a server that are instantiated by a link controller. These are the only asynchronous pieces in Flvx.

A route is comprised of a view controller, a store controller, and an optional link controller. Switching between routes
means switching between sets of these controllers. Here is the relationship and data flow between all the pieces in a single route:

![Flvx Architecture](https://theoreticalideations.com/static/flvx.png)

# Usage

## App structure

A Flvx app is typically organized with the following folder structure:

```
myapp
├── links
│   ├── MyLinkController.js
│   └── my_link
│       ├── MyLink.js
│       └── ...
├── stores
│   ├── GlobalStoreController.js
│   ├── MyStoreController.js
│   └── my_store
│       ├── MyStore.js
│       └── ...
├── views
│   ├── MyViewController.js
│   └── my_view
│       ├── MyView.js
│       └── ...
├── app.js
```

For each category (links, stores, and views), it is typical to put the controllers in the root directory and to put all
views, links, and stores in a sub-folder that corresponds to the controller. This structure is simply a suggestion and
is not required by Flvx, you can organize your code however you wish.

## app.js

You should have one file that is the entry point for your app, named ```app.js``` in the example structure above. This
file should be responsible for instantiating controllers and wiring them up to the routes, and routing to the first route.

Here is a very simple app.js that instantiates a single route:

```JavaScript
import { registerRoute, route } from 'flvx';
import { MyLinkController } from 'links/MyLinkController';
import { MyStoreController } from 'links/MyStoreController';
import { MyViewController } from 'links/MyViewController';

registerRoute('myRoute', {
  linkController: new MyLinkController(),
  storeController: new MyStoreController(),
  viewController: new MyViewController()
});

route('myRoute');
```

When registering a route, the store controller and view controller are required, but the link controller is optional.
You can register as many routes as you want to, but note that only a single route can be active at a time.

## View Controllers

A view controller is an ECMAScript 6 class that extends the ```ViewController``` base class in the Flvx library.
Each view controller must consist of a single instance method called ```render```. This method is where you call
```React.renderComponent```, which attaches a view to the DOM. An example view controller looks like:

```JavaScript
import React from 'react';
import { ViewController } from 'flvx';
import { MyView } from 'views/my_view/MyView';

export class MyViewController extends ViewController {
  render(data) {
    React.renderComponent(new MyView(data), document.getElementById('content'));
  }
}
```

The ```data``` argument comes from a store controller, which will be discussed in more detail further down. Sometimes,
it may be necessary to display different views depending on the contents of the data (e.g. list view vs grid view). In
cases such as these, you can import multiple views and determine which one to display based on a conditional in the
render method here.

## Views

A view is simply a standard React view, e.g.:

```JavaScript
import React from 'react';
import { dispatch } from 'flvx';

export let MyView = React.createClass({
  render() {
    return new React.DOM.div({
      onClick: () => {
        dispatch({
          type: 'REQUEST_NEW_MESSAGE'
        });
      },
      className: 'message'
    }, this.props.message);
  }
});

```

Here we introduce the concept of dispatching actions. An action can be thought of as an event that is triggered by a view
or a link. Actions are dispatched to all links and stores. An action is an object that contains a ```type``` property
that indicates the type of action and can optionally contain other properties with data about the action.

## Store Controllers

Coming Soon!

## Stores

Coming Soon!

## Link Controllers

Coming Soon!

## Links

Coming Soon!

# Example

Check out the [example](example) directory. Note that everything is written in ECMAScript 6, and compiled back to ECMAScript 5
using [Traceur](https://github.com/google/traceur-compiler/wiki/GettingStarted) and [Gulp](http://gulpjs.com/).
A built version of the example, ready to be loaded in a browser, is available in the [example-dist](example-dist) directory.

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