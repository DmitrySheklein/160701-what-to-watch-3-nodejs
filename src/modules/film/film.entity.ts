import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { Genres } from '../../types/film.type.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films',
  },
})
export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: 2, maxlength: 100 })
  public name!: string;

  @prop({ trim: true, required: true, minlength: 20, maxlength: 1024 })
  public description!: string;

  @prop({ required: true })
  public created!: Date;

  @prop({
    type: () => String,
    enum: Genres,
  })
  public genre!: Genres;

  @prop({ required: true, type: Number })
  public released!: number;

  @prop({ required: true })
  public posterImage!: string;

  @prop({ required: true })
  public backgroundImage!: string;

  @prop({ required: true })
  public backgroundColor!: string;

  @prop({ required: true })
  public videoLink!: string;

  @prop({ required: true })
  public previewVideoLink!: string;

  @prop({ required: true, default: 0 })
  public rating!: number;

  @prop({ required: true, minlength: 2, maxlength: 50 })
  public director!: string;

  @prop({ required: true })
  public starring!: string[];

  @prop({ required: true })
  public runTime!: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ type: Number, default: 0 })
  public commentCount!: number;
}

export const FilmModel = getModelForClass(FilmEntity);
