import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LuuAnhService } from './luu_anh.service';
import { CreateLuuAnhDto } from './dto/create-luu_anh.dto';
import { UpdateLuuAnhDto } from './dto/update-luu_anh.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("LuuAnh")
@Controller('luu-anh')
export class LuuAnhController {
  constructor(private readonly luuAnhService: LuuAnhService) {}

  @Post()
  create(@Body() createLuuAnhDto: CreateLuuAnhDto) {
    return this.luuAnhService.create(createLuuAnhDto);
  }

  @Get()
  findAll() {
    return this.luuAnhService.findAll();
  }

  @Get('/da-luu/:id')
  findOne(@Param('id') id: string) {
    return this.luuAnhService.findOne(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.luuAnhService.remove(+id);
  }
}
