import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Organization } from './entities/organization.entity';

@ApiTags('Organization / Clinic')
@UseGuards(AuthGuard('organizationJwt'))
@ApiBearerAuth()
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiOperation({
    summary: 'Create Organization',
  })
  @Post()
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const register = this.organizationService.create(createOrganizationDto);
    return { ...register };
  }

  @ApiOperation({
    summary: 'View all Organization`s',
  })
  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @ApiOperation({
    summary: 'View Organization by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edit Organization by id',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @ApiOperation({
    summary: 'Delete Organization by id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }
}
