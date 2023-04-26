import { createSelector } from '@reduxjs/toolkit';
import { State, UserState } from '../../types/state';
import { User } from '../../types/user';
import { NameSpace, AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.authorizationStatus
);

export const getUser = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.user
);

export const getIsAuth = createSelector(
  getAuthorizationStatus,
  (authorizationStatus: AuthorizationStatus) =>
    authorizationStatus === AuthorizationStatus.Auth
);

export const getIsUnknown = createSelector(
  getAuthorizationStatus,
  (authorizationStatus: AuthorizationStatus) =>
    authorizationStatus === AuthorizationStatus.Unknown
);

export const getIsAuthor = createSelector(
  [getUser, (_, filmUser: User | undefined) => filmUser],
  (user, filmUser) => user && filmUser && user.email === filmUser.email
);
