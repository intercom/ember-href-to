import { findAll } from '@ember/test-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('component-with-a-link', 'Integration | Component | component-with-a-link', {
  integration: true,
});

test('should change colors', function(assert) {
  this.render(hbs`{{component-with-a-link}}`);

  assert.strictEqual(findAll('a').length, 1, 'the link is rendered');
});
