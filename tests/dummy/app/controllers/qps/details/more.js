import Em from 'ember';

export default Em.Controller.extend({
  queryParams: ['doubleNestedString', 'doubleNestedNumber', 'doubleNestedBool'],
  doubleNestedString: '',
  doubleNestedNumber: 0,
  doubleNestedBool: true
});
