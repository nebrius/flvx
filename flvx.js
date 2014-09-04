/*
The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes <bryan@theoreticalideations.com> (http://theoreticalideations.com)

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
*/

/***********************
 * Types               *
 ***********************/

export class StoreController {
  dispatch() {
    throw new Error('"dispatch" must be implemented by a derived store controller');
  }
  render() {
    throw new Error('"render" must be implemented by a derived store controller');
  }
  onConnected() {}
  onDisconnected() {}
}

export class Store {
  dispatch() {
    throw new Error('"dispatch" must be implemented by a derived store');
  }
  render() {
    throw new Error('"render" must be implemented by a derived store');
  }
  onConnected() {}
  onDisconnected() {}
}

export class ViewController {
  render() {
    throw new Error('"render" must be implemented by a derived view controller');
  }
  onConnected() {}
  onDisconnected() {}
}

export class LinkController {
  dispatch() {
    throw new Error('"dispatch" must be implemented by a derived link controller');
  }
  onConnected() {}
  onDisconnected() {}
}

/***********************
 * Methods             *
 ***********************/

let currentStoreController = null;
let currentViewController = null;
let currentLinkController = null;
let routes = {};

export function aggregate() {
  if (!currentViewController) {
    throw new Error('"aggregate" called before first route');
  }
  currentViewController.render(currentStoreController.render());
}

export function dispatch(action) {
  if (!currentStoreController) {
    throw new Error('"dispatch" called before first route');
  }
  if (currentLinkController) {
    currentLinkController.dispatch(action);
  }
  currentStoreController.dispatch(action);
}

export function registerRoute(name, options) {
  if (!(options.storeController instanceof StoreController)) {
    throw new Error('Invalid store controller');
  }
  if (!(options.viewController instanceof ViewController)) {
    throw new Error('Invalid view controller');
  }
  if (options.linkController && !(options.linkController instanceof LinkController)) {
    throw new Error('Invalid link controller');
  }
  routes[name] = options;
}

export function route(name, state) {
  let nextRoute = routes[name];
  if (!nextRoute) {
    throw new Error('Unknown route "' + route + '"');
  }
  state = state || {};

  if (currentStoreController) {
    currentStoreController.onDisconnected();
  }
  if (currentLinkController) {
    currentLinkController.onDisconnected();
  }
  if (currentViewController) {
    currentViewController.onDisconnected();
  }

  currentStoreController = nextRoute.storeController;
  currentLinkController = nextRoute.linkController;
  currentViewController = nextRoute.viewController;

  currentStoreController.onConnected(state);
  if (currentLinkController) {
    currentLinkController.onConnected();
  }
  currentViewController.onConnected();
}
