import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import HrefTo from 'ember-href-to/href-to';

moduleForComponent('a-link', 'Integration | HrefTo', {
  integration: true
});

function leftClickEvent() {
  return { which: 1, ctrlKey: false, metaKey: false };
}

test(`#isNotLinkComponent should be true if the event target is not an instance of Em.LinkComponent`, function(assert) {
  this.render(hbs`{{not-a-link class='not-a-link'}}`);

  let event = leftClickEvent();
  event.currentTarget = this.$('.not-a-link')[0];

  let hrefTo = new HrefTo(this.container, event);
  assert.ok(hrefTo.isNotLinkComponent());
});

test(`#isNotLinkComponent should be false if the event target is an instance of Em.LinkComponent`, function(assert) {
  this.render(hbs`{{a-link 'about' 'about' class='a-link'}}`);

  let event = leftClickEvent();
  event.currentTarget = this.$('.a-link')[0];

  let hrefTo = new HrefTo(this.container, event);
  assert.notOk(hrefTo.isNotLinkComponent());
});
