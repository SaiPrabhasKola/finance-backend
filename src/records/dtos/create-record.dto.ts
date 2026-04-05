import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransactionType } from "src/common/enums/common.enum";



export class CreateRecordDto {
    @ApiProperty({
        description: 'Transaction amount',
        example: 100.50,
        minimum: 0,
        type: Number
    })
    @IsNumber()
    amount: number

    @ApiProperty({
        description: 'Type of transaction',
        enum: TransactionType,
        example: TransactionType.EXPENSE
    })
    @IsEnum(TransactionType)
    type: TransactionType

    @ApiProperty({
        description: 'Date of the transaction (ISO format)',
        example: '2024-03-15',
        format: 'date'
    })
    @IsDateString()
    date: string;

    @ApiPropertyOptional({
        description: 'Optional note for the transaction',
        example: 'Grocery shopping',
        maxLength: 255
    })
    @IsOptional()
    @IsString()
    note?: string

    @ApiProperty({
        description: 'Category of the transaction',
        example: 'Food',
        maxLength: 100
    })
    @IsString()
    category: string
}