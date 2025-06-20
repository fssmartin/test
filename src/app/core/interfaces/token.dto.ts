import { UserData } from "./user.dto";

// Respuesta del backend con el token JWT tras hacer login exitoso
export interface Token {
  token: string;
}

// Token JWT decodificado para acceder a sus datos
export interface LoginResponse {
  user: UserData;
  token: Token;
}