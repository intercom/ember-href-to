import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('pages', function() {
    this.route('first');
    this.route('second');
  });
  this.route('contact', { path: 'contact/:contact_id' });
});

export default Router;
