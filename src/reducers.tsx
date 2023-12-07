import { combineReducers } from 'redux';

import userReducer from './screens/User/ducks'


const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer