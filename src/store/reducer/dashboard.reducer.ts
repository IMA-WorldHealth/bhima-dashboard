/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { CLEAR_KEY_DASH, ADD_FILTER_DASH } from '../type';
import PeriodService from '../../services/periodService.service';

const Periods = new PeriodService();
const _period = Periods.definition('today');

interface SupplierState {
  _filters: SearchType;
  isOpen: boolean;
}

const initialState: SupplierState = {
  _filters: {
    filter: {},
    displayValue: {},
    periode: _period,
  },
  isOpen: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const dashboardReducer = (state = initialState, action: any): SupplierState => {
  switch (action.type) {
    case ADD_FILTER_DASH:
      return {
        ...state,
        _filters: action.payload,
      };
    case CLEAR_KEY_DASH:
      const key = action.payload;
      const { displayValue } = state._filters;
      const filters = state._filters.filter;
      delete displayValue![key];
      delete filters![key];
      return {
        ...state,
        _filters: {
          ...state._filters,
          filter: {
            ...state._filters.filter,
            ...filters,
          },
          displayValue: {
            ...state._filters.displayValue,
            ...displayValue,
          },
        },
      };
    case 'TOGGLE_DASH':
      return {
       ...state,
        isOpen:!state.isOpen,
      };
    case 'HYDRATE':
      return {
        ...state,
        _filters: {
          filter: {},
          displayValue: {},
          periode: _period,
        },
      };
    default:
      return state;
  }
};

export default dashboardReducer;
