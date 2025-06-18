import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async params => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
        `https://645a73b865bd868e931b84fe.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
});

const initialState = {
    items: [],
};
const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducerbuilder: {
        [fetchPizzas.pending]: (state, action) => {
            console.log('Идёт отправка');
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            console.log(state, 'ВСЁ OK');
        },
        [fetchPizzas.rejected]: (state, action) => {
            console.log('Была ошибка');
        },
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
