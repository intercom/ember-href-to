import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, find } from '@ember/test-helpers';
import HrefTo from 'ember-href-to/href-to';

function leftClickEvent() {
  return { which: 1, ctrlKey: false, metaKey: false };
}

module('Integration | HrefTo', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.lookup('router:main').setupRouter();
  })

  test(`#isNotLinkComponent should be true if the event target is not an instance of Em.LinkComponent`, async function(assert) {
    await render(hbs`{{not-a-link class='not-a-link'}}`);

    let event = leftClickEvent();
    event.target = find('.not-a-link');

    let hrefTo = new HrefTo(this.owner, event);
    assert.ok(hrefTo.isNotLinkComponent());
  });

  test(`#isNotLinkComponent should be false if the event target is an instance of Em.LinkComponent`, async function(assert) {
    await render(hbs`{{a-link 'about' 'about' class='a-link'}}`);

    let event = leftClickEvent();
    event.target = find('.a-link');

    let hrefTo = new HrefTo(this.owner, event);
    assert.notOk(hrefTo.isNotLinkComponent());
  });
});
