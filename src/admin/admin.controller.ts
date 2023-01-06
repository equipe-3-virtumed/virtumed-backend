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
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";

@ApiTags("Admin")
@UseGuards(AuthGuard('Jwt'))
@ApiBearerAuth()
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({
    summary: "Create Admin",
  })
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    const register = await this.adminService.create(createAdminDto)
    return { ...register} ;
  }

  @ApiOperation({
    summary: 'View all Admin`s'
  })
  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @ApiOperation({
    summary: 'View Admin by id'
  })
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edit Admin by id',
  })
  @Patch(":id")  
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({
    summary: 'Delete Admin by id',
  })

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(id);
  }
}
