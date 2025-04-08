import { TypeOrmExModule } from '@database/typeorm-ex.module';
import { Module } from '@nestjs/common';

import { PermissionsController } from './permissions.controller';
import { PermissionsRepository } from './permissions.repository';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PermissionsRepository])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
