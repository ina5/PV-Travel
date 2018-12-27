import { Length, IsString, IsEmail } from 'class-validator';
import { RoleEntity } from 'src/data-base/entity';

export class CreateUserWithRoleDTO {
    @Length(3, 100)
    @IsString() firstName: string;
    @Length(3, 100)
    @IsString() lastName: string;
    @Length(3, 100)
    @IsString() username: string;
    @IsString() password: string;
    @IsEmail() email: string;
    role: RoleEntity;
}