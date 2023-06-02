import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

// ----- tuto with Authguard

// @Injectable()
// export class JwtGuard extends AuthGuard('jwt') {
//   constructor() {
//     super();
//   }
// }

// ----- with CanActivate Augustin

// @Injectable()
// export class JwtGuard
//   extends AuthGuard('jwt')
//   implements CanActivate
// {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
// 	console.log(context.getArgByIndex(1));
//     return super.canActivate(context);
//   }

// //   handleRequest(user) {
// //     //<TUser = any>(
// //     // err: any,
// //     // user: any,
// //     // info: any,
// //     // context: ExecutionContext,
// //     // status?: any,
// //     //   ): TUser {
// //     // if (err || !user) {
// //     // throw err || new UnauthorizedException();
// //     if (!user) {
// //       throw new UnauthorizedException();
// //     }
// //     return user;
// //   }
// }

// ----- with CanActivate NestJS Docs !

@Injectable()
export class JwtGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  constructor(
    private config: ConfigService,
    private jwtservice: JwtService,
  ) {
    super({ secretOrKey: config.get('JWT_SECRET') });
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log('\x1b[34m', token, '\x1b[0m');

    if (!token) {
      throw new UnauthorizedException('default no token given');
    }

    const secret = this.config.get('JWT_SECRET');
    console.log('\x1b[36msecret: ', secret, '\x1b[0m');

    try {
      const payload = await this.jwtservice.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      console.log('\x1b[31m', payload, '\x1b[0m');
      request['user'] = payload;
    } catch (error) {
      console.error('\x1b[36mErreur lors de la verif du jeton JWT: ', error, '\x1b[0m');
      throw new UnauthorizedException(
        'jwt.guard.ts -> default on try payload',
      );
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): any {
    // DONC !!!! Le problème venait de ce Request, il fallait importer la version d'express !!
    const headers = request.headers; //chatGPT
    if ('authorization' in headers) {
      const authead = headers.authorization;
      console.log('\x1b[34m', authead, '\x1b[0m');
    } // end chatGPT

    const [type, token] =
      request.headers.authorization?.split(' ') ?? [];
    console.log('\x1b[34m[', type, ']\n[', token, ']\x1b[0m');
    return type === 'Bearer' ? token : undefined;
  }
}
