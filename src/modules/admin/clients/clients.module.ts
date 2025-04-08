import { TypeOrmExModule } from '@database/typeorm-ex.module';
import { Module } from '@nestjs/common';

import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './clients.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ClientsRepository])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
