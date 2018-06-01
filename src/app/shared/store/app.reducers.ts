import { ActionReducerMap } from '@ngrx/store';

import * as fromBands from 'app/components/bands/shared/store/bands.reducers';
import * as fromOverlay from 'app/shared/overlay/shared/store/overlay.reducers';

export interface AppState {
  bands: fromBands.State;
  overlay: fromOverlay.State;
}

export const reducers: ActionReducerMap<AppState> = {
  bands: fromBands.bandsReducers,
  overlay: fromOverlay.overlayReducers
};
