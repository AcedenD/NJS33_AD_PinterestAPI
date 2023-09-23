import { PartialType } from '@nestjs/mapped-types';
import { CreateNguoiDungDto } from './create-nguoi_dung.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNguoiDungDto extends PartialType(CreateNguoiDungDto) { 
  @ApiProperty()
  email: string;   

  @ApiProperty()
  mat_khau :     string     
  
  @ApiProperty()
  ho_ten :       string   

  @ApiProperty()
  tuoi   :       number

}
