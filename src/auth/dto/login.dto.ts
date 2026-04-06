import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: 'User email address',
        example: 'saikola@gmail.com',
        format: 'email',
        required: true
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: 'User password',
        example: 'saiKola',
        minLength: 6,
        format: 'password',
        required: true
    })
    @IsString()
    password!: string;
}