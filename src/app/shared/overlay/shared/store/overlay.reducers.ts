import * as OverlayActions from './overlay.actions';

export interface State {
  isOverlay: boolean;
  overlay: Array<object>;
}

export const initialState: State = {
  isOverlay: true,
  overlay: []
};

export function overlayReducers(state = initialState, action: OverlayActions.OverlayActions) {
  switch (action.type) {
    case (OverlayActions.CONTROL_OVERLAY):
      const overlay = [...state.overlay];
      overlay.filter(item => item['overlay'] === action.payload.overlay)
        .map(name => name['isOverlay'] = action.payload.isOverlay);
      return {
        ...state,
        overlay: overlay,
        isOverlay: action.payload.isOverlay
      };
    case (OverlayActions.SET_OVERLAY):
      return {
        ...state,
        overlay: action.payload
      };
    default:
      return state;
  }

}
