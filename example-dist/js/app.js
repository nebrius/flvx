define(['flvx', 'store_controllers/MyStoreController', 'view_controllers/MyViewController'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var router = $__0.router;
  var MyStoreController = $__2.MyStoreController;
  var MyViewController = $__4.MyViewController;
  router.registerRoute('myroute', {
    storeController: new MyStoreController(),
    viewController: new MyViewController()
  });
  router.route('myroute');
  return {};
});
