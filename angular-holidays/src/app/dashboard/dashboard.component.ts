
import { Component, OnInit } from '@angular/core';
import { Holiday } from '../holidays/holiday';
import { HolidayService } from '../services/holiday.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  holidays: Holiday[] = [];
  constructor(private holidayService: HolidayService) { }
  getHolidays(): void {
    this.holidayService.getHolidays()
      .subscribe(holidays => this.holidays = holidays.slice(1, 5));
  }
  ngOnInit() {
    this.getHolidays();
  }

}
