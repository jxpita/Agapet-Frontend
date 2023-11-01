import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewActividadEvent,
  onDeleteActividadEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateActividadEvent,
} from "../store/actividades/actividadSlice";
import { actividadAPI } from "../api/actividadAPI";
import { convertEvent } from "../helpers/convertEvent";
import Swal from "sweetalert2";

export const useActividadesStore = () => {
  const { actividadesEvents, activeEvent } = useSelector(
    (state) => state.actividades
  );
  const dispatch = useDispatch();

  const setActiveEvent = (ActividadEvent) => {
    dispatch(onSetActiveEvent(ActividadEvent));
  };

  const startSavingEvent = async (ActividadEvent) => {
    //llegar al backend

    if (activeEvent.idActividades) {
      console.log("Estoy editando");

      await actividadAPI.put(
        `updateactividades/${activeEvent.idActividades}`,
        ActividadEvent
      );
      dispatch(onUpdateActividadEvent({ ...ActividadEvent }));
    } else {
      console.log("Estoy creando");
      const { idActividades, colaborador, administrador } =
        await actividadAPI.post("createactividad", ActividadEvent);

      dispatch(
        onAddNewActividadEvent({
          ...ActividadEvent,
          idActividades: idActividades,
          administrador: administrador,
          colaborador: colaborador,
        })
      );
    }

    /*

    try {
        // if bien
    if (ActividadEvent.idActividades) {
        //actualizando
        
        //console.log({ActividadEvent})
        //crear objeto

        //VERIFICAR NO HACE PUT
        const actividadUpdate={
            idActividades:ActividadEvent.idActividades,
            title:ActividadEvent.title,
            descripcion:ActividadEvent.descripcion,
            lugar:ActividadEvent.descripcion,
            start:ActividadEvent.start,
            end:ActividadEvent.end,
            colaborador:ActividadEvent.colaborador,
            administrador:ActividadEvent.administrador
        }

        await actividadAPI.put(`updateactividades/${ActividadEvent.idActividades}`,ActividadEvent);
        dispatch(onUpdateActividadEvent({ ...ActividadEvent }));
  

      } else {
        //creando
  
        const { idActividades, colaborador, administrador } =await actividadAPI.post("createactividad", ActividadEvent);
  
        
        dispatch(
          onAddNewActividadEvent({
            ...ActividadEvent,
            idActividades: idActividades,
            administrador: administrador,
            colaborador: colaborador,
          })
        );
      }
    } catch (error) {

        console.log(error);
        //Swal.fire('Error al guardar', error, 'error');
    }

    */
  };

  const startDeletingEvent = async () => {
    //todo: llegar al backend

    //if bien

    /* 
  await actividadAPI.put(`updateactividades/${activeEvent.idActividades}`, {
        ...activeEvent,
        is_active: false,
      });
 
 */

    try {
      const { administrador, colaborador, descripcion, end, lugar, title, start } =
        activeEvent;
      const { idAdministrador } = administrador;

      console.log(activeEvent);
      await actividadAPI.put(`updateactividades/${activeEvent.idActividades}`, {
        idAdministrador,
        colaborador,
        descripcion,
        start,
        end,
        lugar,
        title,
        is_active: false,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(onDeleteActividadEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const resp = await actividadAPI.get("listactividades");
      const events = convertEvent(resp.data);

      const onlyActive=events.filter((e)=>e.is_active!==false);

      dispatch(onLoadEvents(onlyActive));
      console.log(events);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    actividadesEvents,
    activeEvent,

    hasEventSelected: !!activeEvent?.idActividades,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
