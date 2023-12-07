import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateHeaderType,
  HeaderActionTypes
} from './types';


/*
 *
 * Header constants
 *
 */
export const DEFAULT_ACTION = 'app/Header/DEFAULT_ACTION';


/*
 *
 * Header reducer
 *
 */
export const initialState : initialStateHeaderType = {
  error: '',
  loaded: false,
  loading: false,
};

export default (state = initialState, action: HeaderActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

/**
 * Direct selector to the header state domain
 */
const selectHeaderDomain = state => state.header || initialState;

/**
 * Default selector used by Header
 */
export const makeSelectHeader = () =>
  createSelector(selectHeaderDomain, substate => substate);


/*
 *
 * Header actions
 *
 */
export function defaultAction():HeaderActionTypes {
  return {
    type: DEFAULT_ACTION,
  };
}
