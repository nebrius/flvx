define(['flvx', 'stores/MyStoreController', 'views/MyViewController'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var $__1 = $__0,
      registerRoute = $__1.registerRoute,
      route = $__1.route;
  var MyStoreController = $__2.MyStoreController;
  var MyViewController = $__4.MyViewController;
  registerRoute('myroute', {
    storeController: new MyStoreController(),
    viewController: new MyViewController()
  });
  route('myroute');
  return {};
});
