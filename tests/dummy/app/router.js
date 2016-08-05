import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('pages', function() {
    this.route('first');
    this.route('second');
  });
  this.route('qps', function() {
    this.route('details', { path: ':pet_id' }, function() {
      this.route('more');
    });
  });
});

export default Router;
