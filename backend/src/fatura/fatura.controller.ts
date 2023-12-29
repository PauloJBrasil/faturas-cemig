import { Controller, Get, Query } from '@nestjs/common';
import { FaturaService } from './fatura.service';

@Controller('fatura')
export class FaturaController {
  constructor(private readonly faturaService: FaturaService) {}

  @Get('')
  getFaturas(@Query('numeroCliente') numeroCliente: string) {
    return this.faturaService.getFaturas(numeroCliente);
  }

  @Get('/clientes')
  getClientes() {
    return this.faturaService.getClientes();
  }
}
