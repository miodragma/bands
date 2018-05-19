import * as BandsActions from './bands.actions';

import { Band } from '../model/band.model';
import { AboutBand } from '../../../about/shared/model/aboutBand.model';
import { Member } from '../../../members/shared/model/member.model';

export interface State {
  bandId: number;
  bands: Band[];
  aboutBand: AboutBand[];
  isAboutBand: boolean;
  members: Member[];
  gallery: { image: string }[];
  searchInput: string;
  searchGenre: string;
  allGenres: any;
}

export const initialState: State = {
  bandId: null,
  bands: [],
  aboutBand: [],
  isAboutBand: false,
  members: [],
  gallery: [],
  searchInput: '',
  searchGenre: '',
  allGenres: []
};

export function bandsReducers(state = initialState, action: BandsActions.BandsActions) {
  switch (action.type) {
    case (BandsActions.GET_BANDS):
      return {
        ...state,
        bands: action.payload
      };
    case (BandsActions.GET_BAND):
      const isBand = action.payload.length > 0;
      return {
        ...state,
        aboutBand: action.payload,
        isAboutBand: isBand
      };
    case (BandsActions.GET_BAND_ID):
      return {
        ...state,
        bandId: action.payload
      };
    case (BandsActions.GET_MEMBERS):
      return {
        ...state,
        members: action.payload
      };
    case (BandsActions.GET_GALLERY):
      return {
        ...state,
        gallery: action.payload
      };
    case (BandsActions.SEARCH_INPUT):
      return {
        ...state,
        searchInput: action.payload
      };
    case (BandsActions.SEARCH_GENRE):
      return {
        ...state,
        searchGenre: action.payload
      };
    case (BandsActions.ALL_GENRES):
      return {
        ...state,
        allGenres: action.payload
      };
    default:
      return state;
  }
}
