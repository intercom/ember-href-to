import Em from 'ember';

export default Em.Helper.extend({
  _routing: Em.inject.service('-routing'),

  onQpsChange: Em.observer('_routing.currentState', function() {
    this.recompute();
  }),

  compute(params) {
    let lastParam = params[params.length - 1];

    let queryParams = {};
    if (lastParam && lastParam.isQueryParams) {
      queryParams = params.pop().values;
    }
    let routing = this.get('_routing');
    let targetRouteName = params.shift();
    let currentQueryParams = routing.get('currentState.routerJsState.fullQueryParams');
    queryParams = Em.merge(Em.merge({}, currentQueryParams), queryParams);

    return routing.generateURL(targetRouteName, params, queryParams);
  }
});