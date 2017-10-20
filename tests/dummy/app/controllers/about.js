import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['section'],
  section: 'one',
  dynamic: 'hello',
  count: 0,
  actions: {
    increment: function() {
      this.incrementProperty('count');
    }
  }
});
