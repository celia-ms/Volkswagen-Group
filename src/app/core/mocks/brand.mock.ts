import { paths } from 'src/app/app-paths';
import { Brand } from '../models/brand.model';

export const brandMock: Brand[] = [
  {
    id: 1,
    name: 'Volkswagen',
    image: `${paths.image_brads}/logo-volkswagen.png`,
  },
  {
    id: 2,
    name: 'Audi',
    image: `${paths.image_brads}/logo-audi.png`,
  },
  {
    id: 3,
    name: 'Seat',
    image: `${paths.image_brads}/logo-seat.png`,
  },
  {
    id: 4,
    name: 'Skoda',
    image: `${paths.image_brads}/logo-skoda.png`,
  },
];
