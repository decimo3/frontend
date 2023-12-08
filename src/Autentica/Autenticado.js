import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal";
import { getCookie, setCookie } from "../_Shared/Cookie";
import { Requisicao, errorMsg } from "../Requisicao";
export default function Autenticado() {
  // TODO 1: deslogar (sair);
  // TODO 2: Trocar a senha;
  // TODO 3: Informações acerca;
  const History = useNavigate();
  const { state } = useLocation();
  const [psw1, setPwd1] = React.useState('');
  const [psw2, setPwd2] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [listaAvisos, setListaAviso] = React.useState([]);
  const onCloseModal = () => {
    if(listaAvisos[0] == "Usuário deslogado!") {
      History('/');
    }
    setShowModal(!showModal);
  }
  function alterarPalavra() {

  }
  function deslogarUsuario() {
    setCookie("MeuCookie", "", "");
    if (getCookie("MeuCookie")) {
      setListaAviso(["Usuário deslogado!"]);
    } else {
      setListaAviso(errorMsg);
    }
    setShowModal(!showModal);
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <main className="card w-50 start-50 translate-middle-x p-4 m-2">
        <h2 className="text-center">Informações gerais:</h2>
        <hr/>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Matrícula Light:</div>
          <div className="text-right">2258038</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Nome do colaborador:</div>
          <div className="text-right">Ruan Faustino Camello</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Data de admissão:</div>
          <div className="text-right">04/09/2023</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Situação:</div>
          <div className="text-right">Ativo</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Regional:</div>
          <div className="text-right">Campo Grande</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Função:</div>
          <div className="text-right">Administrativo</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Atividade:</div>
          <div className="text-right">Programador</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Supervisor:</div>
          <div className="text-right">Nayara</div>
        </div>
        <div className="input-group my-2">
          <label className="input-group-text">Trocar senha:</label>
          <input type="password" className="form-control" onChange={(e) => { setPwd1(e.target.value); }} />
          <input type="password" className="form-control" onChange={(e) => { setPwd2(e.target.value); }} />
          <input type="button" className="input-group-append btn btn-secondary" value="Trocar" onClick={ ()=>{ alterarPalavra(); }} />
        </div>
        <input type="button" className="btn btn-warning btn-block my-2" value="Sair" onClick={ ()=>{ deslogarUsuario(); }} />
      </main>
    </>
  );
}