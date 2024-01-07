import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ChangeColumnCardDto {
    @IsNumber()
    @ApiProperty({ description: "컬럼 id" })
    columnId: number;
}
