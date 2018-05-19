import { Action } from '@ngrx/store';

import { Band } from '../model/band.model';
import { AboutBand } from '../../../about/shared/model/aboutBand.model';
import { Member } from '../../../members/shared/model/member.model';
import { BatchAction } from 'ngrx-batch-action-reducer';

export const GET_BAND_ID = 'GET_BAND_ID';
export const GET_BANDS = 'GET_BANDS';
export const GET_BAND = 'GET_BAND';
export const GET_MEMBERS = 'GET_MEMBERS';
export const GET_GALLERY = 'GET_GALLERY';
export const SEARCH_INPUT = 'SEARCH_INPUT';
export const SEARCH_GENRE = 'SEARCH_GENRE';
export const MULTY = 'MULTY';
export const MULTYONE = 'MULTYONE';
export const MULTYTWO = 'MULTYTWO';
export const ALL_GENRES = 'ALL_GENRES';

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

export class SearchInput implements Action {
  readonly type = SEARCH_INPUT;

  constructor(public payload: string) {}
}

export class SearchGenre implements Action {
  readonly type = SEARCH_GENRE;

  constructor(public payload: string) {}
}

@BatchAction()
export class Multy implements Action {
  readonly type = MULTY;

  constructor(public payload: [GetBands, GetBandId, SearchInput]) {}
}

@BatchAction()
export class MultyOne implements Action {
  readonly type = MULTYONE;

  constructor(public payload: [GetBands, GetBandId, SearchGenre]) {}
}

@BatchAction()
export class MultyTwo implements Action {
  readonly type = MULTYTWO;

  constructor(public payload: [GetBandId, GetBand, GetMembers, GetGallery]) {}
}

export class AllGenres implements Action {
  readonly type = ALL_GENRES;

  constructor(public payload: any) {}
}

export type BandsActions =
  GetBandId |
  GetBands |
  GetBand |
  GetMembers |
  GetGallery |
  SearchInput |
  SearchGenre |
  Multy |
  MultyOne |
  MultyTwo |
  AllGenres;
