import { Action } from '@ngrx/store';

export const CONTROL_OVERLAY = 'CONTROL_OVERLAY';
export const SET_OVERLAY = 'SET_OVERLAY';

export class ControlOverlay implements Action {
  readonly type = CONTROL_OVERLAY;

  constructor(public payload: {overlay: string, isOverlay: boolean}) {}
}

export class SetOverlay implements Action {
  readonly type = SET_OVERLAY;

  constructor(public payload: Array<object>) {}
}

export type OverlayActions = ControlOverlay | SetOverlay;
