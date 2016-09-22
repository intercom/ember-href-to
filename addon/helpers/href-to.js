import Em from 'ember';
import getOwner from 'ember-getowner-polyfill';

export default Em.Helper.extend({
  compute([targetRouteName, ...rest]) {
    let router = getOwner(this).lookup('router:main');
    if (router === undefined || router.router === undefined) {
      return;
    }

    let lastParam = rest[rest.length - 1];

    let queryParams = {};
    if (lastParam && lastParam.isQueryParams) {
      queryParams = rest.pop();
    }

    let args = [targetRouteName];
    args.push.apply(args, rest);
    args.push({ queryParams: queryParams.values });

    return router.generate.apply(router, args);
  }
});
