"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(config, prisma) {
        console.log('start blah');
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
            username: 'email',
        });
        this.prisma = prisma;
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
        if (token) {
            console.log(token);
        }
        else {
            console.log('bon ben n importe nawak !');
        }
        console.log('\x1b[31m->jwt.strategy.ts', config.get('JWT_SECRET'), '\njwtFromRequest: ', passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(), '\x1b[0m');
    }
    print(secretOrKey) {
        console.log('\x1b[31m->jwt.strategy.ts print');
        console.log({ secretOrKey });
        console.log('\x1b[0m');
    }
    async validate(payload) {
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
        }
        else {
            throw new common_1.UnauthorizedException('jwt.strategy.ts -> user does not exist !');
        }
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map