import { Injectable } from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi_dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi_dung.dto';
import { PrismaClient, nguoi_dung} from '@prisma/client';

@Injectable()
export class NguoiDungService {

  constructor() {}

  model = new PrismaClient()
  async create(createNguoiDungDto: CreateNguoiDungDto) {
    let {email} = createNguoiDungDto;

    try {
      let data = await this.model.nguoi_dung.findFirst({
        where: {
          email
        }
      })
      if(data) {
        return "Email đã tồn tại"
      }else{
        data = await this.model.nguoi_dung.create({
          data: {
            ...createNguoiDungDto
          }
        })
        return data;
      }
    } catch (error) {
      return error;
    }
  }

  async signIn(email: string, password: string) {
    let data = await this.model.nguoi_dung.findFirst({
      where: {
        email,
      }
    })
    if(data) {
      if(data.mat_khau == password) {
        return "Đăng nhập thành công";
      }
      return "Mật khẩu không đúng"
    }else{
      return "Email không tồn tại"
    }
  }
async findAll() {
    const data = await this.model.nguoi_dung.findMany()

    return data;
  }

  async findOne(id: number) {
    let nguoi_dung = await this.model.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: id
      }
    })
  
    return nguoi_dung;
  }

  async update( updateNguoiDungDto: UpdateNguoiDungDto, user_id:number) {
    const nguoi_dung = await this.model.nguoi_dung.findFirst({
      where:{
        email:updateNguoiDungDto.email
      }
    })
    if(nguoi_dung){
      return "Bạn không thể sử dụng email này"
    }else{
      const new_info = await this.model.nguoi_dung.update({
        where:{
          nguoi_dung_id: user_id
        },
        data:{
          email: updateNguoiDungDto.email,
          mat_khau: updateNguoiDungDto.mat_khau,
          ho_ten: updateNguoiDungDto.ho_ten,
          tuoi: updateNguoiDungDto.tuoi
        }
      })

      return "Update info thành công"
    }

    
  }

  remove(id: number) {
    return `This action removes a #${id} nguoiDung`;
  }

  async danhSachAnhTao(id: number) {
    const data = await this.model.hinh_anh.findMany({
      where: {
        nguoi_dung_id: id
      }
    });


    return data.length > 0 ? data : "Người dùng chưa tạo ảnh nào";
  }

  async danhSachAnhLuu(id: number) {
    const data = await this.model.luu_anh.findMany({
      where: {
        nguoi_dung_id: id
      }
    });


    return data.length > 0 ? data : "Người dùng chưa lưu ảnh nào";
  }
}
