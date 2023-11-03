import React from "react";
import { baseURL } from "../Environment";
import { Link } from "react-router-dom";
export default function ReadFuncionario()
{
  const [func, setFunc] = React.useState([]);
  React.useEffect(() => {
    async function getFuncionarios()
    {
      const data = await fetch(`${baseURL}/Funcionario`);
      const funcionarios = await data.json();
      setFunc(funcionarios);
    }
    getFuncionarios();
  }, []);
  if (func.length === 0) {
    return (
      <div className="text-center">
        Carregando...
      </div>
    );
  }
  return (
    <main className="card m-2 p-2">
      <Link to='/CreateFuncionario'>Criar novo funcionário</Link>
      <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Matrícula:</th>
          <th scope="col">Nome:</th>
          <th scope="col">Função:</th>
          <th scope="col">Opções:</th>
        </tr>
      </thead>
      <tbody>
        {func.map((f) => (
          <tr scope="row" key={f.matricula}>
            <td>{f.matricula}</td>
            <td>{f.nome_colaborador}</td>
            <td>{f.funcao}</td>
            <td>
            <Link to="/EditFuncionario/${f.matricula}">Editar</Link>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </main>
  );
}