import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(baseUrl: string) {
    return {
      status: 'Virtumed Server is running!🚀',
      docs: baseUrl + '/docs',
    };
    // 'Server is running! 🚀\n Please check http://localhost:3333/docs for Swagger docs...';
  }
}
