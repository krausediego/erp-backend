import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { ClientStatus } from '../client-status.enum';
import { CreateClientRequestDto } from './create-client-request.dto';

export class UpdateClientRequestDto extends CreateClientRequestDto {
  @ApiProperty({ examples: ClientStatus })
  @IsNotEmpty()
  @IsEnum(ClientStatus)
  status: ClientStatus;
}
