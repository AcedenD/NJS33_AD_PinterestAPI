import { Module } from '@nestjs/common';
import { HinhAnhService } from './hinh_anh.service';
import { HinhAnhController } from './hinh_anh.controller';

@Module({
  controllers: [HinhAnhController],
  providers: [HinhAnhService],
})
export class HinhAnhModule {}
