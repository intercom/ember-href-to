import HrefTo from 'ember-href-to/href-to';

function closestLink(el) {
  if (el.closest) {
    return el.closest('a');
  } else {
    el = el.parentElement;
    while (el && el.tagName !== 'A') {
      el = el.parentElement;
    }
    return el;
  }
}
export default {
  name: 'ember-href-to',
  initialize(applicationInstance) {
    // we only want this to run in the browser, not in fastboot
    if (typeof(FastBoot) === "undefined") {
      let hrefToClickHandler = function _hrefToClickHandler(e) {
        let link = e.target.tagName === 'A' ? e.target : closestLink(e.target);
        if (link && document.body.contains(link)) {
          let hrefTo = new HrefTo(applicationInstance, e, link);
          hrefTo.maybeHandle();
        }
      };

      document.body.addEventListener('click', hrefToClickHandler);

      // Teardown on app destruction: clean up the event listener to avoid
      // memory leaks.
      applicationInstance.reopen({
        willDestroy() {
          document.body.removeEventListener('click', hrefToClickHandler);
          return this._super(...arguments);
        }
      });
    }
  }
};
