import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt', // Attention, ici jwt est la valeur par défaut, mais on peut aussi mettre ce qu'on veut, il faudra juste changer le AuthGuard dans user.controller.ts
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    console.log('start blah');
    super({
      //   jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      //   ignoreExpiration: false,
      username: 'email',
      //   passwordField: 'password',
    });
	const token = ExtractJwt.fromAuthHeaderAsBearerToken();
	if (token) {
		console.log(token);
	}
	else {
		console.log('bon ben n importe nawak !')
	}
    console.log(
      '\x1b[31m->jwt.strategy.ts',
      config.get('JWT_SECRET'),
      '\njwtFromRequest: ',
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      '\x1b[0m',
    );
  }

  print(secretOrKey: any) {
    console.log('\x1b[31m->jwt.strategy.ts print');
    console.log({ secretOrKey });
    console.log('\x1b[0m');
  }

  async validate(payload: { sub: number; username: string }) {
    console.log(payload);
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (user) {
      delete user.hash;
      console.log('\x1b[36m->jwt.strategy.ts', user, '\x1b[0m');
      return user;
    } else {
      throw new UnauthorizedException(
        'jwt.strategy.ts -> user does not exist !',
      );
    }
    // console.log({ payload });
    // return user;
  }
}
