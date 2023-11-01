import React from "react";
import { useNavigate } from "react-router-dom";

export const Volver = () => {
  const navigate = useNavigate();

  return (
    <div className="w-1/6 mb-5 cursor-pointer" onClick={()=>navigate(-1)}>
      <div className="border p-1 rounded-md mt-2 bg-orange-400  flex justify-center gap-2 items-center">
        <img
          src="/src/assets/volver.png"
          alt=""
          className="h-[32px] w-[32px]"
        />
        <span className="uppercase text-white">Volver</span>
      </div>
    </div>
  );
};
