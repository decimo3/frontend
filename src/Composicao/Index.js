import React from "react";
import { Route, Routes } from "react-router-dom";
import Read from "./Read";
export default function Composicao() {
  return (
    <Routes>
      <Route path="/" element={<Read/>}/>
    </Routes>
  );
}