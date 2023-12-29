import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FaturaService {
  constructor(private prisma: PrismaService) {}

  getFaturas(numeroCliente: string) {
    return this.prisma.fatura.findMany({
      where: {
        ...(numeroCliente ? { numeroCliente: Number(numeroCliente) } : {}),
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  getClientes() {
    return this.prisma.fatura.findMany({
      distinct: ['numeroCliente'],
      select: {
        numeroCliente: true,
      },
      orderBy: {
        numeroCliente: 'asc',
      },
    });
  }
}
