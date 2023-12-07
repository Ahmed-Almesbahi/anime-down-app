import { persistStore, persistReducer } from 'redux-persist'
// import AsyncStorage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ["loginPage"],
  // blacklist: ['user'],
}

const logger = createLogger({
  collapsed: true,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(logger))
export const persistedStore = persistStore(store)
