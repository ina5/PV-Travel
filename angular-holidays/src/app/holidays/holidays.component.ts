
import { Component, OnInit } from '@angular/core';
import { Holiday } from './holiday';
import { HolidayService } from '../services/holiday.service';


@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  selectedHoliday: Holiday;
  holidays: Holiday[];
  constructor(private holidayService: HolidayService) { }
  getHolidays(): void {
    this.holidayService.getHolidays()
      .subscribe(holidays => this.holidays = holidays);
  }
  ngOnInit() {
    this.getHolidays();
  }
}
