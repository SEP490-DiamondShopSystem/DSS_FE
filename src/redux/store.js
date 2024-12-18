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
import {orderSlice} from './slices/orderSlice';
import {customizeSlice} from './slices/customizeSlice';
import {warrantySlice} from './slices/warrantySlice';
import {paymentSlice} from './slices/paymentSlice';
import {reviewSlice} from './slices/reviewSlice';
import {blogSlice} from './slices/blogSlice';
import {logSlice} from './slices/logSlice';
import {diamondPriceSlice} from './slices/diamondPriceSlice';
import {configSlice} from './slices/configSlice';
import {locationSlice} from './slices/locationSlice';
import {transactionSlice} from './slices/transactionSlice';
const rootPersistConfig = {
	key: 'root',
	storage,
	safelist: ['userSlice'], // Add 'transactionSlice' to persist
};

const rootReducer = combineReducers({
	userSlice: userSlice.reducer,
	userLoginSlice: userLoginSlice.reducer,
	diamondSlice: diamondSlice.reducer,
	diamondPriceSlice: diamondPriceSlice.reducer,
	jewelrySlice: jewelrySlice.reducer,
	distanceSlice: distanceSlice.reducer,
	cartSlice: cartSlice.reducer,
	orderSlice: orderSlice.reducer,
	promotionSlice: promotionSlice.reducer,
	customizeSlice: customizeSlice.reducer,
	warrantySlice: warrantySlice.reducer,
	paymentSlice: paymentSlice.reducer,
	reviewSlice: reviewSlice.reducer,
	blogSlice: blogSlice.reducer,
	logSlice: logSlice.reducer,
	configSlice: configSlice.reducer,
	locationSlice: locationSlice.reducer,
	transactionSlice: transactionSlice.reducer,
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
