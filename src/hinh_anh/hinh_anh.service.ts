import { Injectable } from '@nestjs/common';
import { CreateHinhAnhDto } from './dto/create-hinh_anh.dto';
import { UpdateHinhAnhDto } from './dto/update-hinh_anh.dto';
import { PrismaClient, hinh_anh } from '@prisma/client';
import { returnMessage } from 'src/util/helper';

@Injectable()
export class HinhAnhService {
  constructor() {}

  model = new PrismaClient();
  create(createHinhAnhDto: CreateHinhAnhDto) {
    return createHinhAnhDto;
  }

  async uploadHinhAnh(file, createAuthDto: CreateHinhAnhDto, user_id) {
    const nguoi_dung = await this.model.nguoi_dung.findFirst({where: {nguoi_dung_id: user_id}});

    if(nguoi_dung){
      const hinhAnh = await this.model.hinh_anh.create({
        data: {
          ten_hinh: createAuthDto.ten_hinh,
          duong_dan: file.path,
          mo_ta: createAuthDto.mo_ta,
          nguoi_dung_id: user_id,
        },
      });
      return returnMessage("Thêm hình thành công",hinhAnh);
    }else {
      return "Bạn không có quyền thêm hình"
    }
  }

  findAll() {
    const hinhAnh = this.model.hinh_anh.findMany();
    return hinhAnh;
  }

  async findOneByTen(ten_hinh: string) {
    const hinhAnh = await this.model.hinh_anh.findMany({where: {ten_hinh: {contains: ten_hinh}}});

    return hinhAnh ? hinhAnh : "Không tìm thấy hình ảnh có tên bao gồm '" + ten_hinh + "'";
  }

  async findOneByID(id: number) {
    const hinhAnh = await this.model.hinh_anh.findFirst({where: {hinh_id: id}, include: {nguoi_dung: true}});
    return hinhAnh ? hinhAnh : "Không tìm thấy hình ảnh có id: " + id;
  }

  update(id: number, updateHinhAnhDto: UpdateHinhAnhDto) {
    return `This action updates a #${id} hinhAnh`;
  }

  async remove(id: number, user_id:number) {


    const hinhAnh = await this.model.hinh_anh.findFirst({where: {hinh_id: id, nguoi_dung_id:user_id}});

    if(hinhAnh) {
      const deleteLuuAnh = await this.model.luu_anh.deleteMany({where: {hinh_id: id}});

      const deleteBinhLuan = await this.model.binh_luan.deleteMany({where: {hinh_id: id}});

      const hinhAnh = await this.model.hinh_anh.delete({where: {hinh_id: id, nguoi_dung_id:user_id}});
      return returnMessage("Xóa thành công", hinhAnh) ;
    }
    return "Bạn không có quyền xoá hình này";
  }

  async findAllDaTao(user_id:number){
    const da_tao = await this.model.hinh_anh.findMany({
      where:{
        nguoi_dung_id: user_id
      }
    })

    return da_tao
  }
}
