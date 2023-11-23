import React from "react";
const baseURL = "http://localhost:5131";
export const errorMsg = [
  "Algum problema no servidor, tente novamente mais tarde!",
  "Se o problema persistir, contacte o administrador do sistema.",
  <a target="_blank" href='https://api.whatsapp.com/send?phone=5521975429768'>WhatsApp MestreRuan</a>
];
export default async function Requisicao(locate, verbo="GET", data=null, param=null) {
  let url = new URL(locate, baseURL);
  let body = data ? JSON.stringify(data) : null;
  if(param) { url.searchParams.append("id", param) }
  const req = {
    method: verbo,
    body: body,
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  try {
    let r = await fetch(url, req);
    return r;
  }
  catch {
    return { ok: false };
  }
}