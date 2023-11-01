import React, { useEffect, useState } from "react";
import { actividadAPI } from "../../../../api/actividadAPI";
import { parseISO, format, addHours } from "date-fns";
import { convertEvent } from "../../../../helpers/convertEvent";

export const ActividadesHoy = () => {
  const [hoy, sethoy] = useState(new Date().toString());

  const [listactividades, setlistactividades] = useState([]);

  const loadActividadesSemanales = async () => {
    const resp = await actividadAPI.get("actividadessemanales");
    setlistactividades(resp.data);
  };

  useEffect(() => {
    loadActividadesSemanales();
  }, []);

  return (
    <div className="bg-white  border shadow-md rounded-md w-full p-4 mt-2 font-semibold">
      <table className="table bg-white">
        {/* head */}
        <thead className="bg-table-header text-black text-center">
          <tr>
            <th>Día</th>
            <th>Horario</th>
            <th>Título</th>
          </tr>
        </thead>
        <tbody className="text-center font-semibold">
          {listactividades.reverse().map((act) => {
            const startDate = new Date(act.actividad.start);
            const endDate = new Date(act.actividad.end);

            const nextDay = new Date(startDate);
            nextDay.setDate(startDate.getDate());

            const nextDayOfWeek = new Intl.DateTimeFormat("es-ES", {
              weekday: "long",
            }).format(nextDay);

            const startTime = new Date(startDate);
            startTime.setHours(startDate.getHours() + 5);
            const formattedStartTime = startTime.toLocaleTimeString("es-ES", {
              timeStyle: "short",
            });

            const endTime = new Date(endDate);
            endTime.setHours(endDate.getHours() + 5);
            const formattedendTime = endTime.toLocaleTimeString("es-ES", {
              timeStyle: "short",
            });

            return (
              <tr key={act.actividad.idActividades}>
                <td className="capitalize">{nextDayOfWeek}</td>
                <td>
                  {formattedStartTime}-{formattedendTime}
                </td>
                <td>{act.actividad.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
