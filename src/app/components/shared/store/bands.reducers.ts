import * as BandsActions from './bands.actions';

import { Band } from '../models/band.model';
import { AboutBand } from '../models/aboutBand.model';
import { Member } from '../models/member.model';

export interface State {
  bandId: number;
  bands: Band[];
  aboutBand: AboutBand[];
  isAboutBand: boolean;
  members: Member[];
  gallery: {image: string}[];
}

const initialState: State = {
  bandId: null,
  bands: [],
  aboutBand: [],
  isAboutBand: false,
  members: [],
  gallery: []
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
          console.log(action.payload)
          return {
            ...state,
            gallery: action.payload
          };
    default:
      return state;
  }
}
