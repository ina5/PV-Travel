
import { IsString, IsInt, Length } from 'class-validator';
export class CreateUserDTO {
    @IsInt() readonly id: number;
    @Length(3, 20)
    @IsString() readonly firstName: string;
    @Length(3, 20)
    @IsString() readonly lastName: string;
    @Length(3, 10)
    @IsString() readonly username: string;
    @IsString() readonly password: string;
    @IsString() readonly email: string;
}