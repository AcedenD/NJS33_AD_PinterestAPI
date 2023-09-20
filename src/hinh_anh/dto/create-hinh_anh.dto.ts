import { ApiProperty } from "@nestjs/swagger";

export class CreateHinhAnhDto {
  
  @ApiProperty()
  nguoi_dung_id: number;

  @ApiProperty()
  ten_hinh: string;

  @ApiProperty()
  mo_ta: string;

}
