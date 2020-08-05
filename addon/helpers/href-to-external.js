import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import { getHrefFromOwner } from './href-to';

function hrefToExternal(context, targetRouteName, ...rest) {
  const owner = getOwner(context);

  if(owner.mountPoint) {
    targetRouteName = owner._getExternalRoute(targetRouteName);
  }
  return getHrefFromOwner(owner, targetRouteName, ...rest);
}

export default Helper.extend({
  compute([targetRouteName, ...rest], namedArgs) {
    if(namedArgs.params) {
      return hrefToExternal(this, ...namedArgs.params);
    } else {
      return hrefToExternal(this, targetRouteName, ...rest);
    }
  }
});
