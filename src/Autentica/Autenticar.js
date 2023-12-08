import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Autenticacao from './Model';
import { Requisicao, errorMsg } from "../Requisicao";
export default function Autentica() {
  const History = useNavigate();
  const [matricula, setMat] = React.useState('');
  const [palavra, setPwd] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [listaAvisos, setListaAviso] = React.useState([]);
  const onCloseModal = () => {
    if(listaAvisos[0] == "Autenticado com sucesso!") return History('/Autentica');
    setShowModal(!showModal)
  }
  const TryAutenticate = async () => {
    let data = new Autenticacao(matricula, palavra);
    if(!data.isValidAutenticacao()) {
      setListaAviso(['Verifique os campos e tente novamente!']);
      setShowModal(!showModal);
      return;
    }
    let body = JSON.stringify(data);
    let res = await Requisicao("/Autencicacao", "POST", body, null);
    switch(res.status) {
      case 200: setListaAviso(["Autenticado com sucesso!"]); break;
      case 401: setListaAviso(["Matrícula ou senha incorretos!"]); break;
      default: setListaAviso(errorMsg); break;
    }
    setShowModal(!showModal);
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <div className="card w-25 top-50 start-50 translate-middle-x p-2 m-2 my-4">
        <h2 className="text-center">Área de login</h2>
        <hr/>
        <label>Matrícula:</label>
        <input type="number" className="form-control my-2" value={matricula} onChange={(e) => { setMat(e.target.value) }} required/>
        <label>Senha:</label>
        <input type="password" className="form-control my-2" value={palavra} onChange={(e) => { setPwd(e.target.value) }} required/>
        <input type="button" className="btn btn-primary btn-block my-2" value="Logar" onClick={ () => { TryAutenticate() } }/>
      </div>
    </>
  );
}
