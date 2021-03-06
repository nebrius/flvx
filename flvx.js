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

let children = Symbol();
let internalDispatch = Symbol();
let internalOnConnected = Symbol();
let internalOnDisconnected = Symbol();

class Dispatchable {
  [internalDispatch](action) {
    this.dispatch(action);
    if (this[children]) {
      for (let child of this[children]) {
        child[internalDispatch](action);
      }
    }
  }
  [internalOnConnected](action) {
    this.onConnected(action);
    if (this[children]) {
      for (let child of this[children]) {
        child[internalOnConnected](action);
      }
    }
  }
  [internalOnDisconnected](action) {
    this.onDisconnected(action);
    if (this[children]) {
      for (let child of this[children]) {
        child[internalOnDisconnected](action);
      }
    }
  }
  register(child) {
    if (!this[children]) {
      this[children] = [];
    }
    this[children].push(child);
  }
  dispatch() {}
  onConnected() {}
  onDisconnected() {}
}

export class StoreController extends Dispatchable {
  render() {
    throw new Error('"render" must be implemented by a derived store controller');
  }
  register(child) {
    if (!(child instanceof Store)) {
      throw new Error('Invalid child');
    }
    super.register(child);
  }
}

export class Store extends Dispatchable {
  render() {
    throw new Error('"render" must be implemented by a derived store');
  }
  register(child) {
    if (!(child instanceof Store)) {
      throw new Error('Invalid child');
    }
    super.register(child);
  }
}

export class LinkController extends Dispatchable {
  register(child) {
    if (!(child instanceof Link)) {
      throw new Error('Invalid child');
    }
    super.register(child);
  }
}

export class Link extends Dispatchable {
  register(child) {
    if (!(child instanceof Link)) {
      throw new Error('Invalid child');
    }
    super.register(child);
  }
}

export class ViewController {
  render() {
    throw new Error('"render" must be implemented by a derived view controller');
  }
}

/***********************
 * Methods             *
 ***********************/

let currentStoreController = null;
let currentViewController = null;
let currentLinkController = null;
let globalStoreController = null;
let routes = {};

export function registerGlobalStoreController(storeController) {
  if (!(storeController instanceof StoreController)) {
    throw new Error('Invalid global store controller');
  }
  globalStoreController = storeController;
  storeController.onConnected();
}

export function getGlobalData() {
  if (!globalStoreController) {
    throw new Error('No global store controller set');
  }
  return globalStoreController.render();
}

export function aggregate() {
  if (!currentViewController) {
    throw new Error('"aggregate" called before first route');
  }
  currentViewController.render(currentStoreController.render());
}

export function dispatch(action) {
  let dispatchHappened = false;
  if (globalStoreController) {
    globalStoreController[internalDispatch](action);
    dispatchHappened = true;
  }
  if (currentLinkController) {
    currentLinkController[internalDispatch](action);
    dispatchHappened = true;
  }
  if (currentStoreController) {
    currentStoreController[internalDispatch](action);
    dispatchHappened = true;
  }
  if (!dispatchHappened) {
    console.warn('Dispatch called with nothing to dispatch to');
  }
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
    currentStoreController[internalOnDisconnected]();
  }
  if (currentLinkController) {
    currentLinkController[internalOnDisconnected]();
  }

  currentStoreController = nextRoute.storeController;
  currentLinkController = nextRoute.linkController;
  currentViewController = nextRoute.viewController;

  currentStoreController[internalOnConnected](state);
  if (currentLinkController) {
    currentLinkController[internalOnConnected]();
  }
}