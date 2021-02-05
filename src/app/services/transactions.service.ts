import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly URL = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getTodayTransactions(): Observable<any> {
    return this.http.get(this.URL + '/today');
  }

  getMonthlyTransactions(yearStart: Number, yearEnd: Number): Observable<any> {
    return this.http.get(
      this.URL + '/monthly?yearStart=' + yearStart + '&yearEnd=' + yearEnd
    );
  }

  getStartTime(): Observable<any> {
    return this.http.get(this.URL + '/starttime');
  }
  getEndTime(): Observable<any> {
    return this.http.get(this.URL + '/endtime');
  }

  getTotalCost(year: Number, month: String): Observable<any> {
    if (month == 'all') return this.http.get(this.URL + '/totalcost');
    if (month == 'year')
      return this.http.get(this.URL + '/totalcost?year=' + year);
    return this.http.get(
      this.URL + '/totalcost?year=' + year + '&month=' + month
    );
  }
}
