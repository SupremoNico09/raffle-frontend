import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    setMustSpin: false,
};

export const rouletteSlice = createSlice({
    name: "roulette",
    initialState: { value: initialStateValue },
    reducers: {
        spin: (state, action) => {
            state.value = action.payload
            
        }, 

    }
})

export const { spin } = rouletteSlice.actions;

export default rouletteSlice.reducer;