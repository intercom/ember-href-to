import Em from 'ember';

export default Em.Controller.extend({
  queryParams: ['string', 'number', 'bool'],
  string: '',
  number: 0,
  bool: true
});
