import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: false,
        status: true,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.status = false;
        },
        logout: (state) => {
            state.user = false;
            state.status = false;
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;