import { Module } from '@nestjs/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { FaturaModule } from './fatura/fatura.module';

@Module({
  imports: [DashboardModule, FaturaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
