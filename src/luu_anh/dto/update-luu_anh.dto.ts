import { PartialType } from '@nestjs/mapped-types';
import { CreateLuuAnhDto } from './create-luu_anh.dto';

export class UpdateLuuAnhDto extends PartialType(CreateLuuAnhDto) {}
