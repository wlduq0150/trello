import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CardMoveDto {
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "이동할 컬럼 id" })
    columnId?: number;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "이전 카드" })
    prevId?: number;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "다음 카드" })
    nextId?: number;
}
