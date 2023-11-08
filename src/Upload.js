import React from "react";
import Modal from "./Modal";
import { baseURL } from "./Environment";
export default function Upload()
{
  const [file, setFile] = React.useState();
  const [listaAvisos, setlistaAvisos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const filehandler = (e) => {
    setFile(e.target.files[0]);
  }
  const updateLista = (msg) => {
    let newarr = listaAvisos;
    newarr.push(msg);
    setlistaAvisos(newarr);
  }
  const onCloseModal = () => {
    setlistaAvisos([]);
    setFile();
    setShowModal(false);
  }
  const requestFile = async () => {
    if(!file) {
      updateLista("Necessário escolher algum arquivo válido!");
      setShowModal(true);
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    const req = {
      method: 'POST',
      body: formData,
    }
    return await fetch(`${baseURL}/Uploader`, req)
      .then((r) => {
        if (r.status === 201) {
          updateLista("Arquivo enviado com sucesso!");
          setShowModal(true);
          return;
        }
        updateLista("O arquivo foi rejeitado!");
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
      <div className="form-group">
        <label className="my-2">Selecione o arquivo para enviar:</label>
        <input className="form-control my-2" type="file" required accept=".xlsx, .csv" onChange={filehandler}/>
      </div>
      <input className="btn btn-primary btn-block my-2" type="button" value="Enviar" onClick={requestFile}/>
    </form>
    </>
  )
}