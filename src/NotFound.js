import React from "react";
export default function NotFound() {
  return (
    <main className="card p-2 m-2">
      <h1 className="text-danger">Não encontrado!</h1>
      <p>O link solicitado não foi encontrado!</p>
      <p>Verifique o caminho digitado ou entre em contato com o administrador do sistema.</p>
      <p><a target="_blank" href='https://api.whatsapp.com/send?phone=5521975429768'>WhatsApp MestreRuan</a></p>
    </main>
  );
}