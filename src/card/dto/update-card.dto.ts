import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateCardDto } from "./create-card.dto";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateCardDto extends PartialType(CreateCardDto) {}
