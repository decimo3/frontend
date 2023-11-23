import React from "react";
import { Route, Routes } from 'react-router-dom';
import Read from "./Read";
import Handle from "./Handle";
export default function Funcionario()
{
  return (
      <Routes>
        <Route path="/" element={<Read/>} />
        <Route path="/Edit" element={<Handle/>} />
        <Route path="/Create" element={<Handle/>} />
      </Routes>
  );
}