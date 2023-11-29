import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { Carregar, errorMsg } from "../Requisicao";
export default function Send() {
  const [file, setFile] = React.useState();
  const History = useNavigate();
  const [listaAvisos, setlistaAvisos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const onCloseModal = () => {
    setlistaAvisos([]);
    setFile();
    setShowModal(false);
  }
  const requestFile = async () => {
    if(!file) {
      setlistaAvisos(["Necessário escolher algum arquivo válido!"]);
      setShowModal(true);
      return;
    }
    const res = await Carregar("Composicao", file);
    if(res.status == undefined) setlistaAvisos(errorMsg);
    else if (res.status == 422) {
      let erros = await res.json();
      History('../Result', {state: erros});
    }
    else setlistaAvisos([await res.text()]);
    setShowModal(true);
  }
  return (
    <>
    {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
    <form className="card p-2 m-2">
      <div className="form-group">
        <label className="my-2">Selecione o arquivo para enviar:</label>
        <input className="form-control my-2" type="file" required accept=".xlsx" onChange={(e) => { setFile(e.target.files[0]); }}/>
      </div>
      <input className="btn btn-primary btn-block my-2" type="button" value="Enviar" onClick={requestFile}/>
    </form>
    </>
  );
}