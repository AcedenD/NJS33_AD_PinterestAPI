import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { returnMessage } from 'src/util/helper';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  model = new PrismaClient()

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(loginAuthDto: LoginAuthDto) {
    let {email, password} = loginAuthDto;
    let data = await this.model.nguoi_dung.findFirst({
      where: {
        email,
      }
    })

    if(data) {
      if(data.mat_khau == password) {
        let token = this.jwtService.sign({data: data},{ expiresIn: "7d", secret: "NODE" })

        return token
      }else{
        return "Sai mật khẩu"
      }
    }
    return "Email không tồn tại"
  }

  async signUp(createAuthDto: CreateAuthDto) {
    let {email, mat_khau , ho_ten , tuoi} = createAuthDto;
    let data = await this.model.nguoi_dung.findFirst({
      where: {
        email,
      }
    })

    if(data) {
      return "Email đã tồn tại"
    }else{
      let data = await this.model.nguoi_dung.create({
        data: {
          email,
          mat_khau,
          ho_ten,
          tuoi
        }
      })
      return "Đăng ký thành công"
    }
  }

}
