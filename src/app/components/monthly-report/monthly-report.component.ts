import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css'],
})
export class MonthlyReportComponent implements OnInit {
  today = new Date();
  monthlyChart: Chart;
  startTime: Date;
  endTime: Date;
  selectedYear: Number;
  yearOptions: Number[] = [];
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
    this.selectedYear = this.today.getFullYear();
  }

  createMonthlyChart(): void {
    if (this.monthlyChart) {
      this.monthlyChart.destroy();
    }
    this.transService
      .getMonthlyTransactions(this.selectedYear, this.selectedYear)
      .subscribe((result) => {
        console.log(result);
        var months = [];
        var costs = [];
        var data = result.data;
        data.sort((a: any, b: any) => {
          return this.MONTHS.indexOf(a._id) - this.MONTHS.indexOf(b._id);
        });
        for (let i = 0; i < data.length; i++) {
          months.push(data[i]._id);
          costs.push(data[i].totalCost);
        }

        this.monthlyChart = new Chart('monthlyChart', {
          type: 'bar',
          data: {
            labels: months,
            datasets: [
              {
                label: 'sales (₹)',
                data: costs,
                backgroundColor: this.poolColors(months.length),
                borderColor: this.poolColors(months.length),
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            title: {
              display: true,
              text: 'Monthly view of sales in ' + this.selectedYear,
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Month',
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'price (₹)',
                  },
                },
              ],
            },
          },
        });
      });
  }

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
  }
  poolColors(a: number) {
    var pool = [];
    for (let i = 0; i < a; i++) {
      pool.push(this.dynamicColors());
    }
    return pool;
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

  changeMontlyChart() {
    alert('changing');
  }

  ngOnInit(): void {
    this.createMonthlyChart();
    this.getYearOptions();
  }
}
