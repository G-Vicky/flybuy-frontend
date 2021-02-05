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
  totalSales: Number = 0;
  curYearSales: Number = 0;
  curMonthSales: Number = 0;
  selectedYear: Number;
  selectedMonth: String;
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

  getTransCost() {
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

  ngOnInit(): void {
    this.getTransCost();
  }
}
