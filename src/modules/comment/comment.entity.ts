import typegoose, { getModelForClass, Ref, defaultClasses } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { FilmEntity } from '../film/film.entity.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: 5, maxlength: 1024 })
  public message!: string;

  @prop({ required: true, min: 1, max: 10 })
  public rating!: number;

  @prop({ required: true })
  public postDate!: Date;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    ref: FilmEntity,
    required: true,
  })
  public filmId!: Ref<FilmEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
