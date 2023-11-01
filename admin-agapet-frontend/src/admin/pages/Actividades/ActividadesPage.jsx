import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";
import { localizer } from "../../../helpers/actividadesLocalizer";
import { getMessagesEs } from "../../../helpers/getMessages";
import { CalendarEvent } from "./components/CalendarEvent";
import { useEffect, useState } from "react";
import { ActividadModal } from "./components/ActividadModal";
import { useUiActividades } from "../../../hooks/useUiActividades";
import { useActividadesStore } from "../../../hooks/useActividadesStore";
import { FabAddNewActividad } from "./components/FabAddNewActividad";
import { FabDeleteActividad } from "./components/FabDeleteActividad";

export const ActividadesPage = () => {
  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const { openDateModal } = useUiActividades();

  const { actividadesEvents, setActiveEvent, startLoadingEvents } = useActividadesStore();

  const idColaborador = localStorage.getItem("idColaborador");
  const idAdministrador = localStorage.getItem("idAdministrador");



  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log({ event, start, end, isSelected });

    ///
    const style = {
      backgroundColor: event.administrador!==null? "#347CF7":"#FB923C",  //#FB923C narana
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <div className="mt-12">
      <Calendar
        culture="es"
        localizer={localizer}
        events={actividadesEvents}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 50px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <ActividadModal />

      <FabAddNewActividad/>
      <FabDeleteActividad/>
    </div>
  );
};
