import Em from 'ember';
import { getRouter } from 'ember-href-to/lib/container-lookup';

var appNeedsClickHandler = true;

function setupClickHandler() {
  Em.$(document.body).on('click', 'a', function(e) {
    var $target = Em.$(e.currentTarget);
    var handleClick = (e.which === 1 && !e.ctrlKey && !e.metaKey);

    if(handleClick && !$target.hasClass('ember-view') && Em.isNone($target.attr('data-ember-action'))) {
      var router = getRouter();

      var url = $target.attr('href');
      if(url && url.indexOf(router.rootURL) === 0) {
        var rootUrlLength = router.rootURL.length;
        if(rootUrlLength > 1) {
          url = url.substr(rootUrlLength);
        }

        if(router.router.recognizer.recognize(url)) {
          router.handleURL(url);
          router.router.updateURL(url);
          return false;
        }
      }
    }
    return true;
  });
}

export function hrefTo(params) {
  if(appNeedsClickHandler) {
    setupClickHandler();
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

export default Em.HTMLBars.makeBoundHelper(hrefTo);
