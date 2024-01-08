import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentDto {
    @IsString()
    @ApiProperty({ description: "댓글" })
    @IsNotEmpty({message:'수정할 댓글을 입력해주세요'})
    comment: string;
}
