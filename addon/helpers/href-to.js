import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';

function hrefTo(context, targetRouteName, ...rest) {
  let router = getOwner(context).lookup('service:router');
  // from https://github.com/emberjs/ember.js/blob/ad06dadce4be33db0cd74e4fd59c6dc45ceb476a/packages/%40ember/-internals/routing/lib/services/routing.ts#L45-L48
  // similarly to Ember's internal routing service, we should return early if there's no routerMicrolib (i.e. we are rendering in an integration test)
  if (router === undefined) {
    return;
  }

  // from https://github.com/rwjblue/ember-router-service-polyfill/blob/82710b72d7caff1fe78b223a41ff6761d1193656/vendor/ember-router-service-polyfill/index.js#L57-L59
  //
  // this._router._routerMicrolib => 2.13+
  // this._router.router => < 2.13
  let routerMicrolib = router._router._routerMicrolib || router._router.router;
  if (routerMicrolib === undefined) {
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

  return router.urlFor.apply(router, args);
}

export { hrefTo };

export default Helper.extend({
  compute([targetRouteName, ...rest], namedArgs) {
    if(namedArgs.params) {
      return hrefTo(this, ...namedArgs.params);
    } else {
      return hrefTo(this, targetRouteName, ...rest);
    }
  }
});
