import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../Modal";
import Autenticacao from './Model';
import { Requisicao, errorMsg } from "../Requisicao";
export default function Autenticar() {
  const History = useNavigate();
  const [matricula, setMat] = React.useState('');
  const [palavra, setPwd] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [listaAvisos, setListaAviso] = React.useState([]);
  const onCloseModal = () => {
    if(listaAvisos[0] == "Autenticado com sucesso!") return History('/');
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
    let res = await Requisicao("/Autenticacao", "POST", body, null);
    switch(res.status) {
      case 200:
        let req = await Requisicao("/Autenticacao");
        if(req.status != 200) return null;
        let user = await req.json();
        let u = JSON.stringify(user);
        window.localStorage.setItem("user", u);
        setListaAviso(["Autenticado com sucesso!"]);
        break;
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
        <Link to="Recuperar">Recuperar acesso</Link>
      </div>
    </>
  );
}
