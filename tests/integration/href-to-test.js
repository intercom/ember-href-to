import {module, test} from 'qunit';
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

// Query params
test('clicking a link with explicit query params ({{href-to "route.name" foo=bar}})', function(assert) {
  visit('/');
  leftClick('#href-to-links a:contains(About)');
  leftClick('#about-href-to-links a:contains(Two)');
  andThen(function() {
    assert.equal(currentURL(), '/about?section=two');
    assertAnchorIsActive('#link-to-links a:contains(About)', assert);
    assertAnchorIsActive('#about-link-to-links a:contains(Two)', assert);
  });
});

test('updating a param passed to href-to ({{href-to "route.name" foo=bar}}) updates the url of the anchor', function(assert) {
  visit('/about');
  andThen(function() {
    assert.equal(find('#about-href-to-links a:contains(Three)').attr('href'), '/about?section=hello');
    fillIn('#section-attr-input', 'bye');
  });
  andThen(function() {
    assert.equal(find('#about-href-to-links a:contains(Three)').attr('href'), '/about?section=bye');
  });
});

test('links without explicitly passed query params include query params of ancestor routes, but no those of child or sibling routes', function(assert) {
  visit('/qps');

  andThen(function() {
    assert.equal(currentURL(), '/qps');
    assert.equal(find('#qps-href-to').attr('href'), '/qps', 'The link to the current route route has no query params');
    assert.equal(find('.href-tos a:eq(0)').attr('href'), '/qps/1', 'The link to a child route has no query params');
    fillIn('#qps-input-text', 'foo');
  });

  andThen(function() {
    assert.equal(find('#qps-href-to').attr('href'), '/qps?string=foo', 'The link to a parent route has the query params defined on that route');
    assert.equal(find('.href-tos a:eq(0)').attr('href'), '/qps/1?string=foo', 'The url the current route has the query params');
    leftClick('.href-tos a:eq(0)');
  });

  andThen(function() {
    assert.equal(currentURL(), '/qps/1?string=foo');
    fillIn('#qps-input-nested-text', 'bar');
  });

  andThen(function() {
    assert.equal(find('#qps-href-to').attr('href'), '/qps?string=foo', 'The link to a parent route has the query param defined on thar route but not in child routes');
    assert.equal(find('.href-tos a:eq(0)').attr('href'), '/qps/1?nestedString=bar&string=foo', 'The url to the current route has the both the query params of parent routes and those in the current one');
    assert.equal(find('.href-tos a:eq(1)').attr('href'), '/qps/2?string=foo', 'The url to the current route with a different model has only the query params in the parent');
    assert.equal(find('#qps-details-more-href-to').attr('href'), '/qps/1/more?nestedString=bar&string=foo', 'The url to the current route has the both the query params of parent routes and those in the current one');
    leftClick('#qps-details-more-href-to');
  });

  andThen(function() {
    assert.equal(currentURL(), '/qps/1?string=foo');
    fillIn('#qps-input-double-nested-text', 'qux');
  });

  andThen(function() {
    assert.equal(find('#qps-href-to').attr('href'), '/qps?string=foo', 'The link to a parent route has the query param defined on thar route but not in child routes');
    assert.equal(find('.href-tos a:eq(0)').attr('href'), '/qps/1?nestedString=bar&string=foo', 'The url to the parent route has his query params and those of the grandparent route, but not those in the current route');
    assert.equal(find('.href-tos a:eq(1)').attr('href'), '/qps/2?string=foo', 'The url to the parent route with a different model has only the query params in the grand parent route');
    assert.equal(find('#qps-details-more-href-to').attr('href'), '/qps/1/more?doubleNestedString=qux&nestedString=bar&string=foo', 'The url to the current route has the both the query params of parent routes and those in the current one');
  });
});