import { LocationEntity } from './../data-base/entity/location.entity';
import { IsString, Length, IsNumber, IsDateString } from 'class-validator';

export class CreateHolidayDTO {
  @IsString()
  @Length(3, 30) readonly title: string;
  @IsString()
  @Length(2, 20) location: LocationEntity;
  @IsDateString() readonly startDate: string;
  @IsDateString() readonly endDate: string;
  @IsNumber() readonly price: number;
  @IsString() readonly description: string;
}
