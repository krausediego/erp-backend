import { TypeOrmExModule } from '@database/typeorm-ex.module';
import { Module } from '@nestjs/common';

import { OrganizationsController } from './organizations.controller';
import { OrganizationsRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([OrganizationsRepository])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
