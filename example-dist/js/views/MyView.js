define(['react', 'flvx'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var React = $__0.default;
  var dispatch = $__2.dispatch;
  var MyView = React.createClass({render: function() {
      return new React.DOM.div({
        onClick: (function() {
          dispatch({type: 'REQUEST_NEW_MESSAGE'});
        }),
        className: 'message'
      }, this.props.message);
    }});
  return {
    get MyView() {
      return MyView;
    },
    __esModule: true
  };
});
