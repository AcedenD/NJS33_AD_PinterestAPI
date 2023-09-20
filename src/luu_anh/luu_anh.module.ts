import { Module } from '@nestjs/common';
import { LuuAnhService } from './luu_anh.service';
import { LuuAnhController } from './luu_anh.controller';

@Module({
  controllers: [LuuAnhController],
  providers: [LuuAnhService],
})
export class LuuAnhModule {}
