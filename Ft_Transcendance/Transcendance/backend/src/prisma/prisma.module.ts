import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Ce décorateur permet à ce module d'etre utilisé par tous les autres modules !
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
