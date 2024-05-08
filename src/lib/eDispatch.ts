import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type eDispatch = ThunkDispatch<Record<string, unknown>, Record<string, unknown>, AnyAction>;
