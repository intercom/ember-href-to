import Em from 'ember';

export default Em.Controller.extend({
  queryParams: ['section'],
  section: 'one',
  dynamic: 'hello',
  dynamicLength: Em.computed('dynamic', function() {
    return this.get('dynamic.length');
  }),
  someObject: Em.computed(function() {
    return Em.Object.create({
      id: 'abc123'
    });
  }),
  count: 0,
  actions: {
    increment: function() {
      this.incrementProperty('count');
    }
  }
});
