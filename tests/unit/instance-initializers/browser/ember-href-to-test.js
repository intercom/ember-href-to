import { module, test } from 'qunit';
import { canHandle } from '../../../../instance-initializers/browser/ember-href-to';

module('Unit | Instance Initializer | browser/ember-href-to#canHandle');

test('returns false for events on links with a download attribute', function(assert) {
  let anchor = document.createElement('a');
  anchor.href = '/file.pdf';
  anchor.download = '';
  let event = { currentTarget: anchor, which: 1, ctrlKey: false, metaKey: false };
  assert.equal(canHandle(event), false);
});
