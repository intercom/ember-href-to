import Em from 'ember';

function _getNormalisedRootUrl(router) {
  let rootURL = router.rootURL;
  if(rootURL.charAt(rootURL.length - 1) !== '/') {
    rootURL = rootURL + '/';
  }
  return rootURL;
}

function _lookupRouter(applicationInstance) {
  const container = 'lookup' in applicationInstance ? applicationInstance : applicationInstance.container;
  return container.lookup('router:main');
}

export function canHandle(e) {
  let $target = Em.$(e.currentTarget);
  let handleClick = (e.which === 1 && !e.ctrlKey && !e.metaKey);

  return handleClick &&
    !$target.hasClass('ember-view') &&
    Em.isNone($target.attr('data-href-to-ignore')) &&
    Em.isNone($target.attr('data-ember-action')) &&
    $target.attr('download') === undefined;
}

export default {
  name: 'ember-href-to',
  initialize: function(applicationInstance) {
    let router = _lookupRouter(applicationInstance);
    let rootURL = _getNormalisedRootUrl(router);
    let $body = Em.$(document.body);

    $body.off('click.href-to', 'a');
    $body.on('click.href-to', 'a', function(e) {
      if (canHandle(e)) {
        let $target = Em.$(e.currentTarget);
        let url = $target.attr('href');

        if(url && url.indexOf(rootURL) === 0) {
          url = url.substr(rootURL.length - 1);

          if(router.router.recognizer.recognize(url)) {
            router.handleURL(url);
            router.router.updateURL(url);
            e.preventDefault();
          }
        }
      }
      return true;
    });
  }
};
