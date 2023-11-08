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
              <h5 className="modal-title">Modal title</h5>
              <button className="close-btn" onClick={() => {closeModal();}}>&times;</button>
            </div>
            <hr/>
            <div className="modal-body">
              {listaAvisos.map((li, i) => (<p key={i} className="text-danger">{li}</p>))}
            </div>
            <hr/>
            <div className="modal-footer">
            <button className="close-btn" onClick={() => {closeModal();}}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}