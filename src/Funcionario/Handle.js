import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { baseURL } from "../Environment";
import { isValidName, isValidMatricula } from './Model';
export default function Handle()
{
  // variables and states declarations;
  const History = useNavigate();
  const { state } = useLocation();
  const [stateMat, setMat] = React.useState(state ? state.matricula : 0);
  const [stateNom, setNom] = React.useState(state ? state.nome_colaborador : "");
  const [stateFun, setFun] = React.useState(state ? state.funcao : 0);
  const [confir, setConfir] = React.useState(false);
  const [listaAvisos, setlistaAvisos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
    // hight level functions declarations;
  const onCloseModal = () => {
    if(listaAvisos[0] == "Funcionário não encontrado!") History('/Funcionario');
    if(listaAvisos[0] == "Funcionário excluído!") History('/Funcionario');
    if(listaAvisos[0] == "Cadastrado efetivado!") History('/Funcionario');
    setlistaAvisos([]);
    setShowModal(false);
  }
  const updateLista = (msg) => {
    let newarr = listaAvisos;
    newarr.push(msg);
    setlistaAvisos(newarr);
  }
  const editFuncionario = async () => {
    if(!isValidName(stateNom))
    {
      updateLista("O nome digitado não é válido!");
    }
    if(!isValidMatricula(stateMat))
    {
      updateLista("O número de matrícula inserida não é válida!");
    }
    if(listaAvisos.length > 0) {
      setShowModal(true);
      return;
    }
    const data = JSON.stringify({
      matricula: stateMat,
      nome_colaborador: stateNom,
      funcao: Number(stateFun)
    })
    const req = {
      method: "PUT",
      body: data,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    const res = await fetch(`${baseURL}/Funcionario/${state.matricula}`, req)
    .then((r) => {
      if (r.status === 204) {
        updateLista("Funcionário atualizado!");
        setShowModal(true);
        return;
      }
      if(r.status === 404) {
        updateLista("Funcionário não encontrado!");
        updateLista(r.text);
        setShowModal(true);
        return;
      }
      updateLista("Algo de errado aconteceu. Tente novamente ou verifique com o administrador!");
      updateLista(r.text);
      setShowModal(true);
      return;
    })
    .catch((r) => {
      updateLista("Algo de errado aconteceu. Tente novamente ou verifique com o administrador!");
      updateLista(r);
      setShowModal(true);
      return;
    });
  }
  const delFuncionario = async () => {
    if(!confir) {
      updateLista("Deseja realmente excluir esse funcionario?");
      updateLista("Clique novamente no botão 'Excluir' para confirmar!");
      setShowModal(true);
      setConfir(true);
      return;
    }
    return await fetch(`${baseURL}/Funcionario/${stateMat}`, {method: "DELETE"})
      .then((r) => {
        if (r.status === 204) {
          updateLista("Funcionário excluído!");
          setShowModal(true);
          return;
        }
        if(r.status === 404) {
          updateLista("Funcionaário não encontrado!");
          updateLista(r.text);
          setShowModal(true);
          return;
        }
        updateLista("Algo de errado aconteceu. Tente novamente ou verifique com o administrador!");
        updateLista(r);
        setShowModal(true);
        return;
      })
      .catch((r) => {
        updateLista("Algo de errado aconteceu. Tente novamente ou verifique com o administrador!");
        updateLista(r);
        setShowModal(true);
        return;
      });
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <form className="form-control">
        <div className="form-group my-2">
          <label>Matrícula Light:</label>
          <input className="form-control" type="number" value={stateMat} onChange={(e) => {setMat(e.target.value);}} required/>
        </div>
        <div className="form-group py-2">
          <label>Nome do colaborador:</label>
          <input type="text" className="form-control" value={stateNom} onChange={(e) => {setNom(e.target.value);}} required/>
        </div>
        <div className="form-group py-2">
          <label>Função do colaborador:</label>
          <select value={stateFun} className="form-control" onChange={(e) => {setFun(e.target.value);}}>
            <option value="0">Eletricista</option>
            <option value="1">Supervisor</option>
          </select>
        </div>
        <div className="form-group py-2">
          <input type="button" className="btn btn-primary btn-block" value="Enviar" onClick={editFuncionario}/>
          <input type="button" className="btn btn-secondary btn-block" value="Voltar" onClick={() => {History('/Funcionario')}}/>
          <input type="button" className="btn btn-danger btn-block" value="Excluir" onClick={delFuncionario}/>
        </div>
      </form>
    </>
  );
}