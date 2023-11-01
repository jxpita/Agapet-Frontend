import React, { useEffect, useState } from "react";
import { userAPI } from "../../../../api/userAPI";
import { Link } from "react-router-dom";

export const AdoptantesRegistrados = () => {
  const [adoptantes, setadoptantes] = useState([]);

  const loadAdoptantes = async () => {
    try {
      const resp = await userAPI.get("adoptanteslist");
      setadoptantes(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAdoptantes();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table bg-white">
        {/* head */}
        <thead className="bg-table-header text-black text-center">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            {/* <th>Etapa</th> */}
            <th>Perfil</th>
          </tr>
        </thead>
        <tbody className="text-center font-semibold">
          {adoptantes.map((adoptante) => (
            <tr key={adoptante.idAdoptante}>
              <td>{adoptante.user.name}</td>
              <td>{adoptante.user.lastname}</td>
              <td>{adoptante.user.email}</td>
              <td>{adoptante.user.phone}</td>
              <td className="flex justify-center">
                <Link to={`/../adoptantes/perfil-adoptante/${adoptante.idAdoptante}`}>
                <img
                  src="../src/assets/user.png"
                  className="h-[32px] w-[32px] cursor-pointer"
                />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
