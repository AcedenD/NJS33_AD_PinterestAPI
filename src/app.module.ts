import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './nguoi_dung/nguoi_dung.module';
import { LuuAnhModule } from './luu_anh/luu_anh.module';
import { HinhAnhModule } from './hinh_anh/hinh_anh.module';
import { BinhLuanModule } from './binh_luan/binh_luan.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [NguoiDungModule, BinhLuanModule, HinhAnhModule, LuuAnhModule, ConfigModule.forRoot({isGlobal: true}), AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
