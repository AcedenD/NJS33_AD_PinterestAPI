import { ApiProperty } from "@nestjs/swagger";

export class CreateBinhLuanDto {


    @ApiProperty()
    noi_dung: string;

    @ApiProperty()
    hinh_id: number;

}
