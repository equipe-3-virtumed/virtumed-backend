export class Patient {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  confirmpassword?: string; 
  image: string;

  role?: string;
  createAt?: Date;
  updateAt?: Date;
}
