define(['flvx', 'stores/my_store/MyStore'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var StoreController = $__0.StoreController;
  var MyStore = $__2.MyStore;
  var store = Symbol();
  var MyStoreController = function MyStoreController() {
    $traceurRuntime.defaultSuperCall(this, $MyStoreController.prototype, arguments);
  };
  var $MyStoreController = MyStoreController;
  ($traceurRuntime.createClass)(MyStoreController, {
    onConnected: function() {
      this.register($traceurRuntime.setProperty(this, store, new MyStore()));
    },
    render: function() {
      return this[$traceurRuntime.toProperty(store)].render();
    }
  }, {}, StoreController);
  return {
    get MyStoreController() {
      return MyStoreController;
    },
    __esModule: true
  };
});
