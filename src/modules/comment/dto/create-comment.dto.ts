export default class CreateCommentDto {
  public message!: string;
  public rating!: number;
  public postDate!: Date; //TODO нужно ли передавать дату создания коммента
  public userId!: string;
  public filmId!: string;
}
