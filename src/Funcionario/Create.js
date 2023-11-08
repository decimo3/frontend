import React from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../Environment";
import { isValidName, isValidMatricula } from './Utils';
import Modal from "../Modal";
export default function Create()
{
  // variables and states declarations;
  const history = useNavigate();
  const [mat, setMat] = React.useState("");
  const [nom, setNom] = React.useState("");
  const [fun, setFun] = React.useState("");
  const [listaAvisos, setlistaAvisos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  // hight level functions declarations;
  const onCloseModal = () => {
    if(listaAvisos[0] == "Cadastrado efetivado!") history('/Funcionario');
    setlistaAvisos([]);
    setShowModal(false);
  }
  const updateLista = (msg) => {
    let newarr = listaAvisos;
    newarr.push(msg);
    setlistaAvisos(newarr);
  }
  async function newFuncionario(mat, nom, fun)
  {
    if(!isValidName(nom))
    {
      updateLista("O nome digitado não é válido!");
    }
    if(!isValidMatricula(mat))
    {
      updateLista("O número de matrícula inserida não é válida!");
    }
    if(listaAvisos.length > 0) {
      setShowModal(true);
      return;
    }
    const data = JSON.stringify({
      matricula: mat,
      nome_colaborador: nom,
      funcao: Number(fun)
    })
    const req = {
      method: "POST",
      body: data,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    const res = await fetch(`${baseURL}/Funcionario`, req)
    .then((r) => {
      if (r.status === 201) {
        updateLista("Cadastro efetivado!");
        setShowModal(true);
        return;
      }
      updateLista("Cadastro rejeitado!");
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
  return (
    <>
    {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
    <form className="card p-2 m-2">
      <div className="form-group my-2">
        <label>Matrícula Light:</label>
        <input className="form-control" type="number" value={mat} onChange={(e) => {setMat(e.target.value);}} required/>
      </div>
      <div className="form-group py-2">
        <label>Nome do colaborador:</label>
        <input type="text" className="form-control" value={nom} onChange={(e) => {setNom(e.target.value);}} required/>
      </div>
      <div className="form-group py-2">
        <label>Função do colaborador:</label>
        <select value={fun} className="form-control" onChange={(e) => {setFun(e.target.value);}}>
          <option value="0">Eletricista</option>
          <option value="1">Supervisor</option>
        </select>
      </div>
      <div className="form-group py-2">
        <input type="button" className="btn btn-primary btn-block" value="Enviar" onClick={() => {newFuncionario(mat, nom, fun);}}/>
        <input type="button" className="btn btn-white btn-block border" value="Voltar" onClick={() => {history('/Funcionario');}} />
      </div>
    </form>
    </>
  );
}