import Em from 'ember';
import getOwner from 'ember-getowner-polyfill';

export default Em.Helper.extend({
  // _routing: Em.inject.service('-routing'),

  // onQpsChange: Em.observer('_routing.currentState', function() {
  //   this.recompute();
  // }),

  compute(params) {
    let router = getOwner(this).lookup('router:main');
    if (router === undefined || router.router === undefined) {
      return;
    }

    let lastParam = params[params.length - 1];

    let queryParams = {};
    if (lastParam && lastParam.isQueryParams) {
      queryParams = params.pop().values;
    }
    // let currentQueryParams = this.get('_routing.currentState.routerJsState.queryParams');
    // queryParams = Em.merge({}, currentQueryParams, queryParams);
    let targetRouteName = params.shift();

    let args = [targetRouteName];
    args.push.apply(args, params);
    args.push({ queryParams: queryParams });

    return router.generate.apply(router, args);
  }
});
