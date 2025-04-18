import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClientRequestDto {
  @ApiProperty({
    example: 'jdoe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '(99) 99999-9999',
  })
  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    examples: ['999.999.999-99', '99.999.999/9999-99'],
  })
  @MaxLength(18)
  @IsString()
  document?: string;

  @ApiProperty({
    example: 'jdoe@provider.com',
  })
  @IsEmail()
  email?: string;
}
