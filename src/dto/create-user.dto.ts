
import { IsString, IsInt, Length, IsEmail } from 'class-validator';
export class CreateUserDTO {
    @IsInt()  id: number;
    @Length(3, 100)
    @IsString()  firstName: string;
    @Length(3, 100)
    @IsString()  lastName: string;
    @Length(3, 100)
    @IsString()  username: string;
    @IsString()  password: string;
    @IsEmail()  email: string;
}