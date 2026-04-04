import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateRecordDto } from "./create-record.dto";

export class UpdateRecordDTO extends PartialType(CreateRecordDto) {

}