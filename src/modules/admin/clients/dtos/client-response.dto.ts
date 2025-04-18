import { ApiProperty } from '@nestjs/swagger';

import { ClientStatus } from '../client-status.enum';

export class ClientResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  document?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty({ example: ClientStatus })
  status: ClientStatus;
}
