import { PickType } from "@nestjs/swagger";
import { CreateCommentDto } from "./create-comment.dto";

export class SwCreateDto extends PickType(CreateCommentDto, ["comment"]){}