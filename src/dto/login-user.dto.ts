
import { IsString, Length } from 'class-validator';
export class LoginUserDTO {
    @Length(3, 10)
    @IsString()
    username: string;

    @IsString()
    password: string;
}