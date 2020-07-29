import Helper from "@ember/component/helper";
import { getOwner } from "@ember/application";

export function hrefTo(routing, params) {
  return routing.generateURL(...getParamsForGenerateURL(params));
}

function getParamsForGenerateURL(params) {
  params = params.slice(); // create a copy
  let targetRouteName = params.shift(); // the first param is always the target route name
  let lastParam = params[params.length - 1]; // the last param might be queryParams
  let queryParams;
  if (lastParam && lastParam.isQueryParams) {
    queryParams = params.pop().values;
  } else {
    queryParams = {};
  }
  let models = params; // the remainder are the models
  return [targetRouteName, models, queryParams];
}

export default class HrefToHelper extends Helper {
  get routing() {
    return getOwner(this).lookup("service:-routing");
  }

  get router() {
    return getOwner(this).lookup("service:router");
  }

  init() {
    super.init();
    this.router.on('routeDidChange', this.recompute.bind(this));
  }

  compute(params, namedArgs) {
    if (namedArgs.params) {
      return hrefTo(this.routing, namedArgs.params);
    } else {
      return hrefTo(this.routing, params);
    }
  }
}
