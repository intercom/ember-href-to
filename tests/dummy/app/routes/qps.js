import Em from 'ember';

export const pets = [
  { id: 1, name: 'Toby' },
  { id: 2, name: 'Garfield' },
  { id: 3, name: 'Mikey' },
  { id: 4, name: 'Goofy' },
  { id: 5, name: 'Thumper' }
];

export default Em.Route.extend({
  model() {
    return pets;
  }
});