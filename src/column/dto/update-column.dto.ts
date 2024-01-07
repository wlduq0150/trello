import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateColumnDto {
    @IsString()
    @ApiProperty({ description: "컬럼 제목" })
    title: string;
}
