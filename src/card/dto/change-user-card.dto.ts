import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ChangeUserCardDto {
    @IsNumber()
    @ApiProperty({ description: "유저 id" })
    userId: number;
}
