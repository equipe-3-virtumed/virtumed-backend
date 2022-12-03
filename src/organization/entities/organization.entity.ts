export class Organization {
  id?: string;
  name: string;
  email: string;
  cnpj: string;
  password: string;
  confirmpassword?: string; 
  image: string;

  role?: string;
  createAt?: Date;
  updateAt?: Date;
}
