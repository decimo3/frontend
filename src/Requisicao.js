import React from "react";
export const baseURL = "http://localhost:5131";
export const errorMsg = [
  "Algum problema no servidor, tente novamente mais tarde!",
  "Se o problema persistir, contacte o administrador do sistema.",
  <a target="_blank" href='https://api.whatsapp.com/send?phone=5521975429768'>WhatsApp MestreRuan</a>
];
export async function Requisicao(locate, verbo="GET", data=null, param=null) {
  let local = param ? `${locate}/${param}` : locate;
  let url = new URL(local, baseURL);
  const req = {
    method: verbo,
    body: data,
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
export async function Carregar(locate, file) {
  let url = new URL(locate, baseURL);
  const formData = new FormData();
  formData.append('file', file);
  const req = {
    method: 'POST',
    body: formData,
  }
  try {
    let r = await fetch(url, req);
    return r;
  }
  catch {
    return { ok: false };
  }
}