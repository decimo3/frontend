import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Modal from "../Modal";
import { getCookie, setCookie } from "../_Shared/Cookie";
import { Requisicao, errorMsg } from "../Requisicao";
import { regional, atividade } from "../Composicao/Model";
export default function Autenticado() {
  // TODO 1: deslogar (sair);
  // TODO 2: Trocar a senha;
  // TODO 3: Informações acerca;
  const History = useNavigate();
  const { state } = useLocation();
  const [usr, setUsr] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [listaAvisos, setListaAviso] = React.useState([]);
  const onCloseModal = () => {
    if(listaAvisos[0] == "Usuário deslogado!") {
      History('/');
    }
    setShowModal(!showModal);
  }
  React.useEffect(() => {
    async function receberUsuario() {
      var res = await Requisicao('/Autenticacao');
      var c = await res.json();
      console.dir(c);
      setUsr(c);
    }
    receberUsuario();
  }, [])
  function deslogarUsuario() {
    setCookie("MeuCookie", "", "");
    if (getCookie("MeuCookie")) {
      setListaAviso(["Usuário deslogado!"]);
    } else {
      setListaAviso(errorMsg);
    }
    setShowModal(!showModal);
  }
  if (!usr) {
    return (
      <main className="text-center">
        Carregando...
      </main>
    );
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <main className="card w-50 start-50 translate-middle-x p-4 m-2">
        <h2 className="text-center">Informações gerais:</h2>
        <hr/>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Matrícula Light:</div>
          <div className="text-right">{usr.matricula}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Nome do colaborador:</div>
          <div className="text-right">{usr.nome_colaborador}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Data de admissão:</div>
          <div className="text-right">{usr.admissao}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Situação:</div>
          <div className="text-right">{usr.situacao}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Regional:</div>
          <div className="text-right">{regional[usr.regional]}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Função:</div>
          <div className="text-right">{usr.funcao}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Atividade:</div>
          <div className="text-right">{atividade[usr.atividade]}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="text-left">Supervisor:</div>
          <div className="text-right">{usr.id_supervisor}</div>
        </div>
        <Link to='TrocarSenha' state={usr}>Trocar a senha</Link>
        <input type="button" className="btn btn-warning btn-block my-2" value="Sair" onClick={ ()=>{ deslogarUsuario(); }} />
      </main>
    </>
  );
}