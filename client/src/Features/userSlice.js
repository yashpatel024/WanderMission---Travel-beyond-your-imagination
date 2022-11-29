import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        //set initial state from localstorage if its already logged in
        user: 
        (localStorage.getItem("username"))
        ? 
            {
                username: localStorage.getItem("username")
            }
        :null
    },
    reducers: {
        //Login and logout reducers
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('username',action.payload.username);
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('username');
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
