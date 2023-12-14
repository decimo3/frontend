import { Requisicao } from "./Requisicao";
import { setCookie } from "./_Shared/Cookie";
export default async function Servico() {
  let req = await Requisicao("/Autenticacao");
  if(req.status != 200) {
    window.localStorage.removeItem("user");
    setCookie("MeuCookie", "", "");
    return;
  }
  let user = await req.json();
  let u = JSON.stringify(user);
  window.localStorage.setItem("user", u);
}