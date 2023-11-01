import { createSlice } from '@reduxjs/toolkit';

export const uiActividadesSlice = createSlice({
    name:'uiActividadesSlice' ,
    initialState: {  
        isActividadModalOpen:false
    },
    reducers: {  
        onOpenDateModal:(state)=>{
            state.isActividadModalOpen=true;
        },
        onCloseDateModal:(state)=>{
            state.isActividadModalOpen=false;
        }
    },
});

export const {onOpenDateModal,onCloseDateModal} = uiActividadesSlice.actions;