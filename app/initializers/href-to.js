import Em from 'ember';
import hrefTo from 'ember-href-to/helpers/href-to';

export function initialize(/* container, application */) {
  Em.HTMLBars._registerHelper('href-to', hrefTo);
}

export default {
  name: 'ember-href-to',
  initialize: initialize
};
