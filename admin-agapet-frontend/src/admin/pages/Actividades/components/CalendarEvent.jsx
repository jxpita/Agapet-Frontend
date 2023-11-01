import React from "react";

export const CalendarEvent = ({ event }) => {
  //Para personalizar el cuadrito del evento

  const { title,descripcion } = event;


  return (
    <>
      <strong>{title}</strong>
      <span>-{descripcion}</span>
    </>
  );
};
