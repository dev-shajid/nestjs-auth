import { Optional } from "@nestjs/common";
import { IsEmail, Length } from "class-validator";
import { Role } from "src/utils/enums/role.enum";

export class LoginUserDto {
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @Length(5, 20, { message: 'Password must be between 5 and 20 characters' })
    password: string;
}
