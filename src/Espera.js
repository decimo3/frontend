import React from "react";
export default function Espera()
{
  return (
    <div className="modal-backdrop">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}