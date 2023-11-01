import React, { useEffect, useState } from "react";

import "./LoginPage.css";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { useAuthstore } from "../../hooks/useAuthstore";
import Swal from "sweetalert2";

const authForm = {
  email: "",
  password: "",
};

const authFormValidations = {
  email: [
    (value) =>
      new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
      ).test(value),
    "Ingrese un correo válido",
  ],
  password: [(value) => value.length >= 1, "La contraseña es obligatoria"],
};

export const LoginPage = () => {
  const [formSubmitted, setformSubmitted] = useState(false);
  const { startLogin, errorMessage } = useAuthstore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  const {
    email,
    password,
    emailValid,
    passwordValid,
    onInputChange,
    isFormValid,
  } = useForm(authForm, authFormValidations);

  const onSubmit = (e) => {
    e.preventDefault();

    setformSubmitted(true);

    if (!isFormValid) {
      return;
    }

    startLogin({ email, password });
  };

  return (
    <div className="flex justify-start items-center">
      <div className="w-3/4 flex flex-col ">

        <div className="py-2 flex justify-center items-center">
          <h1 className="mb-5 text-gray-500 font-bold text-2xl">
            BIENVENIDO/A AL PANEL DE ADMINISTRACIÓN
          </h1>
        </div>

        <div className="flex justify-end">
         
        <form
            action=""
            className="mb-10 w-3/4  mr-4 "
            onSubmit={onSubmit}
          >
            <div className="flex flex-col mb-2">
              <label htmlFor="email" className="block text-gray-600 font-bold">
                Correo
              </label>
              <input
                type="text"
                className="border-2 w-3/5 p-2 mt-2 mb-5 placeholder-gray-400 rounded-md border-cyan-400"
                placeholder="Ingrese su correo"
                autoComplete="off"
                name="email"
                onChange={onInputChange}
              />
              {formSubmitted && emailValid ? (
                <div className="alert alert-error w-1/2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{emailValid}</span>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="block text-gray-600 font-bold"
              >
                Contraseña
              </label>
              <input
                type="password"
                className="border-2 w-3/5 p-2 mt-2  mb-5 placeholder-gray-400 rounded-md border-cyan-400"
                placeholder="Ingrese su contraseña"
                autoComplete="off"
                name="password"
                onChange={onInputChange}
              />
              {formSubmitted && passwordValid ? (
                <div className="alert alert-error w-1/2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{passwordValid}</span>
                </div>
              ) : null}
            </div>

            <div className="flex justify-center">
              <button
                className="border-2 p-2 mt-1  mr-52 rounded-md bg-orange-400 text-white font-bold uppercase cursor-pointer"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>


       
      </div>

      <div className="w-1/4">
        <img src="../src/assets/amoanimales.png" alt="" />
      </div>

      <img src="../src/assets/wave2.png" alt="" className="wave2" />
      <img src="../src/assets/wave1.png" alt="" className="wave1" />
    </div>
  );
};
/* 



  <div className="w-3/4 flex flex-col justify-between h-full">


      
        <h1 className="text-center mb-10 text-gray-500 font-bold text-2xl">
          BIENVENIDO/A AL PANEL DE ADMINISTRACIÓN
        </h1>



        <form
          action=""
          className="py-16 px-5 mb-10 w-3/4 mx-auto"
          onSubmit={onSubmit}
        >

          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="block text-gray-600 font-bold">
              Correo
            </label>
            <input
              type="text"
              className="border-2 w-1/2 p-2 mt-2 mb-5 placeholder-gray-400 rounded-md border-cyan-400"
              placeholder="Ingrese su correo"
              autoComplete="off"
              name="email"
              onChange={onInputChange}
            />
            {formSubmitted && emailValid ? (
              <div className="alert alert-error w-1/2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{emailValid}</span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="block text-gray-600 font-bold">
              Contraseña
            </label>
            <input
              type="password"
              className="border-2 w-1/2 p-2 mt-2  mb-5 placeholder-gray-400 rounded-md border-cyan-400"
              placeholder="Ingrese su contraseña"
              autoComplete="off"
              name="password"
              onChange={onInputChange}
            />
            {formSubmitted && passwordValid ? (
              <div className="alert alert-error w-1/2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{passwordValid}</span>
              </div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button
              className="border-2 p-2 rounded-md bg-orange-400 text-white font-bold uppercase cursor-pointer"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
*/
