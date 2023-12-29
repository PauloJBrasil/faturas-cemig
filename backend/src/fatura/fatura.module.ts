import { Module } from '@nestjs/common';
import { FaturaController } from './fatura.controller';
import { FaturaService } from './fatura.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [FaturaController],
  providers: [FaturaService, PrismaService],
})
export class FaturaModule {}
