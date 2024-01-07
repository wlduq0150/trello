import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @ApiProperty({ description: "댓글" })
    comment: string;
}
