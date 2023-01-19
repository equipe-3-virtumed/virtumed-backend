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
    const register = await this.organizationService.create(
      createOrganizationDto,
    );
    return { ...register };
  }

  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'View all Organization`s - Global Auth',
  })
  @Get()
  async findAll(): Promise<Organization[]> {
    return await this.organizationService.findAll();
  }

  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'View Organization by id - Global Auth',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Organization> {
    return await this.organizationService.findOne(id);
  }

  @UseGuards(AuthGuard(['Admin', 'Organization']))
  @ApiOperation({
    summary: 'Edit Organization by id - Admin / Organization Auth',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return await this.organizationService.update(id, updateOrganizationDto);
  }

  @UseGuards(AuthGuard(['Admin', 'Organization']))
  @ApiOperation({
    summary: 'Delete Organization by id - Admin / Organization Auth',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.organizationService.remove(id);
  }
}
