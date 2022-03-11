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
    length: 4.258,
    width: 1.79,
    height: 1.492,
    weight: 1.216,
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
    length: 4.904,
    width: 1.904,
    height: 1.904,
    weight: 2.35,
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
    length: 4.862,
    width: 1.871,
    height: 1.45,
    weight: 1.45,
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
    length: 1.904,
    width: 1.904,
    height: 1.704,
    weight: 1.9,
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
  length: 4.258,
  width: 1.79,
  height: 1.492,
  weight: 1.216,
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
  length: 1.904,
  width: 1.904,
  height: 1.704,
  weight: 1.9,
  image: 'c-model-ibiza.png',
};

export const TEST_CREATE_CAR: Car = {
  id: 10,
  brad_id: 3,
  model: 'Leon',
  description: 'Carrocería tipo berlina con portón con 5 puertas...',
  price: 21.0,
  power: 140,
  fuel: 'Gasolina',
  length: 2.404,
  width: 1.204,
  height: 1.504,
  weight: 1.85,
  image: 'c-model-leon.png',
};
