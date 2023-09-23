import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UseGuards, Req } from '@nestjs/common';
import { HinhAnhService } from './hinh_anh.service';
import { CreateHinhAnhDto } from './dto/create-hinh_anh.dto';
import { UpdateHinhAnhDto } from './dto/update-hinh_anh.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/upload.dto';
import { AuthGuard } from '@nestjs/passport';
import { getDataFromToken } from 'src/util/helper';
import { Request } from 'express';

@ApiTags("HinhAnh")
@Controller('hinh-anh')
export class HinhAnhController {
  constructor(private readonly hinhAnhService: HinhAnhService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FileUploadDto})
  @Post('/them-hinh-anh')
  @UseInterceptors(FileInterceptor('hinhAnh',{
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) => callback(null, new Date().getTime() + file.originalname)
    })
  }))
  uploadHinhAnh(@UploadedFile() file, @Body() createHinhAnhDto: CreateHinhAnhDto, @Req() req:Request)   {  
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.hinhAnhService.uploadHinhAnh(file, createHinhAnhDto, +user_id);
  }

  

  @Get("all")
  findAll() {
    return this.hinhAnhService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/hinh-da-tao")
  findAllDaTao(@Req() req:Request) {
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.hinhAnhService.findAllDaTao(+user_id);
  }

  @Get("/thong-tinh-anh/:id")
  findOneByID(@Param('id') id: number) {
    return this.hinhAnhService.findOneByID(+id);
  }

  @Get('/hinh-anh-ten/:ten_hinh')
  findOneByTen(@Param('ten_hinh') ten_hinh: string) {
    return this.hinhAnhService.findOneByTen(ten_hinh);
  }

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  remove(@Param('id') id: string, @Req() req:Request) {
    const nguoi_dung = getDataFromToken(req)
    let user_id = nguoi_dung.nguoi_dung_id
    return this.hinhAnhService.remove(+id, +user_id);
  }
}
