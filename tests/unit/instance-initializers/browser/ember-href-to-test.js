import { module, test } from 'qunit';
import { canHandle } from '../../../../instance-initializers/browser/ember-href-to';

module('Unit | Instance Initializer | browser/ember-href-to#canHandle');

function createEvent(href, attribute) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.setAttribute(attribute, 1);
  return { currentTarget: anchor, which: 1, ctrlKey: false, metaKey: false };
}

test('returns false for events on links with a download attribute', function(assert) {
  const event = createEvent('./file.pdf', 'download');
  assert.equal(canHandle(event), false);
});

test('returns false for events on links with a data-href-to-ignore attribute', function(assert) {
  const event = createEvent('/about', 'data-href-to-ignore');
  assert.equal(canHandle(event), false);
});
