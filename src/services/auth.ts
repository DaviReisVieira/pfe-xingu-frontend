import jwt_decode from "jwt-decode";

export async function recoverUserInformation(accessToken: string) {
  var decoded: AccessTokenProps = jwt_decode(accessToken);
  const { cpf,first_name,last_name,role } = decoded;
  return {
    user: {
      cpf,
      first_name,
      last_name,
      role,
    },
  };
}