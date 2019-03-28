import Controller from '@ember/controller';

export default Controller.extend({
  dynamicParams: undefined,
  
  init() {
    this._super(...arguments);
    this.set('dynamicParams', ['pages.second']);
  },
});
