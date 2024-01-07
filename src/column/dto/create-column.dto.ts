import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateColumnDto {
    @IsString()
    @ApiProperty({ description: "컬럼 제목" })
    title: string;

    @IsNumber()
    @ApiProperty({ description: "보드 id" })
    boardId: number;
}
