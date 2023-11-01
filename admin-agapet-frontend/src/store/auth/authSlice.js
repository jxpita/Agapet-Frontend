import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {  
        status:'', //checking ,not-authenticated, authenticated
        errorMessage:undefined,
        name:'',
        user_type:''
    },
    reducers: {  
        login:(state,{payload})=>{
            state.status = 'authenticated';
            state.errorMessage=undefined;
            state.name=payload;
            //state.user_type=payload.user_type
        },
        logout:(state, { payload })=>{
            state.status = 'not-authenticated';
            state.errorMessage=payload;
        },
        checkingCredentials:(state)=>{
            state.status='checking';
            state.errorMessage=undefined;
        },
        clearErrorMessage:(state)=>{
            state.errorMessage=undefined;
        }
    },
});

export const {login, logout, checkingCredentials, clearErrorMessage} = authSlice.actions;