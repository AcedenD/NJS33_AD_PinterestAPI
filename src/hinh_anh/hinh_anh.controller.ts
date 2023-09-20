import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { HinhAnhService } from './hinh_anh.service';
import { CreateHinhAnhDto } from './dto/create-hinh_anh.dto';
import { UpdateHinhAnhDto } from './dto/update-hinh_anh.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/upload.dto';

@ApiTags("HinhAnh")
@Controller('hinh-anh')
export class HinhAnhController {
  constructor(private readonly hinhAnhService: HinhAnhService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FileUploadDto})
  @Post('upload')
  @UseInterceptors(FileInterceptor('hinhAnh',{
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) => callback(null, new Date().getTime() + file.originalname)
    })
  }))
  uploadHinhAnh(@UploadedFile() file, @Query() createHinhAnhDto: CreateHinhAnhDto)   {  
    return this.hinhAnhService.uploadHinhAnh(file, createHinhAnhDto);
  }

  

  @Get("all")
  findAll() {
    return this.hinhAnhService.findAll();
  }

  @Get("/hinh-anh-id/:id")
  findOneByID(@Param('id') id: number) {
    return this.hinhAnhService.findOneByID(+id);
  }

  @Get('/hinh-anh-ten/:ten_hinh')
  findOneByTen(@Param('ten_hinh') ten_hinh: string) {
    return this.hinhAnhService.findOneByTen(ten_hinh);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hinhAnhService.remove(+id);
  }
}
