import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
          //   url: 'postgresql://test:test@postgresql:5432/pong?schema=public', // attention, ici on met les info en dur, car il n'a pas accés au .env global ! tuto usage des variables d'env dans NestJS !!
        },
      },
    });
    console.log(config.get('DATABASE_URL'));
  }
}
