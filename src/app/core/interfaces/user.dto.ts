export type Permissions =
  | 'USER'
  | 'MANAGER'
  | 'SUPER';

export type Functions =
  | 'CREATE'
  | 'DELETE'
  | 'UPDATE'
  | 'SELECT'

 
export type LoginDto = {
  email: string;
  password: string;
};

export const defaultLoginDto: LoginDto = {
  email: "",
  password: "",
};

export interface UserData {
    id?:number,
    username?:string,
    name?:string,
    email?:string,
   // token?:string,
    role?:Role
}

export interface UserDataAdmin {
    id?: number; 
    email?:string;    
    role?: Role;
}

export interface Role{
    id?:number;
    name?: Permissions,
    functionalities?: Functionalities[]
}

export interface Functionalities{
    id?:number;
    name?:Functions
}

// NULL---

export const NULL_FUNCTIONALITIES: Functionalities = {
  id:  0,
  name:'CREATE'
}

export const NULL_ROLE: Role = {
  id:0,
  name: 'USER',
  functionalities: [NULL_FUNCTIONALITIES]
}

export const NULL_ROLE_ADMIN: Role = {
  id:0,
  name: 'SUPER',
  functionalities: [NULL_FUNCTIONALITIES]
}

export const NULL_USERDATA_ADMIN: UserDataAdmin =  {
  id: 0, 
  email:'',
  role: NULL_ROLE_ADMIN
}

export const NULL_USERDATA: UserData =  { 
  id:0,
  username:'',
  name:'',
  email:'',
 // token:'',
  role:NULL_ROLE
}