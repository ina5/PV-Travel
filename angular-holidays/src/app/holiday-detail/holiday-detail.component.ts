import { HolidayService } from '../services/holiday.service';
import { Holiday } from './../holidays/holiday';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.css']
})
export class HolidayDetailComponent implements OnInit {
  holiday: Holiday;
  constructor(
    private route: ActivatedRoute,
    private holidayService: HolidayService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHoliday();
  }
  private getHoliday(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.holidayService.getHoliday(id).subscribe(holiday => {
      this.holiday = holiday;
    });
  }
  goBack(): void {
    this.location.back();
  }
}
