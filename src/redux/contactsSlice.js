import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchAllThunk,
  addContactThunk,
  deleteContactThunk,
} from 'services/api';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const arrThunks = [fetchAllThunk, addContactThunk, deleteContactThunk];

const getAction = type => isAnyOf(...arrThunks.map(el => el[type]));

const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilled = state => {
  state.isLoading = false;
  state.error = '';
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    const { FULFILLED, REJECTED, PENDING } = STATUS;
    builder
      .addCase(fetchAllThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
        state.error = null;
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
        state.error = null;
      })
      .addMatcher(getAction(PENDING), handlePending)
      .addMatcher(getAction(REJECTED), handleRejected)
      .addMatcher(getAction(FULFILLED), handleFulfilled);
  },
});

export const contactsReducer = contactsSlice.reducer;
