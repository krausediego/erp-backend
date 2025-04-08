import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationRequestDto {
  @ApiProperty({
    example: 'organization name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'fantasy name',
  })
  @IsString()
  @IsNotEmpty()
  tradingName: string;

  @ApiProperty({
    example: '99.999.999/9999-99',
  })
  @IsString()
  @MaxLength(18)
  document: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '(99) 99999-9999',
  })
  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  phone: string;
}
