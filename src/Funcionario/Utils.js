export const funcoes = ["Eletricista", "Supervisor"];
export function isValidMatricula(mat)
{
  return (RegExp(/[0-9]{7}/).test(mat)) ? "d-none" : "invalid-feedback";
}
export function isValidName(nom)
{
  return (RegExp(/[A-Z ]{4,60}/).test(nom)) ? "d-none" : "invalid-feedback";
}