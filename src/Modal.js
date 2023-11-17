import React from "react";
export default function Modal({ listaAvisos, onClose })
{
  const [showModal, setShowModal] = React.useState(true);
  const closeModal = () => {onClose(); setShowModal(false);}
  return showModal ? (
    <div className="modal-backdrop" onClick={() => {closeModal();}}>
      <div className="card position-absolute top-50 start-50 translate-middle">
        <div className="modal-dialog" onClick={() => {closeModal();}}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title px-4 pt-2">Aviso:</h5>
            </div>
            <hr/>
            <div className="modal-body px-4">
              {listaAvisos.map((li, i) => (<p key={i} className="text-danger">{li}</p>))}
            </div>
            <hr/>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-block p-2 m-2" onClick={() => {closeModal();}}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}