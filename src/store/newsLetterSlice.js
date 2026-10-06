import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    subscribed: false,
};

const newsletterSlice = createSlice({
    name: "newsletter",

    initialState,

    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },

        subscribe: (state) => {
            if (state.email.trim() !== "") {
                state.subscribed = true;
            }
        },
    },
});

export const { setEmail, subscribe } = newsletterSlice.actions;

export default newsletterSlice.reducer;