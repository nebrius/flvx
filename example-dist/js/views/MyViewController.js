define(['react', 'flvx', 'views/my_view/MyView'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var React = $__0.default;
  var ViewController = $__2.ViewController;
  var MyView = $__4.MyView;
  var MyViewController = function MyViewController() {
    $traceurRuntime.defaultSuperCall(this, $MyViewController.prototype, arguments);
  };
  var $MyViewController = MyViewController;
  ($traceurRuntime.createClass)(MyViewController, {render: function(data) {
      React.renderComponent(new MyView(data), document.getElementById('content'));
    }}, {}, ViewController);
  return {
    get MyViewController() {
      return MyViewController;
    },
    __esModule: true
  };
});
