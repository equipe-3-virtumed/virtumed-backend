import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): string {
    return 'Server is running! 🚀\n Please check http://localhost:3333/docs for Swagger docs...';
  }
}
