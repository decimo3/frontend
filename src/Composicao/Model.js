export const atividade = ["CORTE" , "RELIGA", "AVANÇADO", "CAMINHÃO", "EMERGÊNCIA"];
export const regional = ["BAIXADA", "OESTE"];
export default class Composicao {
  constructor(dia, adesivo, placa, recurso, ativ, ele1, mat1, ele2, mat2, tel, mat3, sup, reg) {
    this.dia = dia;
    this.adesivo = Number(adesivo);
    this.placa = placa;
    this.recurso = recurso;
    this.atividade = Number(ativ);
    this.motorista = ele1;
    this.id_motorista = Number(mat1);
    this.ajudante = ele2;
    this.id_ajudante = Number(mat2);
    this.telefone = Number(tel);
    this.id_supervisor = Number(mat3);
    this.supervisor = sup;
    this.regional = Number(reg);
    this.errors = [];
  }
  isValidAdesivo() {
    return (RegExp(/^[0-9]{5}$/).test(this.adesivo));
  }
  isValidPlaca() {
    return (RegExp(/^[A-z0-9]{3}-[A-z0-9]{4}$/).test(this.placa));
  }
  isValidMatricula(arg) {
    return (RegExp(/^[0-9]{7}$/).test(arg));
  }
  isValidTelefone() {
    return (RegExp(/^[0-9]{11}$/).test(this.telefone));
  }
  isValidRecurso() {
    return (RegExp(/^([A-Z]{4,})(?: - [A-z]{3,})?( [-|–] Equipe )([0-9]{3})$/).test(this.recurso));
  }
  isValidComposicao() {
    if(!isNaN(new Date(this.dia).getTime))
      this.errors.push("A data não pode ser reconhecida!");
    if (!this.isValidRecurso())
      this.errors.push("O recurso digitado não é válido!");
    if (this.atividade > atividade.length)
      this.errors.push("A atividade selecionada é inválida!");
    if (this.regional > regional.length)
      this.errors.push("A regional selecionada é inválida!")
    if (!this.isValidAdesivo())
      this.errors.push("O adesivo inserido não é válido!");
    if (!this.isValidPlaca())
      this.errors.push("A placa inserida não é válida!");
    if (!this.isValidTelefone())
      this.errors.push("O telefone informado não é válido");
    if (!this.isValidMatricula(this.id_motorista))
      this.errors.push("A matrícula do motorista não é válida!");
    if (!this.isValidMatricula(this.id_ajudante))
      this.errors.push("A matrícula do ajudante não é válida!");
    if (!this.isValidMatricula(this.id_supervisor))
      this.errors.push("A matrícula do supervisor não é válida!");
    if (this.id_motorista == this.id_ajudante)
      this.errors.push("A matrícula do motorista e ajudante não podem ser iguais!");
    return (this.errors.length === 0);
  }
}