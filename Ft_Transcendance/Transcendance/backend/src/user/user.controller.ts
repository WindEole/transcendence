import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users') // users
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me') // on veut récupérer la requête : GET /users/me (si on laisse vide, @Get() -> récupère toutes les requêtes : GET /users)
  getMe(@Req() req: Request) {
    console.log({
      user: req.user,
    });
    return req.user;
    // return 'user info';
  }
}
