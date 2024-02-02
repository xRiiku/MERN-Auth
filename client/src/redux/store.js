import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/* Utilizamos redux-persist para que al iniciar sesión el usuario, se guarde la información
y no tenga que iniciar sesión cada vez que actualiza la página */

const rootReducer = combineReducers({user: userReducer})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)