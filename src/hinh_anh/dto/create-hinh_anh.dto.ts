import { ApiProperty } from "@nestjs/swagger";

export class CreateHinhAnhDto {

  @ApiProperty()
  ten_hinh: string;

  @ApiProperty()
  mo_ta: string;

}
