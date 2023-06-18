import { FormAction, FormActionType } from '../../types/add-film';

export function addFilmFormReducer<T>(state: T, action: FormAction): T {
  const { type, payload } = action;
  switch (type) {
    case FormActionType.setName:
      return { ...state, name: payload };
    case FormActionType.setDescription:
      return { ...state, description: payload };
    case FormActionType.setPosterImage:
      return { ...state, posterImage: payload };
    case FormActionType.setBackgroundImage:
      return { ...state, backgroundImage: payload };
    case FormActionType.setBackgroundColor:
      return { ...state, backgroundColor: payload };
    case FormActionType.setVideoLink:
      return { ...state, videoLink: payload };
    case FormActionType.setPreviewVideoLink:
      return { ...state, previewVideoLink: payload };
    case FormActionType.setDirector:
      return { ...state, director: payload };
    case FormActionType.setGenre:
      return { ...state, genre: payload };
    case FormActionType.setRunTime:
      return { ...state, runTime: Number(payload) };
    case FormActionType.setReleased:
      return { ...state, released: Number(payload) };
    case FormActionType.setStarring:
      return { ...state, starring: payload };
    default:
      return state;
  }
}
