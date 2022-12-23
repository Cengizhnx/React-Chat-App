import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: false,
        status: true,
        selectUser: false,
        chatId: false,
        chats: false,
        groupPrew: [],
        groupChats: false,
        groupUsers: false,
        groupState: true,
        userState: true,
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
        },
        chatID: (state, action) => {
            state.chatId = action.payload;
        },
        chats: (state, action) => {
            state.chats = action.payload;
        },
        addGroupPrew: (state, action) => {
            const temp = action.payload
            const items = state.groupPrew.filter((item) => item.uid === temp.uid)
            if (items.length > 0) {
            }
            else {
                state.groupPrew.push(action.payload);
            }
        },
        deleteGroupPrew: (state, action) => {
            const temp = action.payload
            console.log(temp);
            const items = state.groupPrew.find((item) => item.uid === temp.uid)
            state.groupPrew.pop(items);
        },
        resetGroupPrew: (state) => {
            state.groupPrew = []
        },
        groupChats: (state, action) => {
            state.groupChats = action.payload;
        },
        groupUsers: (state, action) => {
            state.groupUsers = action.payload;
        },
        groupState: (state, action) => {
            state.groupState = action.payload;
        },
        userState: (state, action) => {
            state.userState = action.payload;
        },
    }
})

export const { login, logout, addSelectUSer, chatID, chats, addGroupPrew, deleteGroupPrew, resetGroupPrew, groupChats, groupUsers, groupState, userState } = userSlice.actions;

export default userSlice.reducer;