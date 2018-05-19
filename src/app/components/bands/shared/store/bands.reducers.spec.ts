import * as fromBands from './bands.reducers';
import * as BandsActions from './bands.actions';
import { Band } from '../model/band.model';
import { AboutBand } from '../../../about/shared/model/aboutBand.model';
import { Member } from '../../../members/shared/model/member.model';

describe('BandsReducers', () => {
  describe('undefined action', () => {
    it('should return the default state',  () => {
      const { initialState } = fromBands;
      const action = {type: undefined, payload: undefined};
      const state = fromBands.bandsReducers(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('GET_BANDS action', () => {
    it('should set bands data', () => {
      const bands: Band[] = [
        { band_id: 1, name: 'Metallica', image: 'http://image.jpg', about: 'About Metallica text', genres: 'metal' }
      ];
      const { initialState } = fromBands;
      const action = new BandsActions.GetBands(bands);
      const state = fromBands.bandsReducers(initialState, action);

      expect(state.bands).toEqual(bands);
    });
  });

  describe('GET_BAND action', () => {
    it('should set aboutBand data and isAboutBand to be true', () => {
      const aboutBand: AboutBand[] = [
        { band_id: 1, name: 'Metallica', about: 'About Metallica text',
          band_image: 'http://image.jpg', album_name: 'Metallica',
          year: 1992, image: 'http://image.jpg', tracks: 10 }
      ];
      const { initialState } = fromBands;
      const action = new BandsActions.GetBand(aboutBand);
      const state = fromBands.bandsReducers(initialState, action);

      expect(state.aboutBand).toEqual(aboutBand);
      expect(state.isAboutBand).toBe(true);
    });
  });

  describe('GET_BAND_ID action', () => {
    it('should set bandId', () => {
      const { initialState } = fromBands;
      const action = new BandsActions.GetBandId(1);
      const state = fromBands.bandsReducers(initialState, action);

      expect(state.bandId).toBe(1);
    });
  });

  describe('GET_MEMBERS action', () => {
    it('should set members data', () => {
      const members: Member[] = [
        { member_id: 1, first_name: 'John', last_name: 'Doe', former: false, image: 'http://image.jpg', member_pos: 'guitar'}
      ];
      const { initialState } = fromBands;
      const action = new BandsActions.GetMembers(members);
      const state = fromBands.bandsReducers(initialState, action);

      expect(state.members).toEqual(members);
    });
  });

  describe('GET_GALLERY action', () => {
    it('should set gallery data', () => {
      const gallery: { image: string }[] = [
        { image: 'http://image.jpg'}
      ];
      const { initialState } = fromBands;
      const action = new BandsActions.GetGallery(gallery);
      const state = fromBands.bandsReducers(initialState, action);

      expect(state.gallery).toEqual(gallery);
    });
  });

  describe('SEARCH_INPUT action', () => {
    it('should set searchInput data', () => {
      const { initialState } = fromBands;
      const action = new BandsActions.SearchInput('test');
      const state = fromBands.bandsReducers(initialState, action);

      expect(state.searchInput).toBe('test');
    });
  });

  describe('SEARCH_GENRE action', () => {
    it('should set searchGenre data', () => {
      const { initialState } = fromBands;
      const action = new BandsActions.SearchGenre('jazz');
      const state = fromBands.bandsReducers(initialState, action);

      expect(state.searchGenre).toBe('jazz');
    });
  });
});
