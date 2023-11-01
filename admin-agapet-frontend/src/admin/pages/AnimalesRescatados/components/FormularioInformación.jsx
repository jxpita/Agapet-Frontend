import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateInfoForm } from "../../../../store/animal-rescatado/animalRescatadoSlice";
import { Stepper } from "react-form-stepper";

export const FormularioInformación = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [generoSeleccionado, setgeneroSeleccionado] = useState(undefined);
  const [mesSeleccionado, setmesSeleccionado] = useState(undefined);
  const [estadoSeleccionado, setestadoSeleccionado] = useState(undefined);
  const [tipoAnimalSeleccionado, settipoAnimalSeleccionado] =
    useState(undefined);
  const [file, setfile] = useState(null);
  const [formSubmitted, setformSubmitted] = useState(false);

  const infoAnimal = {
    nombre: "",
    estado: "",
    peso: "",
    deportivo: 5,
    sociable: 5,
    jugueton: 5,
    miedoso: 5,
    anios: "",
    meses: "",
    descripcion: "",
    comida: "",
    tipo_animal: "",
  };

  const infoAnimalValidations = {
    nombre: [(value) => value.length >= 1, "El nombre es obligatorio"],
    estado: [(value) => value !== undefined, "Campo obligatorio"],
    peso: [(value) => value !== undefined, "Campo obligatorio"],
    deportivo: [(value) => value !== undefined, "Campo obligatorio"],
    sociable: [(value) => value !== undefined, "Campo obligatorio"],
    jugueton: [(value) => value !== undefined, "Campo obligatorio"],
    miedoso: [(value) => value !== undefined, "Campo obligatorio"],
    anios: [(value) => value !== undefined, "Campo obligatorio"],
    meses: [(value) => value !== undefined, "Campo obligatorio"],
    descripcion: [(value) => value.length >= 1, "Campo obligatorio"],
    comida: [(value) => value !== undefined, "Campo obligatorio"],
  };

  const {
    nombre,
    peso,
    deportivo,
    sociable,
    jugueton,
    miedoso,
    anios,
    meses,
    descripcion,
    comida,
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
  } = useForm(infoAnimal, infoAnimalValidations);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const ImagenUpload = async (e) => {
    const base64 = await convertBase64(file);
    return base64;
  };

  const onContinueFormInfo = async (e) => {
    //https://www.youtube.com/watch?v=18q6-QR_XXY&ab_channel=HusseinNasser
    //https://www.youtube.com/watch?v=CuCQASyBuk4&ab_channel=BorjaScript
    //https://www.youtube.com/watch?v=qmr9NCYjueM&t=306s&ab_channel=SamLama

    e.preventDefault();
    setformSubmitted(true);

    console.log(isFormValid);
    if (!isFormValid) {
      return;
    }

    if (file !== null) {
      //const localImageurl = window.URL.createObjectURL(file); //crea bloburl de la imagen

      const infoForm = {
        nombre,
        genero: generoSeleccionado,
        estado: estadoSeleccionado,
        descripcion,
        image64: await ImagenUpload(),
        anios,
        meses: mesSeleccionado,
        peso,
        comida,
        deportivo,
        jugueton,
        sociable,
        miedoso,
        idanimal: tipoAnimalSeleccionado,
      };

      console.log(infoForm);

      dispatch(updateInfoForm(infoForm));

      //para mandar la imagen via api hay q hacer un formData
      navigate("../info-esterilizacion");
    }
  };

  return (
    <div className="">
      <div className="w-full  p-2 ">
        <h1 className="text-xl font-bold mx-2 uppercase">
          Agregar nuevo animal
        </h1>
        <hr />
      </div>
      {/* 
      <Stepper
        steps={[{ label: "Información" }, { label: "Esterilización" }, { label: "Desparacitación" }]}
        activeStep={0}
        styleConfig={
          {disabledColor:"#54BFD3",
        }}
      /> */}
      <div className="flex justify-center">
        <ul className="steps gap-3">
          <li className="step step-info">Información</li>
          <li className="step ">Esterilización</li>
          <li className="step">Desparasitación</li>
        </ul>
      </div>

      <div className="bg-white p-2  mx-auto border shadow-sm rounded-md w-4/5">
        <form action="" className="font-bold">
          {/* <h3 className="font-bold text-lg">Información del animal</h3>
          <hr /> */}

          {isFormValid == false && formSubmitted ? (
            <div className="alert alert-error mb-2 mt-2">
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
              <span>Todos los campos son obligatorios</span>
            </div>
          ) : null}

          <div className="flex mt-4 justify-between ">
            {/* izq */}
            <div className="p-2">
              <div className="flex flex-col ">
                <label htmlFor="nombre" className="font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-3/4 input-sm "
                  name="nombre"
                  value={nombre}
                  onChange={onInputChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Estado</label>
                <select
                  className="select select-bordered w-3/4"
                  defaultValue={""}
                  value={estadoSeleccionado}
                  onChange={(e) => setestadoSeleccionado(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione el estado
                  </option>
                  <option value="S">Disponible</option>
                  <option value="N">No disponible</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Especie</label>
                <select
                  className="select select-bordered w-3/4"
                  defaultValue={""}
                  value={tipoAnimalSeleccionado}
                  onChange={(e) => settipoAnimalSeleccionado(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione la especie
                  </option>
                  <option value="1">Perro</option>
                  <option value="2">Gato</option>
                </select>
              </div>

              <div>
                <label htmlFor="nombre" className="font-bold mb-2">
                  Peso
                </label>

                <div className="flex">
                  <input
                    type="number"
                    placeholder=""
                    className="input input-bordered w-1/4 input-sm "
                    name="peso"
                    value={peso}
                    onChange={onInputChange}
                  />
                  <label className="font-bold ml-2 mt-1">Kg</label>
                </div>
              </div>

              <div className="pt-3">
                <div className="flex justify-between mb-2">
                  <div className="flex flex-col ">
                    <label htmlFor="">Deportivo</label>
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        name="deportivo"
                        className="mask mask-star-2 bg-orange-400"
                        value={1}
                        checked={deportivo == 1 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="deportivo"
                        className="mask mask-star-2 bg-orange-400"
                        value={2}
                        checked={deportivo == 2 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="deportivo"
                        className="mask mask-star-2 bg-orange-400"
                        value={3}
                        checked={deportivo == 3 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="deportivo"
                        className="mask mask-star-2 bg-orange-400"
                        value={4}
                        checked={deportivo == 4 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="deportivo"
                        className="mask mask-star-2 bg-orange-400"
                        value={5}
                        checked={deportivo == 5 ? true : false}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="">Juguetón</label>
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        name="jugueton"
                        className="mask mask-star-2 bg-orange-400"
                        value={1}
                        checked={jugueton == 1 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="jugueton"
                        className="mask mask-star-2 bg-orange-400"
                        value={2}
                        checked={jugueton == 2 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="jugueton"
                        className="mask mask-star-2 bg-orange-400"
                        value={3}
                        checked={jugueton == 3 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="jugueton"
                        className="mask mask-star-2 bg-orange-400"
                        value={4}
                        checked={jugueton == 4 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="jugueton"
                        className="mask mask-star-2 bg-orange-400"
                        value={5}
                        checked={jugueton == 5 ? true : false}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mb-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Sociable</label>
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        name="sociable"
                        className="mask mask-star-2 bg-orange-400"
                        value={1}
                        checked={sociable == 1 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="sociable"
                        className="mask mask-star-2 bg-orange-400"
                        value={2}
                        checked={sociable == 2 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="sociable"
                        className="mask mask-star-2 bg-orange-400"
                        value={3}
                        checked={sociable == 3 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="sociable"
                        className="mask mask-star-2 bg-orange-400"
                        value={4}
                        checked={sociable == 4 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="sociable"
                        className="mask mask-star-2 bg-orange-400"
                        value={5}
                        checked={sociable == 5 ? true : false}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-2">
                    <label htmlFor="">Miedoso</label>
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        name="miedoso"
                        className="mask mask-star-2 bg-orange-400"
                        value={1}
                        checked={miedoso == 1 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="miedoso"
                        className="mask mask-star-2 bg-orange-400"
                        value={2}
                        checked={miedoso == 2 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="miedoso"
                        className="mask mask-star-2 bg-orange-400"
                        value={3}
                        checked={miedoso == 3 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="miedoso"
                        className="mask mask-star-2 bg-orange-400"
                        value={4}
                        checked={miedoso == 4 ? true : false}
                        onChange={onInputChange}
                      />
                      <input
                        type="radio"
                        name="miedoso"
                        className="mask mask-star-2 bg-orange-400"
                        value={5}
                        checked={miedoso == 5 ? true : false}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="nombre" className="font-bold mb-2">
                  Comida Favorita
                </label>

                <div className="flex">
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-3/4 input-sm "
                    name="comida"
                    value={comida}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col">
                <label htmlFor="">Fotografía</label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                  onChange={(e) => setfile(e.target.files[0])}
                />
              </div>
            </div>

            {/* der */}

            <div className="w-1/2 p-2">
              <div className="flex flex-col ">
                <label htmlFor="">Género</label>
                <select
                  value={generoSeleccionado}
                  defaultValue={""}
                  className="select select-bordered w-full max-w-xs "
                  onChange={(e) => setgeneroSeleccionado(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione el género
                  </option>
                  <option value="M">Macho</option>
                  <option value="H">Hembra</option>
                </select>
              </div>

              <div className="flex gap-1 mt-2">
                <div className="flex flex-col">
                  <label htmlFor="">Años</label>
                  <input
                    type="number"
                    placeholder=""
                    className="input input-bordered w-3/4 input-md "
                    name="anios"
                    value={anios}
                    onChange={onInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="">Meses</label>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    defaultValue={""}
                    value={mesSeleccionado}
                    onChange={(e) => setmesSeleccionado(e.target.value)}
                  >
                    <option value="" disabled>
                      Meses
                    </option>
                    <option value="0.1">1</option>
                    <option value="0.2">2</option>
                    <option value="0.3">3</option>
                    <option value="0.4">4</option>
                    <option value="0.5">5</option>
                    <option value="0.6">6</option>
                    <option value="0.7">7</option>
                    <option value="0.8">8</option>
                    <option value="0.9">9</option>
                    <option value="0.10">10</option>
                    <option value="0.11">11</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="descripcion" className="font-bold mb-2">
                  Descripción de Mascota
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  cols="10"
                  rows="5"
                  name="descripcion"
                  value={descripcion}
                  onChange={onInputChange}
                />
              </div>

              <div className="flex justify-end">
                <div className="border p-1 rounded-md mt-2 bg-bg-celeste">
                  <button
                    className="flex font-bold uppercase"
                    onClick={onContinueFormInfo}
                  >
                    Siguiente
                    <img
                      src="../src/assets/flecha.png"
                      alt=""
                      className="h-[20px] w-[20px] -rotate-90 mt-1 ml-2 b"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
