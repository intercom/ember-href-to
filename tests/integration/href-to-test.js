import Em from 'ember';
import startApp from 'dummy/tests/helpers/start-app';

function leftClick(selector) {
  triggerEvent(selector, 'click', { which: 1 });
}

function assertAnchorIsActive(selector, assert) {
  assert.ok($(selector).hasClass('active'));
}

var application;

module('Integration: href-to', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Em.run(application, 'destroy');
  }
});

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

test('clicking a href-to with an inner element', function(assert) {
  visit('/');
  leftClick('#inner-span');
  andThen(function() {
    assert.equal(currentURL(), '/pages/second');
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
    let event = Em.$.Event('click', { which: 1 });
    let element = findWithAssert('#href-to-links a:contains(About)');
    element.trigger(event);
    assert.equal(event.isDefaultPrevented(), true, 'should prevent default');
    assert.equal(event.isPropagationStopped(), false, 'should not stop propagation');
  });
});
