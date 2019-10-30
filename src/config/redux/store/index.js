import { applyMiddleware, createStore } from 'redux'
import { logger,thunk } from '../middleware'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import rootReducer from '../reducers'

const persistConfig = {
  key : 'root',
  storage : AsyncStorage,
  whitelist : ['auth'],
  blacklist : ['room','costumer']
}

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store redux
const store = createStore(persistedReducer,applyMiddleware(logger,thunk))

// store persist
let persistor = persistStore(store)

export {store, persistor};
