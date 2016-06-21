import Em from 'ember';

export default Em.Controller.extend({
  queryParams: ['nestedString', 'nestedNumber', 'nestedBool'],
  nestedString: '',
  nestedNumber: 0,
  nestedBool: true
});
