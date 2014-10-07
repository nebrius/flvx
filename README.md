Flvx
====

A lightweight web framework derived from Facebook's [Flux](http://facebook.github.io/react/docs/flux-overview.html) application architecture and is intended to be used with Facebook's [React](http://facebook.github.io/react/) UI library.

Flvx modifies the Flux paradigm slightly to give it a little more structure, and to help enforce the immutable nature of the Flux philosophy. Flvx is written in ECMAScript 6 and can be used directly, or can be compiled to AMD or CommonJS compatible ECMAScript 5 code.

# Installation

You can download the library in the following formats using the links below:

* [ES6](https://raw.githubusercontent.com/bryan-m-hughes/flvx/master/flvx.js)
* [AMD](https://raw.githubusercontent.com/bryan-m-hughes/flvx/master/dist/flvx.amd.js)
* [Minified AMD](https://raw.githubusercontent.com/bryan-m-hughes/flvx/master/dist/flvx.amd.min.js)
* [CommonJS](https://raw.githubusercontent.com/bryan-m-hughes/flvx/master/dist/flvx.commonjs.js)
* [Minified CommonJS](https://raw.githubusercontent.com/bryan-m-hughes/flvx/master/dist/flvx.commonjs.min.js)

Alternatively, you can use bower to install the ES6 version of the code:

```
bower install flvx
```

# Overview

Flvx is an alternative to traditional MVC architectures that features unidirectional data flow and immutable pieces. A Flvx app is composed of a variety of pieces. Flvx provides the following pre-built pieces out of the box:

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

A route is comprised of a view controller, a store controller, and an optional link controller. Switching between routes means switching between sets of these controllers. Here is the relationship and data flow between all the pieces in a single route:

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
└── app.js
```

For each category (links, stores, and views), it is typical to put the controllers in the root directory and to put all views, links, and stores in a sub-folder that corresponds to the controller. This structure is simply a suggestion and is not required by Flvx, you can organize your code however you wish.

## app.js

You should have one file that is the entry point for your app, named ```app.js``` in the example structure above. This file should be responsible for instantiating controllers and wiring them up to the routes, and routing to the first route.

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

When registering a route, the store controller and view controller are required, but the link controller is optional. You can register as many routes as you want to, but note that only a single route can be active at a time.

## View Controllers

A view controller is an ECMAScript 6 class that extends the ```ViewController``` base class in the Flvx library.

```JavaScript
import { ViewController } from 'flvx';
import { MyView } from 'views/my_view/MyView';
import React from 'react';

export class MyViewController extends ViewController {

  render(data) {
    React.renderComponent(new MyView(data), document.getElementById('content'));
  }
  
}
```

The ```data``` argument comes from a store controller, which will be discussed in more detail further down. Sometimes, it may be necessary to display different views depending on the contents of the data (e.g. list view vs grid view). In cases such as these, you can import multiple views and determine which one to display based on a conditional in the render method here.

### Class Methods

#### [void] render([primitive|object|array] data) _required_

The render method is passed data from the aggregator and is responsible for calling ```React.renderComponent```, which attaches a view to the DOM.

## Views

A view is simply a standard React view, e.g.:

```JavaScript
import { dispatch } from 'flvx';
import React from 'react';

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

In this example, we introduce the concept of dispatching actions. An action can be thought of as an event that is triggered by a view or a link. Actions are dispatched to all links and stores. An action is an object that contains a ```type``` property that indicates the type of action and can optionally contain other properties with data about the action.

### Class Methods

For more information on views and the methods they support, check out Facebook's documentation on
[React](http://facebook.github.io/react/).

## Store Controllers

A store controller is an ECMAScript 6 class that extends the ```StoreController``` base class in the Flvx library.

```JavaScript
import { StoreController } from 'flvx';
import { MyStore } from 'stores/my_store/MyStore';

let store = Symbol();

export class MyStoreController extends StoreController {

  onConnected() {
    this.register(this[store] = new MyStore());
  }

  render() {
    return this[store].render();
  }

}
```

Store controllers are responsible for instantiating and registering stores, and for managing the render process.

Here, _render_ means to take a snapshot of the state contained in the store. When a store or store controller renders data, it takes all of the state stored inside of it, and returns a simple object (i.e. JSON-serializable) representing that state. This method is analogous to a Backbone model's ```toJSON``` method. The ```render``` method is called as part of aggregating data to views. The aggregator takes the object returned from ```render``` and passes it directly to the active view controller's ```render``` method.

Store controllers are responsible for instantiating all stores for the given route. When a store is instantiated, it needs to be registered using the ```register``` method exposed by the ```StoreController``` base class. When a store is registered by a store controller or another store, it gets wired up to automatically receive dispatched actions. An action is dispatched to the controller first, and then descends down the tree formed by registering stores in a pre-order traversal. Dependencies between stores are implicit in the order they are registered.

### Class Methods

#### [primitive|object|array] render() _required_

Renders the state of the store controller and returns it as a JSON-serializable type.

#### [void] dispatch([object] action) _optional_

Receives actions dispatched by the dispatcher. An action is an object with, at minimum, a ```type``` property that indicates the type of action. Actions can optionally contain more data about the action. Actions can originate from views or links.

#### [void] onConnected() _optional_

Called when the store controller is connected. A store controller is connected when the route containing the store controller is routed to.

#### [void] onDisconnected() _optional_

Called when the store controller is disconnected. A store controller is disconnected when a new route is routed to after having previously routed to the route containing the store controller. Note that if a store controller is registered for two or more routes, and you route between them, that the ```onDisconnected``` and ```onConnected``` methods are still called.

## Stores

A store has the same signature as a store controller, except that it cannot be passed to a router, and is not called directly by the dispatcher.

```JavaScript
import { Store, aggregate } from 'flvx';

let MESSAGES = ['Hello (click me)', 'Salut', 'Hola', 'Hallo', 'Привет', '你好', 'こんにちは'];
let currentMessage = Symbol();

export class MyStore extends Store {

  dispatch(action) {
    switch(action.type) {
      case 'REQUEST_NEW_MESSAGE':
        this[currentMessage]++;
        if (this[currentMessage] == MESSAGES.length) {
          this[currentMessage] = 0;
        }
        aggregate();
        break;
    }
  }

  render() {
    return {
      message: MESSAGES[this[currentMessage]]
    };
  }

  onConnected() {
    this[currentMessage] = 0;
    aggregate();
  }

}
```

### Class Methods

#### [primitive|object|array] render() _required_

Renders the state of the store and returns it as a JSON-serializable type.

#### [void] dispatch([object] action) _optional_

Receives actions dispatched by the dispatcher. An action is an object with, at minimum, a ```type``` property that indicates the type of action. Actions can optionally contain more data about the action. Actions can originate from views or links.

#### [void] onConnected() _optional_

Called when the store is connected. A store is connected when it is registered with a store controller or parent store.

#### [void] onDisconnected() _optional_

Called when the store is disconnected. A store is disconnected when its parent is disconnected. The parent's ```onDisconnected``` method is called before the child's ```onDisconnected``` method is called.

## Link Controllers

Link controllers are essentially identical to store controllers, except that they are intended to manage connections to a server, not store state. The key difference is that links can dispatch actions, but do not render data.

```JavaScript
import { LinkController } from 'flvx';
import { MyLink } from 'links/my_link/MyLink';

let link = Symbol();

export class MyLinkController extends LinkController {

  onConnected() {
    this.register(this[link] = new MyLink());
  }

}
```

### Class Methods

#### [void] dispatch([object] action) _optional_

Receives actions dispatched by the dispatcher. An action is an object with, at minimum, a ```type``` property that indicates the type of action. Actions can optionally contain more data about the action. Actions can originate from views or links.

#### [void] onConnected() _optional_

Called when the link controller is connected. A link controller is connected when the route containing the link controller is routed to.

#### [void] onDisconnected() _optional_

Called when the link controller is disconnected. A link controller is disconnected when a new route is routed to after having previously routed to the route containing the link controller. Note that if a link controller is registered for two or more routes, and you route between them, that the ```onDisconnected``` and ```onConnected``` methods are still called.

## Links

A link has the same signature as a link controller, except that it cannot be passed to a router, and is not called directly by the dispatcher.

```JavaScript
import { Link, aggregate } from 'flvx';

export class MyLink extends Link {

  dispatch(action) {
    switch(action.type) {
      case 'REQUEST_NEW_MESSAGE':
        // Fictional XHR helper
        xhr('POST', 'stats', {
          action: 'messageRequested'
        });
        break;
    }
  }

}
```

# Example

Check out the [example](example) directory to see the above examples (minus links) working together. Note that everything is written in ECMAScript 6, and compiled back to ECMAScript 5 using [Traceur](https://github.com/google/traceur-compiler/wiki/GettingStarted) and [Gulp](http://gulpjs.com/). A built version of the example, ready to be loaded in a browser, is available in the [example-dist](example-dist) directory. For a larger example, take a look at the [SChat](https://github.com/bryan-m-hughes/schat) app I wrote.

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