import { applyMiddleware, compose, combineReducers, createStore, Store, Action } from 'redux';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import { thunk, ThunkAction } from 'redux-thunk';
import localforage from 'localforage';
import dashboardReducer from './reducer/dashboard.reducer';

declare global {
  interface Window {
    REDUX_DEVTOOLS_EXTENSION_COMPOSE?: typeof compose;
  }
}

const composeEnhancers = (typeof window !== 'undefined' && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE) || compose;
// config persist

const persistRootConfig = {
  key: 'root',
  storage: localforage,
};

const rootReducer = combineReducers({
  dashboardState: dashboardReducer,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistRootReducer = persistReducer(persistRootConfig, rootReducer as any);
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = Store['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;
export const store = createStore(persistRootReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
