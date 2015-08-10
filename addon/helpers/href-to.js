import Em from 'ember';
import { getRouter } from 'ember-href-to/lib/container-lookup';

var appNeedsClickHandler = true;

function _getNormalisedRootUrl(router) {
  var rootURL = router.rootURL;
  if(rootURL.charAt(rootURL.length - 1) !== '/') {
    rootURL = rootURL + '/';
  }
  return rootURL;
}

function _setupClickHandler() {

  document.getElementsByTagName('body')[0].onclick = function(e) {
    var target = _parentLinkNode(e.target);
    if (target) {
      var handleClick = (e.which === 1 && !e.ctrlKey && !e.metaKey);
      if(handleClick && !_isEmberViewTarget(target) && Em.isNone(target.getAttribute('data-ember-action'))) {
        var router = getRouter();

        var rootURL = _getNormalisedRootUrl(router);
        var url = target.getAttribute('href');

        if(url && url.indexOf(rootURL) === 0) {
          url = url.substr(rootURL.length - 1);

          if(router.router.recognizer.recognize(url)) {
            router.handleURL(url);
            router.router.updateURL(url);
            return false;
          }
        }
      }
    }
    return true;
  };
}

function _isEmberViewTarget(target) {
  return target.className.indexOf('ember-view') > -1;
}

function _parentLinkNode(node) {
  if (node.tagName === 'A') {
    return node;
  } else if (!node.parentNode) {
    return false;
  }
  return _parentLinkNode(node.parentNode);
}

export function hrefTo(params) {
  if(appNeedsClickHandler) {
    _setupClickHandler();
    appNeedsClickHandler = false;
  }

  var lastParam = params[params.length - 1];

  var queryParams = {};
  if (lastParam && lastParam.isQueryParams) {
    queryParams = params.pop();
  }

  var targetRouteName = params.shift();

  var args = [targetRouteName];
  args.push.apply(args, params);
  args.push({ queryParams: queryParams.values });

  var router = getRouter();
  return router.generate.apply(router, args);
}

export default Em.Helper.helper(hrefTo);
