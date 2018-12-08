import { IsString, Length, IsNumber, IsDateString } from 'class-validator';

export class CreateHolidayDTO {
  @IsString() readonly id: string;
  @IsString()
  @Length(3, 30) readonly title: string;
  @IsString()
  @Length(2, 20) readonly location: string;
  @IsDateString() readonly startDate: string;
  @IsDateString() readonly endDate: string;
  @IsNumber() readonly price: number;
  @IsString() readonly description: string;
}
