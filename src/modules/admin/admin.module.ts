import { Module } from '@nestjs/common';

import { AccessModule } from './access/access.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [AccessModule, ClientsModule],
})
export class AdminModule {}
