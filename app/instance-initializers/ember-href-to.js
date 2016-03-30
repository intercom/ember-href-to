import Em from 'ember';

function _getNormalisedRootUrl(router) {
  let rootURL = router.rootURL;
  if(rootURL.charAt(rootURL.length - 1) !== '/') {
    rootURL = rootURL + '/';
  }
  return rootURL;
}

export default {
  name: 'ember-href-to',
  initialize: function(applicationInstance) {
    let router = applicationInstance.container.lookup('router:main');
    let rootURL = _getNormalisedRootUrl(router);
    let $body = Em.$(document.body);

    $body.off('click.href-to', 'a');
    $body.on('click.href-to', 'a', function(e) {
      let $target = Em.$(e.currentTarget);
      let handleClick = (e.which === 1 && !e.ctrlKey && !e.metaKey);

      if(handleClick && !$target.hasClass('ember-view') && Em.isNone($target.attr('data-ember-action'))) {
        let url = $target.attr('href');

        if(url && url.indexOf(rootURL) === 0) {
          url = url.substr(rootURL.length - 1);

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
};
