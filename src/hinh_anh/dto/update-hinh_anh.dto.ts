import { PartialType } from '@nestjs/mapped-types';
import { CreateHinhAnhDto } from './create-hinh_anh.dto';

export class UpdateHinhAnhDto extends PartialType(CreateHinhAnhDto) {}
