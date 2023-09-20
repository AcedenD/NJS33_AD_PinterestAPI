import { ApiProperty } from "@nestjs/swagger"

export class CreateNguoiDungDto {
  @ApiProperty()
  email:        string      

  @ApiProperty()
  mat_khau :     string     
  
  @ApiProperty()
  ho_ten :       string   

  @ApiProperty()
  tuoi   :       number
}
