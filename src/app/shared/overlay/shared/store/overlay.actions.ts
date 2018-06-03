import { Action } from '@ngrx/store';

export const CONTROL_OVERLAY = 'CONTROL_OVERLAY';
export const SET_OVERLAY = 'SET_OVERLAY';
export const SET_TO_TRUE = 'SET_TO_TRUE';
export const SET_COMMENTS = 'SET_COMMENTS';

export class ControlOverlay implements Action {
  readonly type = CONTROL_OVERLAY;

  constructor(public payload: {overlay: string, isOverlay: boolean}) {}
}

export class SetOverlay implements Action {
  readonly type = SET_OVERLAY;

  constructor(public payload: Array<object>) {}
}

export class SetToTrue implements Action {
  readonly type = SET_TO_TRUE;

}

export class SetComments implements Action {
  readonly type = SET_COMMENTS;

  constructor(public payload: {name: string, comments: object}) {}
}

export type OverlayActions = ControlOverlay | SetOverlay | SetToTrue | SetComments;
