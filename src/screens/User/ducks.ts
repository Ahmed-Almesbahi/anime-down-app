import produce from 'immer'
import { createSelector } from 'reselect'

/*
 *
 * User constants
 *
 */

export const SET_USER = 'app/User/SET_USER'
export const SIGN_OUT = 'app/User/SIGN_OUT'
export const UPDATE_PROFILES = 'app/User/UPDATE_PROFILES'
// export const UPDATE_FAVOURITES = 'app/User/UPDATE_FAVOURITES'
export const UPDATE_SELECTED_PROFILE = 'app/User/UPDATE_SELECTED_PROFILE'
/*
 *
 * User reducer
 *
 */
export const initialUserState = {
  id: 0,
  email: null,
  token: null,
  profiles: [],
  selectedProfile: {},
  status: 0,
  loading: false,
  error: false,
}

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialUserState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_USER:
        draft.id = action.payload.id
        draft.email = action.payload.email
        draft.token = action.payload.token
        draft.status = action.payload.status
        draft.profiles = action.payload.Profiles
        break
      case SIGN_OUT:
        draft.id = 0
        draft.email = null
        draft.token = null
        draft.status = 0
        draft.profiles = []
        draft.selectedProfile = {}
        break
      case UPDATE_PROFILES:
        draft.profiles = action.payload
        break
      case UPDATE_SELECTED_PROFILE:
        ;(draft.selectedProfile = {
          Image: { url: action.payload.imageUrl },
          name: action.payload.name,
        }),
          (draft.token = action.payload.token)
        break
        // case UPDATE_FAVOURITES:
        //   draft.favourites = action.payload
        break
      default:
        state
    }
  })
}

export default reducer

const selectUserDomain = (state) => state.user || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by User
 */

export const makeSelectUser = () =>
  createSelector(selectUserDomain, (substate) => substate)

/*
 *
 * User actions
 *
 */

// export function setUser(payload: any) {
//   return {
//     type: SET_USER,
//     payload: payload,
//   }
// }
export function updateProfiles(payload) {
  return {
    type: UPDATE_PROFILES,
    payload,
  }
}
export function updateSelectedProfile(payload) {
  return {
    type: UPDATE_SELECTED_PROFILE,
    payload,
  }
}
