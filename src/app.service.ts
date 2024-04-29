import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return { status: 200, message: 'The service works in perfect condition' };
  }
}
