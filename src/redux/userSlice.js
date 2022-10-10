import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: false,
        status: true,
        selectUser: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.status = false;
        },
        logout: (state) => {
            state.user = false;
            state.status = false;
        },
        addSelectUSer: (state, action) => {
            state.selectUser = action.payload;
        }
    }
})

export const { login, logout, addSelectUSer } = userSlice.actions;

export default userSlice.reducer;