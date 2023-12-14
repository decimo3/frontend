import React from "react";
export default function Proibido() {
  return (
    <main className="card w-50 start-50 translate-middle-x">
      <h1 className="text-center text-danger">Não Autorizado!</h1>
      <hr/>
      <p>O seu acesso a esse link não está permitido!</p>
      <p>Verifique o caminho digitado ou entre em contato com o administrador do sistema.</p>
      <p className="text-center"><a target="_blank" href='https://api.whatsapp.com/send?phone=5521975429768'>WhatsApp MestreRuan</a></p>
    </main>
  );
}