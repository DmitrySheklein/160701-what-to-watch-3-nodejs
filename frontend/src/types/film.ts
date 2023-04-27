import { User } from './user';

export interface Film {
  id: string;
  name: string;
  posterImage: string;
  created: Date;
  previewVideoLink: string;
  genre: string;
  commentCount: number;
  isFavorite: boolean;
  user: User;
}

export interface FullFilm extends Film {
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
}
