import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) return false;
    return this.validateToken(request.headers.authorization)
      .then((decoded: any) => {
        request.user = decoded.user;
        return true;
      })
      .catch((err) => {
        const message = 'Token error: ' + (err.message || err.name);
        throw new HttpException(message, HttpStatus.FORBIDDEN);
      });
  }

  private async validateToken(authToken: string) {    
    if (authToken.split('.').length !== 3) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    try {
      return await verify(authToken, process.env.JWT_SECRET);
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
