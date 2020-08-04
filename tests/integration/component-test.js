import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, find } from '@ember/test-helpers';

module('Integration | Component | component-with-a-link', function(hooks) {
  setupRenderingTest(hooks);

  test('should change colors', async function(assert) {
    await render(hbs`{{component-with-a-link}}`);

    assert.ok(find('a'), 'the link is rendered');
  });
});
