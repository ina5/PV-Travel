
import { IsString } from 'class-validator';
export class LoggedInUserDTO {

    id: number;
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsString()
    email: string;
    @IsString()
    token?: string;
}