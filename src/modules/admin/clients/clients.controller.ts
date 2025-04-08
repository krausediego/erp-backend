import { ApiGlobalResponse } from '@common/decorators';
import {
  ApiPaginatedResponse,
  PaginationParams,
  PaginationRequest,
  PaginationResponseDto,
} from '@libs/pagination';
import { CurrentUser, Permissions, TOKEN_NAME } from '@modules/auth';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UserEntity } from '../access/users/user.entity';
import { ClientsService } from './clients.service';
import { ClientResponseDto, CreateClientRequestDto, UpdateClientRequestDto } from './dtos';

@ApiTags('Clients')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'clients',
  version: '1',
})
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @ApiOperation({ description: 'Get a paginated clients list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @ApiPaginatedResponse(ClientResponseDto)
  @Permissions('admin.access.clients.read')
  @Get()
  public getClients(
    @PaginationParams() pagination: PaginationRequest,
    @CurrentUser() user: UserEntity,
  ): Promise<PaginationResponseDto<ClientResponseDto>> {
    return this.clientService.getClients(pagination, user.organizations.id);
  }

  @ApiOperation({ description: 'Get client by id' })
  @ApiGlobalResponse(ClientResponseDto)
  @Permissions('admin.access.clients.read')
  @Get('/:id')
  public getClientById(@Param('id', ParseUUIDPipe) id: string): Promise<ClientResponseDto> {
    return this.clientService.getClientById(id);
  }

  @ApiOperation({ description: 'Create new client' })
  @ApiGlobalResponse(ClientResponseDto)
  @ApiConflictResponse({ description: 'Client already exists' })
  @Permissions('admin.access.clients.create')
  @Post()
  public createClient(
    @Body(ValidationPipe) clientDto: CreateClientRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<ClientResponseDto> {
    return this.clientService.createClient(clientDto, user.organizations.id);
  }

  @ApiOperation({ description: 'Update client by id' })
  @ApiGlobalResponse(ClientResponseDto)
  @ApiConflictResponse({ description: 'Client already exists' })
  @Permissions('admin.access.clients.update')
  @Put('/:id')
  public updateClient(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) clientDto: UpdateClientRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<ClientResponseDto> {
    return this.clientService.updateClient(id, clientDto, user.organizations.id);
  }
}
