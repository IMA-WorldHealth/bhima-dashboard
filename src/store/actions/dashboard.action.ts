import { eDispatch } from '../../lib/eDispatch';
import { ADD_FILTER_DASH, CLEAR_KEY_DASH } from '../type';

export const addFilterDash = (_searchKey: SearchType) => (dispatch: eDispatch) => {
  dispatch({
    type: ADD_FILTER_DASH,
    payload: _searchKey,
  });
};

export const clearKeyDash = (key: string, callback: () => void) => (dispatch: eDispatch) => {
  dispatch({
    type: CLEAR_KEY_DASH,
    payload: key,
  });
  callback();
};

export const toggleDash = () => (dispatch: eDispatch) => { 
  dispatch({
    type: 'TOGGLE_DASH',
  });
}
