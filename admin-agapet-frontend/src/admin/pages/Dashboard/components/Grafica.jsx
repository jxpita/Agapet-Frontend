import React, { useEffect } from "react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { userAPI } from "../../../../api/userAPI";
export const Grafica = () => {

  const [listAdoptantesMes, setlistAdoptantesMes] = useState([]);


  const loadAdoptantes= async ()=>{
    const resp=await userAPI.get("numeroadoptantes");
    setlistAdoptantesMes(resp.data);

  }

  useEffect(() => {
    loadAdoptantes();
  }, [])
  

  const data = [
    { name: "Agosto", adoptantes: 78 },
    { name: "Septiembre", adoptantes: 78 },
    { name: "Octubre", adoptantes: 78 },
    { name: "Nov", adoptantes: 78 },
    { name: "Diciembre", adoptantes: 10 },
  ];
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        data={listAdoptantesMes}
        width={500}
        height={500}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="adoptantes" fill="#45C3D2" />
      </BarChart>
    </ResponsiveContainer>
  );
};
