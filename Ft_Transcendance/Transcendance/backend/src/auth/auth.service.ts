import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        //   select: { // 1ère méthode pour cacher le hash -> fastidieux
        //     id: true,
        //     email: true,
        //     createdAt: true,
        //   },
      });
      console.log({
        dto,
        user,
      });
      //   delete user.hash; // 2ème méthode pour cacher le hash -> sale ! JWT -> plus besoin
      // return the saved user
      //   return user; // JWT : ce n'est plus un user que l'on veut retourner mais un token
      //   console.log(
      //     '\x1b[31m[',
      //     this.signToken(user.id, user.email),
      //     ']\x1b[0m',
      //   );
      return this.signToken(user.id, user.email);
      // } catch (error) {
      //   if (error instanceof PrismaClientKnownRequestError) {
    } catch (error: any) {
      if (
        error.constructor.name ===
        PrismaClientKnownRequestError.name
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException('Credentials incorrect');
    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exeption
    if (!pwMatches)
      throw new ForbiddenException('Credentials incorrect');
    // send back the user
    // delete user.hash; // pour éviter que le mdp soit affiché JWT -> plus besoin de delete
    // return user; // NON, grâce à JWT, on ne retourne plus le user, seulement le token !
    return this.signToken(user.id, user.email);
    // return {
    //   msg: 'Ben alors ? I am signing in ! Youpi ! Object version... Service',
    // };
  }

  async signToken(
    // pas besoin d'async puisqu'on spécifie une Promise !
    userID: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userID,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    // return this.jwt.signAsync(payload, {
    //   expiresIn: '15m', // le client pourra se connecter pendant 15 minutes, après il faut renouveler le token
    //   secret: 'secret',
    // }); --> avec ça on retourne un string, nous on veut retourner un objet !
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '600m', //'15m',
      secret: 'secret',
    });

    return {
      access_token: token,
    };
  }
}
