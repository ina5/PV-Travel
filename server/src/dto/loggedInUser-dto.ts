
import { IsString } from 'class-validator';
import { RoleEntity } from 'src/data-base/entity';
export class LoggedInUserDTO {

    id: number;
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsString()
    email: string;
    @IsString()
    token?: string;

    role: RoleEntity;
}