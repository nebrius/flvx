define(['flvx'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var $__1 = $__0,
      Store = $__1.Store,
      aggregate = $__1.aggregate;
  var MESSAGES = ['Hello', 'Salut', 'Hola', 'Hallo', 'Привет', '你好', 'こんにちは'];
  var currentMessage = Symbol();
  var MyStore = function MyStore() {
    $traceurRuntime.setProperty(this, currentMessage, 0);
  };
  ($traceurRuntime.createClass)(MyStore, {
    dispatch: function(action) {
      switch (action.type) {
        case 'REQUEST_NEW_MESSAGE':
          this[$traceurRuntime.toProperty(currentMessage)]++;
          if (this[$traceurRuntime.toProperty(currentMessage)] == MESSAGES.length) {
            $traceurRuntime.setProperty(this, currentMessage, 0);
          }
          aggregate();
          break;
      }
    },
    render: function() {
      return {message: MESSAGES[$traceurRuntime.toProperty(this[$traceurRuntime.toProperty(currentMessage)])]};
    },
    onConnected: function() {
      aggregate();
    }
  }, {}, Store);
  return {
    get MyStore() {
      return MyStore;
    },
    __esModule: true
  };
});
