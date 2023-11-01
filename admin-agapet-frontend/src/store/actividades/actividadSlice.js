import { createSlice } from "@reduxjs/toolkit";

export const actividadSlice = createSlice({
  name: "actividadSlice",
  initialState: {
    isLoadingEvents: true,
    actividadesEvents: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewActividadEvent: (state, { payload }) => {
      state.actividadesEvents.push(payload);
      state.activeEvent = null;
    },
    onUpdateActividadEvent: (state, { payload }) => {
      state.actividadesEvents = state.actividadesEvents.map((event) => {
        if (event.idActividades === payload.idActividades) {
          return payload;
        }
        return event;
      });
    },
    onDeleteActividadEvent: (state, { payload }) => {
      if (state.activeEvent) {
        state.actividadesEvents = state.actividadesEvents.filter(
          (event) => event.idActividades !== state.activeEvent.idActividades
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      state.actividadesEvents=payload;
      /* 
      payload.forEach((event) => {
        const exist = state.actividadesEvents.some(
          (dbEvent) => dbEvent.id === event.id
        );
        if (!exist) {
          state.actividadesEvents.push(event);
        }
      });*/
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewActividadEvent,
  onUpdateActividadEvent,
  onDeleteActividadEvent,
  onLoadEvents,
} = actividadSlice.actions;
