import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {userSlice} from './slices/userSlice';
import {userLoginSlice} from './slices/userLoginSlice';
import {diamondSlice} from './slices/diamondSlice';
import {jewelrySlice} from './slices/jewelrySlice';
import {distanceSlice} from './slices/distanceSlice';
import {cartSlice} from './slices/cartSlice';
import {promotionSlice} from './slices/promotionSlice';

const rootPersistConfig = {
	key: 'root',
	storage,
	safelist: ['userSlice'], // Add 'transactionSlice' to persist
};

const rootReducer = combineReducers({
	userSlice: userSlice.reducer,
	userLoginSlice: userLoginSlice.reducer,
	diamondSlice: diamondSlice.reducer,
	jewelrySlice: jewelrySlice.reducer,
	distanceSlice: distanceSlice.reducer,
	cartSlice: cartSlice.reducer,
	promotionSlice: promotionSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export * from './selectors'; // Export selectors
