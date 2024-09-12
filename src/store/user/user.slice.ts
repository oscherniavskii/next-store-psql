import { IAuthResponse, IReturnUserFields } from '@/types/user.interface';
import { getStorageLocal } from '@/utils/local-storage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInitialState {
	user: IReturnUserFields | null;
}

const initialState: IInitialState = {
	user: getStorageLocal('user')
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		saveUser: (state, action: PayloadAction<IAuthResponse>) => {
			state.user = action.payload.user;
		},
		removeUser: state => {
			state.user = null;
		}
	}
});
