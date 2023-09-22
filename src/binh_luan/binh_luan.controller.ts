import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BinhLuanService } from './binh_luan.service';
import { CreateBinhLuanDto } from './dto/create-binh_luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh_luan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { getDataFromToken } from 'src/util/helper';


@ApiTags("BinhLuan")
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/them-binh-luan-hinh")
  create(@Body() createBinhLuanDto: CreateBinhLuanDto, @Req() req:Request) {
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.binhLuanService.create(createBinhLuanDto, +user_id);   
  }


  @Get()
  findAll( ) {
    return this.binhLuanService.findAll();
  }

  @Get('/binh-luan-cua-hinh/:id')
  findBinhLuanForHinh(@Param('id') id: string) {
    return this.binhLuanService.findBinhLuanForHinh(+id);
  }

  

  
}
