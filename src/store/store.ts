import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistStore
} from 'redux-persist';
import { cartSlice } from './cart/cart.slice';
import { filtersSlice } from './filters/filters.slice';
import { userSlice } from './user/user.slice';

const isClient = typeof window !== 'undefined';

const combinedReducers = combineReducers({
	cart: cartSlice.reducer,
	filters: filtersSlice.reducer,
	user: userSlice.reducer
});

let mainReducer = combinedReducers;

if (isClient) {
	const { persistReducer } = require('redux-persist');
	const storage = require('redux-persist/lib/storage').default;

	//Настройки для хранения данных в локал сторедж
	const persistConfig = {
		key: 'nextstore',
		storage,
		whitelist: ['cart']
	};

	mainReducer = persistReducer(persistConfig, combinedReducers);
}

export const store = configureStore({
	reducer: mainReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof mainReducer>;
