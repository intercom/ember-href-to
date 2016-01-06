import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('pages', function() {
    this.route('first');
    this.route('second');
  });

  this.route("404", { path: "*path"});
});

export default Router;
