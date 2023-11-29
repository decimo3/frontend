import React from "react"
import { Link } from "react-router-dom";
export default function Header()
{
  return (
    <header>
      <h1 className="card text-center p-2 m-2">
        Sistema de atualização da produção
      </h1>
        <nav className="card text-center d-flex flex-row justify-content-around p-2 m-2">
          <Link to='/'>Inicio</Link>
          <Link to='/Funcionario'>Funcionários</Link>
          <Link to='/Composicao'>Composições</Link>
          <Link to='/Relatorio'>Relatórios</Link>
        </nav>
    </header>
  )
}