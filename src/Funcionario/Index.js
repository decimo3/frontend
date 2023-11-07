import React from "react";
import { Route, Routes } from 'react-router-dom';
import Read from "./Read";
import Edit from "./Edit";
import Create from "./Create";
export default function Funcionario()
{
  return (
      <Routes>
        <Route path="/" element={<Read/>} />
        <Route path="/Edit" element={<Edit/>} />
        <Route path="/Create" element={<Create/>} />
      </Routes>
  );
}