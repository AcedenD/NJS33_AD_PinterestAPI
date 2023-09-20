import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { NguoiDungService } from './nguoi_dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi_dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi_dung.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("NguoiDung")
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  // @Post("/create-user")
  // create(@Body() createNguoiDungDto: CreateNguoiDungDto) {
  //   return this.nguoiDungService.create(createNguoiDungDto);
  //   // return createNguoiDungDto
  // }

  // @Post("/sign-in")
  // signIn(@Query("email") email: string, @Query("password") password: string) {
  //   return this.nguoiDungService.signIn(email, password);
  // }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll() {
    return this.nguoiDungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nguoiDungService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNguoiDungDto: UpdateNguoiDungDto) {
    return this.nguoiDungService.update(+id, updateNguoiDungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nguoiDungService.remove(+id);
  }

  @Get("/danh-sach-anh-luu/:id")
  danhSachAnhLuu(@Param("id") id: string) {
    return this.nguoiDungService.danhSachAnhLuu(+id);
  }

  @Get("/danh-sach-anh-tao/:id")
  danhSachAnhTao(@Param("id") id: string) {
    return this.nguoiDungService.danhSachAnhTao(+id);
  }
}
