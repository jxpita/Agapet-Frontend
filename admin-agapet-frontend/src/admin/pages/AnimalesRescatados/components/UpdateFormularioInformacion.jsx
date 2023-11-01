import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { animalAPI } from "../../../../api/animalAPI";

export const UpdateFormularioInformacion = () => {
  const { id } = useParams();

  const loadInfoAnimal = async () => {
    const resp = await animalAPI.get(`/detailmascota/${id}`);
    console.log(resp.data);
  };

  useEffect(() => {
    loadInfoAnimal();
  }, []);

  return <div>UpdateFormularioInformacion {id}</div>;
};
