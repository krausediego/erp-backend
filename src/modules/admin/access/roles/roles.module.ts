import { TypeOrmExModule } from '@database/typeorm-ex.module';
import { Module } from '@nestjs/common';

import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RolesRepository])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
