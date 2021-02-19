import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  today: Date = new Date();
  active = 1;
  totalSales: number = 0;
  curYearSales: number = 0;
  curMonthSales: number = 0;
  selectedYear: Number;
  selectedMonth: String;
  yearOptions: Number[] = [];
  startTime: Date;
  endTime: Date;
  MONTHS: any[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor(private transService: TransactionsService) {
    this.selectedMonth = this.MONTHS[this.today.getMonth()];
    this.selectedYear = this.today.getFullYear();
  }

  getStats() {
    this.transService.getTotalCost(1, 'all').subscribe((result) => {
      this.totalSales = result.totalCost;
    });

    this.transService
      .getTotalCost(this.selectedYear, this.selectedMonth)
      .subscribe((result) => {
        this.curMonthSales = result.totalCost;
      });

    this.transService
      .getTotalCost(this.selectedYear, 'year')
      .subscribe((result) => {
        this.curYearSales = result.totalCost;
      });
  }

  getYearOptions() {
    this.transService.getStartTime().subscribe((result) => {
      this.startTime = new Date(result.data[0].createdAt);
      var start = result.data[0].year;
      this.transService.getEndTime().subscribe((result) => {
        this.endTime = new Date(result.data[0].createdAt);
        var end = result.data[0].year;
        for (let i = +start; i <= +end; i++) {
          this.yearOptions.push(i);
        }
        // for (
        //   let i = +this.startTime.getFullYear();
        //   i <= +this.endTime.getFullYear();
        //   i++
        // ) {
        //   this.yearOptions.push(i);
        // }
      });
    });
  }

  ngOnInit(): void {
    this.getYearOptions();
    this.getStats();
  }
}
