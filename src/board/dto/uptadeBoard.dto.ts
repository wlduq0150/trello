import { PartialType } from "@nestjs/swagger";
import { CreateBoardDto } from "./createBoard.dto";

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
