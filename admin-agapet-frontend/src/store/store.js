import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { animalRescatadoSlice } from './animal-rescatado/animalRescatadoSlice'
import { updateAnimalRescatadoSlice } from './animal-rescatado/updateAnimalRescatadoSlice'
import { uiActividadesSlice } from './ui-actividades/uiActividadesSlice'
import { actividadSlice } from './actividades/actividadSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice.reducer,
    animalRescatado:animalRescatadoSlice.reducer,
    updateAnimalRescatado:updateAnimalRescatadoSlice.reducer,
    uiActividades:uiActividadesSlice.reducer,
    actividades:actividadSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})