import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, Put } from '@nestjs/common';
import { NguoiDungService } from './nguoi_dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi_dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi_dung.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { getDataFromToken } from 'src/util/helper';

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

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/nguoi-dung-info')
  findOne(@Req() req:Request) {
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.nguoiDungService.findOne(+user_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put()
  update(@Body() updateNguoiDungDto:UpdateNguoiDungDto, @Req() req:Request){
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.nguoiDungService.update(updateNguoiDungDto, +user_id )
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
