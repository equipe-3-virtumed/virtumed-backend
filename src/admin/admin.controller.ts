import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({
    summary: "Create Admin",
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({
    summary: 'View all Admmin'
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({
    summary: 'View Admin by id'
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edit Admin by id',
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({
    summary: 'Delete Admin by id',
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(id);
  }
}
