export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = 'review',
  Player = '/player',
  Register = '/register',
  EditFilm = 'edit',
  AddFilm = '/create',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export const GENRES = [
  'comedy',
  'crime',
  'documentary',
  'drama',
  'horror',
  'family',
  'romance',
  'scifi',
  'thriller',
];

export const DEFAULT_GENRE = 'All genres';

export enum APIRoute {
  Films = '/films',
  Promo = '/films/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/users/login',
  Logout = '/users/logout',
  Register = '/users/register',
  Genre = '/films/genres',
  Avatar = '/users/avatar',
}

export enum NameSpace {
  Films = 'FILMS',
  Film = 'FILM',
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  User = 'USER',
  FavoriteFilms = 'FAVORITE FILMS',
  Genre = 'GENRE',
}

export enum SubmitStatus {
  Still = 'STILL',
  Pending = 'PENDING',
  Fullfilled = 'FULLFILLED',
  Rejected = 'REJECTED',
}
