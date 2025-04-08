import { ApiGlobalResponse } from '@common/decorators';
import { Permissions, TOKEN_NAME } from '@modules/auth';
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
import { ApiBearerAuth, ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateOrganizationRequestDto,
  OrganizationResponseDto,
  UpdateOrganizationRequestDto,
} from './dto';
import { OrganizationsService } from './organizations.service';

@ApiTags('Organizations')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/organizations',
  version: '1',
})
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @ApiOperation({ description: 'Get organization by id' })
  @ApiGlobalResponse(OrganizationResponseDto)
  @Permissions('admin.access.organizations.read')
  @Get('/:id')
  public getOrganizationById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrganizationResponseDto> {
    return this.organizationsService.getOrganizationById(id);
  }

  @ApiOperation({ description: 'Create new organization' })
  @ApiGlobalResponse(OrganizationResponseDto)
  @ApiConflictResponse({ description: 'Organization already exists' })
  @ApiGlobalResponse(OrganizationResponseDto)
  @Permissions('admin.access.organizations.create')
  @Post()
  public createOrganization(
    @Body(ValidationPipe) OrganizationDto: CreateOrganizationRequestDto,
  ): Promise<OrganizationResponseDto> {
    return this.organizationsService.createOrganization(OrganizationDto);
  }

  @ApiOperation({ description: 'Update organization by id' })
  @ApiGlobalResponse(OrganizationResponseDto)
  @ApiConflictResponse({ description: 'Organization already exists' })
  @Permissions('admin.access.organizations.update')
  @Put('/:id')
  public updateOrganization(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) OrganizationDto: UpdateOrganizationRequestDto,
  ): Promise<OrganizationResponseDto> {
    return this.organizationsService.updateOrganization(id, OrganizationDto);
  }
}
