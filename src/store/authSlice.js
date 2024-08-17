import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        }
    }
})