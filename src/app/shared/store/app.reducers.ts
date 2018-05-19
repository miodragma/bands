import { ActionReducerMap } from '@ngrx/store';

import * as fromBands from 'app/components/bands/shared/store/bands.reducers';

export interface AppState {
  bands: fromBands.State;
}

export const reducers: ActionReducerMap<AppState> = {
  bands: fromBands.bandsReducers
};
