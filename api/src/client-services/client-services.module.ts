import { Module } from '@nestjs/common';
import { ClientServicesService } from './client-services.service';
import { ClientServicesController } from './client-services.controller';

@Module({
  providers: [ClientServicesService],
  controllers: [ClientServicesController]
})
export class ClientServicesModule {}
