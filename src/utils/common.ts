import crypto from 'node:crypto';
import { Film, Genres } from '../types/film.type.js';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');

  const [
    name,
    description,
    created,
    genre,
    released,
    rating,
    previewVideoLink,
    videoLink,
    starring,
    director,
    runTime,
    posterImage,
    backgroundImage,
    backgroundColor,
    firstname,
    email,
    avatarPath,
    password,
  ] = tokens;

  return {
    name,
    backgroundImage,
    backgroundColor,
    created: new Date(created),
    videoLink,
    previewVideoLink,
    description,
    rating: Number.parseInt(rating, 10),
    director,
    starring: starring.split(','),
    runTime: Number.parseInt(runTime, 10),
    genre: genre as Genres,
    released: Number(released),
    posterImage,
    user: { firstname, email, avatarPath, password },
  } as Film;
};

export const getErrorMessage = (error: unknown): string => (error instanceof Error ? error.message : '');

export const createSHA256 = (line: string, salt: string) => {
  const shaHasher = crypto.createHmac('sha256', salt);

  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (message: string) => ({
  error: message,
});
