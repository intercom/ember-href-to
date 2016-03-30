import Em from 'ember';

export default Em.Helper.extend({
  compute(params) {
    let router = this.container.lookup('router:main');
    if(router === undefined || router.router === undefined) {
      return;
    }

    let lastParam = params[params.length - 1];

    let queryParams = {};
    if (lastParam && lastParam.isQueryParams) {
      queryParams = params.pop();
    }

    let targetRouteName = params.shift();

    let args = [targetRouteName];
    args.push.apply(args, params);
    args.push({ queryParams: queryParams.values });

    return router.generate.apply(router, args);
  }
});
