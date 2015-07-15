import Em from 'ember';

export default Em.Controller.extend({
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
