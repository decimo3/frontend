import React from "react";
const baseURL = "http://localhost:5131";
export const errorMsg = [
  "Algum problema no servidor, tente novamente mais tarde!",
  "Se o problema persistir, contacte o administrador do sistema.",
  <a target="_blank" href='https://api.whatsapp.com/send?phone=5521975429768'>WhatsApp MestreRuan</a>
];
export default async function Requisicao(locate, verbo="GET", data=null, param=null) {
  let local = param ? `${locate}/${param}` : locate;
  let url = new URL(local, baseURL);
  const req = {
    method: verbo,
    body: data,
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  console.dir(req);
  try {
    let r = await fetch(url, req);
    return r;
  }
  catch {
    return { ok: false };
  }
}