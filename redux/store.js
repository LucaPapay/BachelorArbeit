import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

let initalState = {
    data: [
        {
            title: 'Main Office',
            data: ['Tisch', 'Sessel', 'Drucker'],
        },
        {
            title: 'Branch Office',
            data: ['Stuhl', 'Drucker', 'Sessel'],
        },
        {
            title: 'Main Office',
            data: ['Tisch', 'Sessel', 'Drucker'],
        },
        {
            title: 'Branch Office',
            data: ['Stuhl', 'Drucker', 'Sessel'],
        },
    ],
};


export const store = createStore(persistedReducer, initalState)
export const persistor = persistStore(store)
