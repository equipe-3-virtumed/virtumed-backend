export class Doctor {
  id?: string;
  name: string;
  crm: string;
  phone: string;
  email: string;
  password: string;
  confirmpassword?: string;
  image: string;

  role?: string;
  createAt?: Date;
  updateAt?: Date;
}
