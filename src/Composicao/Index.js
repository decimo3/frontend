import React from "react";
import { Route, Routes } from "react-router-dom";
import Read from "./Read";
import Edit from "./Edit";
export default function Composicao() {
  return (
    <Routes>
      <Route path="/" element={<Read/>}/>
      <Route path="/Edit" element={<Edit/>}/>
    </Routes>
  );
}