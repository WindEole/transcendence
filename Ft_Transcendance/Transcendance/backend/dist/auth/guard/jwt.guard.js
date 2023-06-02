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
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
let JwtGuard = class JwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(config, jwtservice) {
        super({ secretOrKey: config.get('JWT_SECRET') });
        this.config = config;
        this.jwtservice = jwtservice;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log('\x1b[34m', token, '\x1b[0m');
        if (!token) {
            throw new common_1.UnauthorizedException('default no token given');
        }
        const secret = this.config.get('JWT_SECRET');
        console.log('\x1b[36msecret: ', secret, '\x1b[0m');
        try {
            const payload = await this.jwtservice.verifyAsync(token, {
                secret: this.config.get('JWT_SECRET'),
            });
            console.log('\x1b[31m', payload, '\x1b[0m');
            request['user'] = payload;
        }
        catch (error) {
            console.error('\x1b[36mErreur lors de la verif du jeton JWT: ', error, '\x1b[0m');
            throw new common_1.UnauthorizedException('jwt.guard.ts -> default on try payload');
        }
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const headers = request.headers;
        if ('authorization' in headers) {
            const authead = headers.authorization;
            console.log('\x1b[34m', authead, '\x1b[0m');
        }
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        console.log('\x1b[34m[', type, ']\n[', token, ']\x1b[0m');
        return type === 'Bearer' ? token : undefined;
    }
};
JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], JwtGuard);
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=jwt.guard.js.map