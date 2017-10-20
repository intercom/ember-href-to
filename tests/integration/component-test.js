import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { getOwner } from '@ember/application';

moduleForComponent('component-with-a-link', 'Integration | Component | component-with-a-link', {
  integration: true,

  beforeEach() {
    getOwner(this).lookup('router:main').setupRouter();
  }
});

test('should change colors', function(assert) {
  this.render(hbs`{{component-with-a-link}}`);

  assert.strictEqual(this.$('a').length, 1, 'the link is rendered');
});
