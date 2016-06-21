import Em from 'ember';
import { pets } from '../qps';

export default Em.Route.extend({
  model(params) {
    return pets.find(p => p.id.toString() === params.pet_id);
  }
});