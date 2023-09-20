import { Injectable } from '@nestjs/common';
import { CreateLuuAnhDto } from './dto/create-luu_anh.dto';
import { UpdateLuuAnhDto } from './dto/update-luu_anh.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LuuAnhService {
  constructor() {}

  model = new PrismaClient()

  create(createLuuAnhDto: CreateLuuAnhDto) {
    return 'This action adds a new luuAnh';
  }

  findAll() {
    return `This action returns all luuAnh`;
  }

  async findOne(id: number) {
    const da_luu = await this.model.luu_anh.findFirst({
      where: {
        hinh_id: id
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
