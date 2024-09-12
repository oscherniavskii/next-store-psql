import { cartSlice } from './cart/cart.slice';
import { filtersSlice } from './filters/filters.slice';
import { userSlice } from './user/user.slice';

export const rootActions = {
	...userSlice.actions,
	...cartSlice.actions,
	...filtersSlice.actions
};
