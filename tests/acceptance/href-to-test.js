import $ from 'jquery';
import { click, currentURL, visit, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { run } from '@ember/runloop';

import { module, test } from 'qunit';

function assertAnchorIsActive(selector, assert) {
  assert.ok($(selector).hasClass('active'));
}

module('Acceptance | href to', function(hooks) {
  setupApplicationTest(hooks);

  test('href renders and updates based on router.currentState', async function (assert) {
    await visit('/about');

    assert.equal($('#link-to-links a:contains(About)').attr('href'), '/about')
    assert.equal($('#href-to-links a:contains(About)').attr('href'), '/about')

    const aboutController = this.owner.lookup('controller:about');

    run(function() {
      aboutController.set('section', 'two');
    });

    await settled();
    assert.equal($('#link-to-links a:contains(About)').attr('href'), '/about?section=two')
    assert.equal($('#href-to-links a:contains(About)').attr('href'), '/about?section=two')
  });

  test('clicking a simple link-to', async function(assert) {
    await visit('/');
    await click($('#link-to-links a:contains(About)')[0]);
    assert.equal(currentURL(), '/about');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
  });

  test('clicking a simple href-to', async function(assert) {
    await visit('/');
    await click($('#href-to-links a:contains(About)')[0]);
    assert.equal(currentURL(), '/about');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
  });

  test('clicking a href-to with a params argument', async function(assert) {
    await visit('/');
    await click($('#href-to-links a:contains(Second Page (with dynamic params))')[0]);
    assert.equal(currentURL(), '/pages/second');
  });

  test('clicking a href-to with an inner element', async function(assert) {
    await visit('/');
    await click('#inner-span');
    assert.equal(currentURL(), '/pages/second');
  });

  test('it doesn\'t affect clicking on elements outside links', async function(assert) {
    await visit('/');
    await click('#href-to-links');
    assert.equal(currentURL(), '/');
  });

  test('clicking an anchor which has no href', async function(assert) {
    await visit('/');
    await click($('#href-to-links a:contains(An anchor with no href)')[0]);
    assert.equal(currentURL(), '/');
  });

  test('clicking a href-to to a nested route', async function(assert) {
    await visit('/');
    await click($('#href-to-links a:contains(Second Page)')[0]);
    assert.equal(currentURL(), '/pages/second');
    assertAnchorIsActive('#link-to-links a:contains(Second Page)', assert);
  });

  test('clicking a href-to with query params', async function(assert) {
    await visit('/');
    await click($('#href-to-links a:contains(About)')[0]);
    await click($('#about-href-to-links a:contains(Two)')[0]);
    assert.equal(currentURL(), '/about?section=two');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
    assertAnchorIsActive('#about-link-to-links a:contains(Two)', assert);
  });

  test('clicking an action works', async function(assert) {
    await visit('/about');
    await click($('a:contains(Increment)')[0]);
    assert.equal($('#count').text(), '1');
  });

  test('clicking a href-to to should propagate events and prevent default ', async function(assert) {
    await visit('/');

    let event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window);
    let element = $('#href-to-links a:contains(About)')[0];
    let ancestor = document.querySelector('#href-to-links');
    ancestor.addEventListener('click', function(e) {
      assert.equal(event, e, 'should not stop propagation');
    });
    element.dispatchEvent(event);
    assert.equal(event.defaultPrevented, true, 'should prevent default');
  });

  test('clicking an ember component with href-to should work', async function(assert) {
    await visit('/');
    await click($('#href-to-links a:contains(A component with a bound href)')[0]);

    assert.equal(currentURL(), '/about');
  });

  test('[BUGFIX] it works with the `click` acceptance helper', async function(assert) {
    await visit('/');
    await click($('#href-to-links a:contains(About)')[0]);
    assert.equal(currentURL(), '/about');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
  });
});
