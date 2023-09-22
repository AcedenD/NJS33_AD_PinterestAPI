import { Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/create-binh_luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh_luan.dto';
import { PrismaClient } from '@prisma/client';
import { returnMessage} from 'src/util/helper';

@Injectable()
export class BinhLuanService {
  constructor() {}

  model = new PrismaClient();

  async create(createBinhLuanDto: CreateBinhLuanDto, userId: number) {

    const hinh = await this.model.hinh_anh.findFirst({where: {hinh_id: createBinhLuanDto.hinh_id}});


    if(hinh) {
      const binhLuan = await this.model.binh_luan.create({
        data: {
          nguoi_dung_id: userId,
          noi_dung: createBinhLuanDto.noi_dung,
          hinh_id: createBinhLuanDto.hinh_id,
          ngay_binh_luan: new Date()
        }
      });

      return returnMessage("Thêm bình luận thành công", binhLuan) ;
    }else{
      return "Không tìm thấy hình ảnh này";
    }

  }

  async findAll() {
    return await this.model.binh_luan.findMany();
  }

  async findBinhLuanForHinh(id: number) {

    const hinh = await this.model.hinh_anh.findFirst({where: {hinh_id: id}});

    if(hinh){
      const binhLuan = await this.model.binh_luan.findMany({where: {hinh_id: id}});
    
      return binhLuan.length > 0 ? binhLuan : "Không tìm thấy bình luận cho hình ảnh này" ;
    }

    return "Không tìm thấy hình ảnh này";

    
  }

  update(id: number, updateBinhLuanDto: UpdateBinhLuanDto) {
    return `This action updates a #${id} binhLuan`;
  }

  remove(id: number) {
    return `This action removes a #${id} binhLuan`;
  }
}
