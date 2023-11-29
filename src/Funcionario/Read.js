import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { funcoes } from "./Model";
import { Requisicao, errorMsg } from "../Requisicao";
import Modal from "../Modal";
export default function Read()
{
  const History = useNavigate();
  const [func, setFunc] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const onCloseModal = () => {
    History('/');
  }
  React.useEffect(() => {
    async function getFuncionarios()
    {
      let funcionarios = await Requisicao("Funcionario");
      if(!funcionarios.ok) {
        setShowModal(true);
      }
      else {
        setFunc(await funcionarios.json());
      }
    }
    getFuncionarios();
  }, []);
  if (func.length === 0) {
    return (
      <div className="text-center">
        {showModal && <Modal listaAvisos={errorMsg} onClose={onCloseModal}/>}
        Carregando...
      </div>
    );
  }
  return (
    <main className="card m-2 p-2">
      <Link to='Create'>Criar novo funcionário</Link>
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
            <td>{funcoes[f.funcao]}</td>
            <td>
            <Link to="Edit" state={f}>Editar</Link>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </main>
  );
}