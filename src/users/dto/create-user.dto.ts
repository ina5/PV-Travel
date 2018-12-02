
import { IsString, IsInt, Length } from 'class-validator';
export class CreateUserDto {
    @IsInt() readonly id: number;
    @Length(3, 20)
    @IsString() readonly firstName: string;
    @Length(3, 20)
    @IsString() readonly lastName: string;
    @Length(3, 10)
    @IsString() readonly userName: string;
    @IsString() readonly password: string;
    @IsString() readonly email: string;
}