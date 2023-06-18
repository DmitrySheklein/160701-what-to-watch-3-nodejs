import { User } from './user';

export interface SmallFilm {
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

export interface Film extends SmallFilm {
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
