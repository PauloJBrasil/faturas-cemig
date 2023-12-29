import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('')
  getAll(@Query('numeroCliente') numeroCliente: string) {
    return this.dashboardService.getAll(numeroCliente);
  }
}
