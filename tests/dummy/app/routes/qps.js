import Em from 'ember';

export const pets = [
  { id: 1, name: 'Toby', favouriteColor: 'brown', age: 3 },
  { id: 2, name: 'Garfield', favouriteColor: 'orange', age: 40 },
  { id: 3, name: 'Mikey', favouriteColor: 'red', age: 33 },
  { id: 4, name: 'Goofy', favouriteColor: 'green', age: 38 },
  { id: 5, name: 'Thumper', favouriteColor: 'gray', age: 2 }
];

export default Em.Route.extend({
  model() {
    return pets;
  }
});