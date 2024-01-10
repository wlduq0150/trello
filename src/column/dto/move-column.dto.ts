import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class ColumnMoveDto {
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "이전 컬럼" })
    prevId?: number;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "다음 컬럼" })
    nextId?: number;
}
