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
@ApiBearerAuth()
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(AuthGuard(['Admin']))
  @ApiOperation({
    summary: 'Create Organization - Only Admins can create an Organization',
  })
  @Post()
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const register = await this.organizationService.create(createOrganizationDto);
    return { ...register };
  }

  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'View all Organization`s - Global Auth',
  })
  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'View Organization by id - Global Auth',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(id);
  }

  @UseGuards(AuthGuard(['Admin', 'Organization']))
  @ApiOperation({
    summary: 'Edit Organization by id - Admin / Organization Auth',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

    @UseGuards(AuthGuard(['Admin', 'Organization']))
  @ApiOperation({
    summary: 'Delete Organization by id - Admin / Organization Auth',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }
}
