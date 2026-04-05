import { IsEmail, IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../common/enums/common.enum"; // Fixed import path

export class RegisterDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email',
        required: true
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: 'User password',
        example: 'P@ssw0rd123',
        minLength: 6,
        format: 'password',
        required: true
    })
    @IsString()
    password!: string

    @ApiProperty({
        description: 'User role',
        enum: Role,
        example: Role.VIEWER,
        required: true,
        enumName: 'Role'
    })
    @IsEnum(Role)
    role!: Role
}