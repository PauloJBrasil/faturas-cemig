import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getAll(numeroCliente: string) {
    const result = await this.prisma.$queryRaw`
      SELECT
        f."numeroCliente" AS "numeroCliente",
        f."mesAnoReferencia" AS "mesAnoReferencia",
        SUM(f."energiaEletricaValor" + f."energiaSceeValor" + f."ilumPublica") AS "valorTotalSemGd",
        SUM(f."energiaCompensadaValor") AS "economiaGd",
        SUM(f."energiaEletricaQtd" + f."energiaSceeQtd") AS "consumoEnergiaEletrica",
        SUM(f."energiaCompensadaQtd") AS "consumoEnergiaCompensada"
      FROM
        "Fatura" f
      ${
        numeroCliente
          ? Prisma.sql`WHERE "numeroCliente" = ${Number(numeroCliente)}`
          : Prisma.empty
      }
      GROUP BY
        f."numeroCliente",
        f."mesAnoReferencia"
    `;

    return result;
  }
}
