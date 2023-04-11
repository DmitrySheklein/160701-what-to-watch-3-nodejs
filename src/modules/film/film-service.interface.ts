import { DocumentType } from '@typegoose/typegoose';
import { FilmEntity } from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { Genres } from '../../types/film.type.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';

export interface FilmServiceInterface extends DocumentExistsInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(filmID: string): Promise<DocumentType<FilmEntity> | null>;
  find(count?: number): Promise<DocumentType<FilmEntity>[]>;
  deleteById(filmID: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(filmID: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  findByGenre(genre: keyof typeof Genres, count?: number): Promise<DocumentType<FilmEntity>[]>;
  incCommentCount(filmID: string, userRating: number): Promise<void>;
  findPromo(): Promise<DocumentType<FilmEntity> | null>;
  findFavorite(): Promise<DocumentType<FilmEntity>[]>;
}
