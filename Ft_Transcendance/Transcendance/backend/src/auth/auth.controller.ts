import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto'; // <- importe tout le contenu du dossier DTO, (grâce au barrel export index.ts) donc si besoin on peut créer d'autres classe ou interface pour les validations clients

@Controller('auth') // 'auth' = globla prefix route !
export class AuthController {
  constructor(private authService: AuthService) {}

  // [1]   @Post('signup') // ce décorateur sert à créer une route ! -> correspond à la requête POST/auht/signup
  //   signup(
  //     @Body('email') email: string,						|
  //     @Body('password', ParseIntPipe) password: string,	| -> verbeux ! on peut passer par AuthDto pour simplifier !
  //   ) {
  //     // ceci sera le end-point de signup
  //     console.log({
  //       // console.log permet de savoir, en direct, si notre appli compile ! -> lancer docker logs -f backend
  //       // dto, // <- raccourci pour dto: dto;
  //       email,
  //       typeOfemail: typeof email,
  //       password,
  //       typeOfPassword: typeof password,
  //     });
  //     return this.authService.signup(); // là on va chercher notre fonction dans le module service !
  //   }

  // [2]  @Post('signup')
  //   signup(@Body() dto: AuthDto) {
  //     console.log({
  //       dto,
  //     });
  //     return this.authService.signup();
  //   }

  @Post('register')
  register(@Body() dto: AuthDto) {
    // console.log({ dto });
    return this.authService.register(dto);
  }

  @Post('login') // -> correspond à la requête POST/auht/login
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
