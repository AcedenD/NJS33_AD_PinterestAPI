import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LuuAnhService } from './luu_anh.service';
import { CreateLuuAnhDto } from './dto/create-luu_anh.dto';
import { UpdateLuuAnhDto } from './dto/update-luu_anh.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { getDataFromToken } from 'src/util/helper';

@ApiTags("LuuAnh")
@Controller('luu-anh')
export class LuuAnhController {
  constructor(private readonly luuAnhService: LuuAnhService) {}


  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/luu-anh")
  create(@Body() createLuuAnhDto: CreateLuuAnhDto, @Req() req:Request) {
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.luuAnhService.create(createLuuAnhDto, +user_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/anh-da-luu")
  findAll(@Req() req:Request) {
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.luuAnhService.findAll(+user_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/da-luu/:id')
  findOne(@Param('id') id: string, @Req() req:Request) {
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.luuAnhService.findOne(+id, +user_id);
  }

  

  
}
