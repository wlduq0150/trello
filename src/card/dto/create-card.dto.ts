import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCardDto {
    @IsNumber()
    @ApiProperty({ description: "컬럼 id" })
    columnId: number;

    @IsString()
    @ApiProperty({ description: "카드 이름" })
    name: string;

    @IsString()
    @ApiProperty({ description: "카드 내용" })
    content: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: "카드 색상" })
    color?: string;

    @IsOptional()
    @IsDate()
    @ApiPropertyOptional({ description: "마감 기한" })
    deadline?: Date;
}
