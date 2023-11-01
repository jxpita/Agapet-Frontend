import React, { useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import axios from "axios";
import { userAPI } from "../../../../api/userAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Volver } from "../../../components/Volver";

const colaboradorForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  reppassword: "",
  fecha_nacimiento: "",
  phone: "",
  age: 0,
};

const colaboradorFormValidations = {
  name: [(value) => value.length >= 1, "El nombre es obligatorio"],
  lastname: [(value) => value.length >= 1, "El apellido es obligatorio"],
  email: [
    (value) =>
      new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
      ).test(value),
    "Ingrese un correo válido",
  ],
  password: [(value) => value.length >= 1, "La contraseña es obligatoria"],
  reppassword: [(value) => value.length >= 1, "Campo obligatorio"],
  fecha_nacimiento: [(value) => value.length >= 1, "La fecha es obligatoria"],
  phone: [(value) => value.length >= 1, "El teléfono es obligatorio"],
};

export const FormColaborador = () => {

  const navigate = useNavigate();
  const [formSubmitted, setformSubmitted] = useState(false);

  const {
    name,
    lastname,
    email,
    password,
    reppassword,
    fecha_nacimiento,
    phone,
    onInputChange,
    isFormValid,
    nameValid,
    lastnameValid,
    emailValid,
    passwordValid,
    reppasswordValid,
    fecha_nacimientoValid,
    phoneValid,
  } = useForm(colaboradorForm, colaboradorFormValidations);

  const calculateAge = (fecha_nacimiento) => {
    let today = new Date();
    let fechaNacimiento = new Date(fecha_nacimiento);
    let age = today.getFullYear() - fechaNacimiento.getFullYear();
    let month = today.getMonth() - fechaNacimiento.getMonth();

    if (
      month < 0 ||
      (month === 0 && today.getDate() < fechaNacimiento.getDate())
    ) {
      age--;
    }
    return age;
  };



  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      setformSubmitted(true);

      console.log(isFormValid)

      if(!isFormValid){
        return;
      }


      const newUser = {
        name,
        lastname,
        password,
        email,
        direction:'',
        phone,
        age: calculateAge(fecha_nacimiento),
      };

      console.log("Agregando a user");
      console.log(newUser);

      const resp= await userAPI.post("registercolaborador",{user:newUser});
      console.log(resp);

      
      Swal.fire({
        title: "Colaborador Agregado!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(-1);
      });

    } catch (error) {

      console.log(error.response.data.user.email[0]);

      
      Swal.fire({
        title: "Lo siento, ha ocurrido un error",
        text: error.response.data.user.email[0],
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="mt-4">
      <div className="w-full mt-10 p-2 ">

        <Volver/>

        <h1 className="text-xl font-bold mx-2 uppercase">
          Agregar Colaborador
        </h1>
        <hr />
      </div>

      <div className="bg-white mt-10 border shadow-sm rounded-md w-full flex justify-center">
        <form action="" onSubmit={onSubmit} className="w-2/4">
          <div className="flex justify-between mb-2">
            <div className="flex flex-col">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="input input-bordered input-sm mb-2 "
                name="name"
                onChange={onInputChange}
              />
              {formSubmitted && nameValid ? (
                <div className="alert alert-error mb-2">
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
                  <span>{nameValid}</span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname">Apellido</label>
              <input
                type="text"
                className="input input-bordered input-sm mb-2"
                name="lastname"
                onChange={onInputChange}
              />
              {formSubmitted && lastnameValid ? (
                <div className="alert alert-error mb-2">
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
                  <span>{lastnameValid}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <div className="flex flex-col">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                className="input input-bordered input-sm mb-2"
                name="email"
                onChange={onInputChange}
              />
              {formSubmitted && emailValid ? (
                <div className="alert alert-error mb-2">
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
              <label htmlFor="email">Teléfono</label>
              <input
                type="number"
                className="input input-bordered input-sm mb-2"
                name="phone"
                onChange={onInputChange}
              />
              {formSubmitted && phoneValid ? (
                <div className="alert alert-error mb-2">
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
                  <span>{phoneValid}</span>
                </div>
              ) : null}
            </div>





         
          </div>

          <div className="flex justify-between mb-2">
            <div className="flex flex-col">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="input input-bordered input-sm "
                name="password"
                onChange={onInputChange}
              />

              {formSubmitted && passwordValid ? (
                <div className="alert alert-error mt-2">
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
            <div className="flex flex-col">
              <label htmlFor="reppassword">Confirmar contraseña</label>
              <input
                type="password"
                className="input input-bordered input-sm "
                name="reppassword"
                onChange={onInputChange}
              />

              {formSubmitted && reppasswordValid ? (
                <div className="alert alert-error mt-2">
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
                  <span>{reppasswordValid}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex">
            <div className="flex flex-col">
              <label htmlFor="nombre">Fecha de Nacimiento</label>
              <input
                type="date"
                className="border p-2 rounded-md w-[188px]"
                name="fecha_nacimiento"
                value={fecha_nacimiento}
                onChange={onInputChange}
              />

              {formSubmitted && fecha_nacimientoValid ? (
                <div className="alert alert-error mt-2">
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
                  <span>{fecha_nacimientoValid}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center mt-5 mb-4">
            <button
              className="border bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3"
              type="submit"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


/*
   <div className="flex flex-col mb-2">
              <label htmlFor="email">Género</label>

              <div className="flex gap-1">
                <div>
                  <label htmlFor="">Masculino</label>
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    className="radio"
                    onChange={onInputChange}
                    checked={gender == "M" ? true : false}
                  />
                </div>
                <div>
                  <label htmlFor="F">Femenino</label>
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    className="radio"
                    onChange={onInputChange}
                    checked={gender == "F" ? true : false}
                  />
                </div>
              </div>

            </div>

              {formSubmitted && genderValid ? (
                <div className="alert alert-error mt-2">
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
                  <span>{genderValid}</span>
                </div>
              ) : null}

*/ 