export const funcoes = ["Eletricista", "Supervisor"];
export function isValidMatricula(mat)
{
  return RegExp(/^[0-9]{7}$/).test(mat);
}
export function isValidName(nom)
{
  return RegExp(/^([A-z\s]){2,}([A-z]){1}$/).test(nom);
}