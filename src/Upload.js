import React from "react";
export default function Upload()
{
  return (
    <form action="/Uploader" method="post" className="card p-2 m-2">
      <div className="form-group">
        <label className="my-2">Selecione o arquivo para enviar:</label>
        <input className="form-control my-2" type="file" required accept=".xlsx, .csv" />
      </div>
      <input className="btn btn-primary btn-block my-2" type="submit" value="Enviar" />
    </form>
  )
}