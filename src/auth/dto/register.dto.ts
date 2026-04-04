import { IsEAN, IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "src/common/enums/role.enum";


export class RegisterDto {
    @IsEmail()
    email!: string;

    @IsString()
    password!: string

    @IsEnum(Role)
    role!: Role
}