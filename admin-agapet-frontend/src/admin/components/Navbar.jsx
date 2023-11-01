import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/auth/authSlice";
import { userAPI } from "../../api/userAPI";

//https://www.youtube.com/watch?v=h8BBcr9IPkE&ab_channel=RodrigoM%C3%A9ndez

export const Navbar = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  const name = localStorage.getItem("name");
  const user_type = localStorage.getItem("user_type");
  const idColaborador = localStorage.getItem("idColaborador");

  const [permisos, setpermisos] = useState([]);
  //obtener la lista de permisos con el idColaborador, solo hacer el fecth cuando type_User sea colab.

  const loadPermisos = async () => {
    if (user_type !== "ADM") {
      const resp = await userAPI.get(`colaboradordetail/${idColaborador}`);
      console.log(resp.data.permisos);
      setpermisos(resp.data.permisos);
    } else {
      return;
    }
  };

  useEffect(() => {
    loadPermisos();
  }, []);

  return (
    <>
      {/* <div className="w-1/6 border shadow-md h-screen"> */}
      <nav className="flex flex-col border font-bold border-b-0 w-full">
        <div className="w-full flex justify-center">
          {/* <Link to="/dashboard"> */}
          <img
            src="../src/assets/amoanimales.png"
            alt=""
            className="mx-10 w-[130px] h-[200px] cursor-pointer "
          />
          {/* </Link> */}
        </div>

        <div className="flex mb-2">
          <img
            src="../src/assets/hogar.png"
            alt=""
            className="object-contain ml-2"
          />
          <NavLink className={"p-2"} to="/dashboard">
            Inicio
          </NavLink>
        </div>

        {user_type === "ADM" ? (
          <div>
            <hr />
            <div className="flex mb-2">
              <img
                src="../src/assets/gestion.png"
                alt=""
                className="object-contain ml-2"
              />
              <NavLink className={"p-2"} to="/colaborador">
                Colaboradores
              </NavLink>
            </div>
            <hr />
            <div className="flex mb-2">
              <img
                src="../src/assets/animales-rescatados.png"
                alt=""
                className="object-contain ml-2"
              />
              <NavLink className={"p-2"} to="/animales-rescatados">
                Animales Rescatados
              </NavLink>
            </div>
            <hr />
            <div className="flex mb-2">
              <img
                src="../src/assets/adoptantes.png"
                alt=""
                className="object-contain ml-2"
              />
              <NavLink className={"p-2"} to="/adoptantes">
                Adoptantes
              </NavLink>
            </div>
            <hr />
            <div className="flex mb-2">
              <img
                src="../src/assets/actividades.png"
                alt=""
                className="object-contain ml-2"
              />
              <NavLink className={" p-2"} to="/actividades">
                Actividades
              </NavLink>
            </div>
            <hr />
            {/* <div className="flex mb-2">
              <img
                src="../src/assets/cursos.png"
                alt=""
                className="object-contain ml-2 w-[32px] h-[32px]"
              />
              <NavLink className={"p-2"} to="/cursos">
                Cursos
              </NavLink>
            </div>
            <hr /> */}
            {/* <div className="flex mb-2">
              <img
                src="../src/assets/vacunas.png"
                alt=""
                className="object-contain ml-2"
              />
              <NavLink className={"p-2"} to="/vacunas">
                Vacunas
              </NavLink>
            </div>
            <hr /> */}
            <div className="flex mb-2">
              <img
                src="../src/assets/preguntas-frecuentes.png"
                alt=""
                className="object-contain ml-2"
              />
              <NavLink className={"p-2"} to="/preguntas-frecuentes">
                Preguntas Frecuentes
              </NavLink>
            </div>
            <hr />
          </div>
        ) : (
          permisos.map((permisos) =>
            permisos.estado_permiso ? (
              <div key={permisos.id}>
                <div className="flex mb-2 items-center">
                  <img
                    src={`../src/assets/${permisos.permiso.nombre}.png`}
                    alt=""
                    className="object-contain ml-2 w-[32px] h-[32px]"
                  />
                  <NavLink
                    className={"p-2 capitalize"}
                    to={`/${permisos.permiso.nombre}`}
                  >
                    {permisos.permiso.nombre.replace("-", " ")}
                  </NavLink>
                </div>
                <hr />
              </div>
            ) : null
          )
        )}

        <div className="flex mb-1">
          <img
            src="../src/assets/user.png"
            alt=""
            className="object-contain ml-2 w-[32px] h-[32px]"
          />
          <NavLink className={"p-2"} to="perfil">
            Mi perfil ({name})
          </NavLink>
        </div>
        <hr />

        <div className="flex mb-1">
          <img
            src="../src/assets/configuracion.png"
            alt=""
            className="object-contain ml-2"
          />
          <NavLink className={"p-2"} to="/configuraciones">
            Configuraciones
          </NavLink>
        </div>
        <hr />
        <div className="flex justify-center w-full">
          <div className="flex justify-center bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-5/6 mb-1 mt-1">
            <img
              src="../src/assets/logout.png"
              alt=""
              className="object-contain ml-2 "
            />
            <button className="pl-2" onClick={onLogout}>
              Salir
            </button>
          </div>
        </div>
      </nav>
      {/* </div> */}
    </>
  );
};
