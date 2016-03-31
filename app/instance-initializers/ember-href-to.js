import Em from 'ember';

// http://james.padolsey.com/jquery/#v=2.1.3&fn=jQuery.fn.hasClass
function _hasClass(element, selector) {
  const className = " " + selector + " ";
  const rclass = /[\t\r\n\f]/g;
  if (element.nodeType === 1 && (" " + element.className + " ").replace(rclass, " ").indexOf(className) >= 0) {
      return true;
  }
  return false;
}

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
    const router = applicationInstance.container.lookup('router:main');
    const rootURL = _getNormalisedRootUrl(router);
    const $body = Em.$(document.body);

    $body.off('click.href-to', 'a');
    $body.on('click.href-to', 'a', function(e) {
      const target = e.currentTarget;
      const handleClick = (e.which === 1 && !e.ctrlKey && !e.metaKey);

      if(handleClick && !_hasClass(target, 'ember-view') && Em.isNone(target.getAttribute('data-ember-action'))) {
        let url = target.getAttribute('href');

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
