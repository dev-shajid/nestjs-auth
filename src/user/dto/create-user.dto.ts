import { Optional } from "@nestjs/common";
import { IsEmail, Length } from "class-validator";
import { Role } from "src/utils/enums/role.enum";
import { LoginUserDto } from "./login-user.dto";

export class CreateUserDto extends LoginUserDto{
    @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
    name: string;

    @Optional()
    role: Role[];
}
