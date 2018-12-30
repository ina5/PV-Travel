import { IsString, Length } from 'class-validator';

export class BookingHolidayDTO {
  @IsString()
  @Length(2, 50)  userId: string;

  @IsString()
  @Length(2, 50)  holidayId: string;

}
