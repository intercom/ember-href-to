import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('pages', function() {
    this.route('first');
    this.route('second');
  });
  this.route('catchall', { path: "/*" });
});

export default Router;
