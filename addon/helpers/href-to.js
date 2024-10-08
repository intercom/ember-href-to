import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';

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

  @action
  _recompute() {
    this.recompute();
  }

  init() {
    super.init();

    if (this.router && this.router.on) {
      // skip if the router service is mocked
      this.router.on("routeDidChange", this._recompute);
    }
  }

  willDestroy() {
    super.willDestroy();
    if (this.router && this.router.on) {
      this.router.off("routeDidChange", this._recompute);
    }
  }

  compute(params, namedArgs) {
    if (namedArgs.params) {
      return hrefTo(this.routing, namedArgs.params);
    } else {
      return hrefTo(this.routing, params);
    }
  }
}
