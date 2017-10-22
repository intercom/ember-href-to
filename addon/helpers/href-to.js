import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';

function hrefTo(context, targetRouteName, ...rest) {
  let router = getOwner(context).lookup('service:router');

  if(router === undefined) {
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
