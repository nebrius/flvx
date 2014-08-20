define(['flvx', 'flvx'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var $__1 = $__0,
      Store = $__1.Store,
      aggregator = $__1.aggregator;
  var router = $__2.router;
  var MESSAGES = ['Hello', 'Salut', 'Hola', 'Hallo', 'Привет', '你好', 'こんにちは'];
  var currentMessage = Symbol();
  var MyStore = function MyStore() {
    $traceurRuntime.setProperty(this, currentMessage, 0);
  };
  ($traceurRuntime.createClass)(MyStore, {
    trigger: function(event) {
      switch (event.type) {
        case 'REQUEST_NEW_MESSAGE':
          this[$traceurRuntime.toProperty(currentMessage)]++;
          if (this[$traceurRuntime.toProperty(currentMessage)] == MESSAGES.length) {
            $traceurRuntime.setProperty(this, currentMessage, 0);
          }
          aggregator.update();
          break;
      }
    },
    render: function() {
      return {message: MESSAGES[$traceurRuntime.toProperty(this[$traceurRuntime.toProperty(currentMessage)])]};
    },
    onConnected: function() {
      aggregator.update();
    }
  }, {}, Store);
  return {
    get MyStore() {
      return MyStore;
    },
    __esModule: true
  };
});
