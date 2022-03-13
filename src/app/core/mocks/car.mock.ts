import { Car } from '../models/car.model';

export const TEST_CARS: Car[] = [
  {
    id: 1,
    brad_id: 1,
    model: 'Golf',
    description: 'Carrocería tipo berlina con portón con 5 puertas...',
    price: 22.0,
    power: 115,
    fuel: 'Gasolina',
    image: 'c-model-golf.png',
  },
  {
    id: 2,
    brad_id: 1,
    model: 'California',
    description: 'Carrocería tipo berlina con portón con 5 puertas...',
    price: 54.0,
    power: 150,
    fuel: 'Diesel',
    image: 'c-model-california.png',
  },
  {
    id: 3,
    brad_id: 1,
    model: 'Arteon',
    description: 'Carrocería tipo berlina con portón con 5 puertas...',
    price: 54.0,
    power: 239,
    fuel: 'Diesel',
    image: 'c-model-arteon.png',
  },
  {
    id: 4,
    brad_id: 3,
    model: 'Ibiza',
    description: 'Carrocería tipo berlina con portón con 5 puertas...',
    price: 17.0,
    power: 120,
    fuel: 'Diesel',
    image: 'c-model-ibiza.png',
  },
];

export const TEST_CAR: Car = {
  id: 1,
  brad_id: 1,
  model: 'Golf',
  description: 'Carrocería tipo berlina con portón con 5 puertas...',
  price: 22.0,
  power: 115,
  fuel: 'Gasolina',
  image: 'c-model-golf.png',
};

export const TEST_UPDATE_CAR: Car = {
  id: 2,
  brad_id: 3,
  model: 'Ibiza',
  description: 'Carrocería tipo berlina con portón con 5 puertas...',
  price: 17.0,
  power: 120,
  fuel: 'Diesel',
  image: 'c-model-ibiza.png',
};

export const TEST_CREATE_CAR: Car = {
  id: 5,
  brad_id: 3,
  model: 'Leon',
  description: 'Carrocería tipo berlina con portón con 5 puertas...',
  price: 21.0,
  power: 140,
  fuel: 'Gasolina',
  image: 'c-model-leon.png',
};

export const TEST_DELETE_CAR: Car = {
  id: 3,
  brad_id: 1,
  model: 'Arteon',
  description: 'Carrocería tipo berlina con portón con 5 puertas...',
  price: 54.0,
  power: 239,
  fuel: 'Diesel',
  image: 'c-model-arteon.png',
};
