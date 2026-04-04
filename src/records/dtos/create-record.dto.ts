import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRecordDto {
    @IsNumber()
    amount: number

    @IsEnum(['income', 'expense'])
    type: 'income' | 'expense'

    @IsDateString()
    date: string;

    @IsOptional()
    @IsString()
    note?: string

    @IsString()
    category: string
}