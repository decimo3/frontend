import { Requisicao } from "./Requisicao";
export default async function Servico() {
  let req = await Requisicao("/Autenticacao");
  if(req.status != 200) window.localStorage.removeItem("user");
  let user = await req.json();
  let u = JSON.stringify(user);
  window.localStorage.setItem("user", u);
}