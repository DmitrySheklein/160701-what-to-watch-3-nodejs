export enum FormActionType {
  setName,
  setPosterImage,
  setBackgroundImage,
  setBackgroundColor,
  setVideoLink,
  setPreviewVideoLink,
  setDescription,
  setDirector,
  setStarring,
  setRunTime,
  setGenre,
  setReleased,
}

export type FormAction = {
  type: FormActionType;
  payload: string | string[];
};
