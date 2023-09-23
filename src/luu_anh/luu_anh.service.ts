import { Injectable } from '@nestjs/common';
import { CreateLuuAnhDto } from './dto/create-luu_anh.dto';
import { UpdateLuuAnhDto } from './dto/update-luu_anh.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LuuAnhService {
  constructor() {}

  model = new PrismaClient()

  async create(createLuuAnhDto: CreateLuuAnhDto, user_id:number) {

    const hinh_anh = await this.model.hinh_anh.findFirst({
      where:{
        hinh_id: +createLuuAnhDto.hinh_id
      }
    })

    if(hinh_anh){
      const da_luu = await this.model.luu_anh.findMany({
        where: {
          hinh_id: +createLuuAnhDto.hinh_id,
          nguoi_dung_id: user_id
        }

      })

      if(da_luu.length > 0){
        return "User không được lưu cùng một hình"
      }else{
        const luu_anh = await this.model.luu_anh.create({
          data:{
            hinh_id: +createLuuAnhDto.hinh_id,
            nguoi_dung_id: user_id,
            ngay_luu: new Date()
          }
        })
    
        return 'User đã lưu ảnh thành công ';
      }
      

    }else{
      return "Hình ảnh không tồn tại"
    }
  }

  async findAll(user_id:number) {
    const da_luu = await this.model.luu_anh.findMany({
      where:{
        nguoi_dung_id:user_id
      }
    })

    return da_luu.length > 0 ? da_luu : "User chưa lưu ảnh nào hết";
  }

  async findOne(id: number, user_id: number) {

    const da_luu = await this.model.luu_anh.findFirst({
      where: {
        hinh_id: id,
        nguoi_dung_id: user_id
      }
    })
    

    return da_luu ? "Đã lưu" : "Chưa lưu";
  }

  update(id: number, updateLuuAnhDto: UpdateLuuAnhDto) {
    return `This action updates a #${id} luuAnh`;
  }

  remove(id: number) {
    return `This action removes a #${id} luuAnh`;
  }
}
