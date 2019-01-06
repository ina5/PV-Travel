import { Injectable } from '@angular/core';
import { Holiday } from '../holidays/holiday';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private holidaysUrl = 'http://localhost:3000/holidays';
  private holidayUrlId = 'http://localhost:3000/holidays/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  getHolidays(): Observable<Holiday[]> {

    return this.http.get<Holiday[]>(this.holidaysUrl);
  }
  getHoliday(id: string): Observable<Holiday> {

    return this.http.get<Holiday>(this.holidayUrlId + id);
  }
  private log(message: string) {
    this.messageService.add(`HolidayService: ${message}`);
  }
}
