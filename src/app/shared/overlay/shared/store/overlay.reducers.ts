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
    case (OverlayActions.SET_TO_TRUE):
      return {
        ...state,
        isOverlay: true
      };
    case (OverlayActions.SET_COMMENTS):
      const comments = [...state.overlay];
      comments.filter(item => item['overlay'] === action.payload.name)
        .map(obj => {
          obj['comments'].map((comment, i) => {
            comment['top'] = action.payload.comments[i]['top'];
            comment['left'] = action.payload.comments[i]['left'];
          });
        });
      return {
        ...state,
        overlay: comments
      };
    default:
      return state;
  }

}
