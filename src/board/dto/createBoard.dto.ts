
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBoardDto {
    @ApiProperty({ description: '제목' })
    @IsString()
    title: string;

    @ApiProperty({ description: '배경색상' })
    @IsString()
    background: string;

    @ApiProperty({ description: '설명' })
    @IsString()
    description: string;
}
