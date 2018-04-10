import { Action } from '@ngrx/store';

import { Band } from '../models/band.model';
import { AboutBand } from '../models/aboutBand.model';
import { Member } from '../models/member.model';

export const GET_BAND_ID = 'GET_BAND_ID';
export const GET_BANDS = 'GET_BANDS';
export const GET_BAND = 'GET_BAND';
export const GET_MEMBERS = 'GET_MEMBERS';
export const GET_GALLERY = 'GET_GALLERY';

export class GetBands implements Action {
  readonly type = GET_BANDS;

  constructor(public payload: Band[]) {}

}

export class GetBand implements Action {
  readonly type = GET_BAND;

  constructor(public payload: AboutBand[]) {}

}

export class GetBandId implements Action {
  readonly type = GET_BAND_ID;

  constructor(public payload: number) {}

}

export class GetMembers implements Action {
  readonly type = GET_MEMBERS;

  constructor(public payload: Member[]) {}

}

export class GetGallery implements Action {
  readonly type = GET_GALLERY;

  constructor(public payload: {image: string}[]) {}

}

export type BandsActions = GetBandId | GetBands | GetBand | GetMembers | GetGallery;
