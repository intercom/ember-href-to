import Em from 'ember';
import HrefTo from 'ember-href-to/href-to';

export default {
  name: 'ember-href-to',
  initialize: function(applicationInstance) {
    let $body = Em.$(document.body);
    $body.off('click.href-to', 'a');
    
    $body.on('click.href-to', 'a', (e) => {
      let hrefTo = new HrefTo(applicationInstance, e);
      hrefTo.maybeHandle();

      return true;
    });
  }
};
