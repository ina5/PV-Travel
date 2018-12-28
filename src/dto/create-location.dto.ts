import { IsString, Length } from 'class-validator';

export class CreateLocationDTO {
    @IsString()
    @Length(2, 50)  name: string;
}