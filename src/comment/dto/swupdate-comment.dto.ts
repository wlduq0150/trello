import { PickType } from "@nestjs/swagger";
import { CreateCommentDto } from "./create-comment.dto";
import { UpdateCommentDto } from "./update-comment.dto";

export class SwUpdateDto extends PickType(UpdateCommentDto, ["comment"]){}