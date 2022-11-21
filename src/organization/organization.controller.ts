import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Organization / Clinic')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiOperation({
    summary: "Create Organization",
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @ApiOperation({
    summary: 'View all Organization`s'
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @ApiOperation({
    summary: 'View Organization by id'
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edit Organization by id',
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @ApiOperation({
    summary: 'Delete Organization by id',
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }
}
