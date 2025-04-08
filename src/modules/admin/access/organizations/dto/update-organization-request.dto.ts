import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { CreateOrganizationRequestDto } from '.';

export class UpdateOrganizationRequestDto extends CreateOrganizationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
