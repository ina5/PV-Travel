import { RoleEntity } from './../data-base/entity';

import { IsString } from 'class-validator';

export class UserTokenDto {
    @IsString()
    username: string;
    @IsString()
    token?: string;
    @IsString()
    role: RoleEntity;
}