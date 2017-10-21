import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import $ from 'jquery';
import destroyApp from '../../tests/helpers/destroy-app';

function leftClick(selector) {
  triggerEvent(selector, 'click', { which: 1 });
}

function assertAnchorIsActive(selector, assert) {
  assert.ok($(selector).hasClass('active'));
}

moduleForAcceptance('Acceptance | href to');

test('clicking a simple link-to', function(assert) {
  visit('/');
  leftClick('#link-to-links a:contains(About)');
  andThen(function() {
    assert.equal(currentURL(), '/about');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
  });
});

test('clicking a simple href-to', function(assert) {
  visit('/');
  leftClick('#href-to-links a:contains(About)');
  andThen(function() {
    assert.equal(currentURL(), '/about');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
  });
});

test('clicking a href-to with a params argument', function(assert) {
  visit('/');
  leftClick('#href-to-links a:contains(Second Page (with dynamic params))');
  andThen(function() {
    assert.equal(currentURL(), '/pages/second');
  });
});

test('clicking a href-to with an inner element', function(assert) {
  visit('/');
  leftClick('#inner-span');
  andThen(function() {
    assert.equal(currentURL(), '/pages/second');
  });
});

test("it doesn't affect clicking on elements outside links", function(assert) {
  visit('/');
  leftClick('#href-to-links');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('clicking an anchor which has no href', function(assert) {
  visit('/');
  leftClick('#href-to-links a:contains(An anchor with no href)');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('clicking a href-to to a nested route', function(assert) {
  visit('/');
  leftClick('#href-to-links a:contains(Second Page)');
  andThen(function() {
    assert.equal(currentURL(), '/pages/second');
    assertAnchorIsActive('#link-to-links a:contains(Second Page)', assert);
  });
});

test('clicking a href-to with query params', function(assert) {
  visit('/');
  leftClick('#href-to-links a:contains(About)');
  leftClick('#about-href-to-links a:contains(Two)');
  andThen(function() {
    assert.equal(currentURL(), '/about?section=two');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
    assertAnchorIsActive('#about-link-to-links a:contains(Two)', assert);
  });
});

test('clicking an action works', function(assert) {
  visit('/about');
  leftClick('a:contains(Increment)');
  andThen(function() {
    assert.equal($('#count').text(), '1');
  });
});

test('clicking a href-to to should propagate events and prevent default ', function(assert) {
  visit('/');
  andThen(function() {
    let event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window);
    let element = findWithAssert('#href-to-links a:contains(About)')[0];
    let ancestor = document.querySelector('#href-to-links');
    ancestor.addEventListener('click', function(e) {
      assert.equal(event, e, 'should not stop propagation');
    });
    element.dispatchEvent(event);
    assert.equal(event.defaultPrevented, true, 'should prevent default');
  });
});

test('clicking an ember component with href-to should work', function(assert) {
  visit('/');
  leftClick('#href-to-links a:contains(A component with a bound href)');

  andThen(() => {
    assert.equal(currentURL(), '/about');
  });
});

test('[BUGFIX] it works with the `click` acceptance helper', function(assert) {
  visit('/');
  click('#href-to-links a:contains(About)');
  andThen(function() {
    assert.equal(currentURL(), '/about');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
  });
});

test("The event listener does'nt leak after the app is destroyed", function(assert) {
  // Boot the app
  visit('/');

  andThen(app => {
    // Destroy the app
    destroyApp(app);
    // Prevent an actual redirect if the test fails (when an error occurs
    // inside an event handler `preventDefault()` never happens therefore
    // causing an actual redirect).
    let preventDefault = e => e.preventDefault();
    document.body.addEventListener('click', preventDefault);

    // Click on a link with a recognizable URL
    let a = $('<a href="/about">')
      .appendTo('body')[0]
      .click();
    assert.ok(
      true,
      'no errors thrown due to attempting to handle a URL in a destroyed application'
    );

    $(a).remove();
    document.body.removeEventListener('click', preventDefault);
  });
});
