import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-yearly-report',
  templateUrl: './yearly-report.component.html',
  styleUrls: ['./yearly-report.component.css'],
})
export class YearlyReportComponent implements OnInit {
  today: Date = new Date();
  yearlyChart: Chart;
  year1: Number;
  year2: Number;
  startTime: Date;
  endTime: Date;
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
    this.year1 = this.today.getFullYear();
    this.year2 = this.today.getFullYear() - 1;
  }

  createYearlyChart(): void {
    if (this.year1 == this.year2) {
      alert('Select different years!!');
      location.reload();
    }
    if (this.yearlyChart) {
      this.yearlyChart.destroy();
    }

    this.transService
      .getMonthlyTransactions(this.year1, this.year1)
      .subscribe((result) => {
        console.log(result);
        var year1Costs: number[] = [];
        var data = result.data;
        data.sort((a: any, b: any) => {
          return this.MONTHS.indexOf(a._id) - this.MONTHS.indexOf(b._id);
        });
        for (let i = 0; i < data.length; i++) {
          year1Costs.push(data[i].totalCost);
        }

        this.transService
          .getMonthlyTransactions(this.year2, this.year2)
          .subscribe((result) => {
            var year2Costs: number[] = [];
            var data = result.data;
            data.sort((a: any, b: any) => {
              return this.MONTHS.indexOf(a._id) - this.MONTHS.indexOf(b._id);
            });
            for (let i = 0; i < data.length; i++) {
              year2Costs.push(data[i].totalCost);
            }
            this.yearlyChart = new Chart('yearlyChart', {
              type: 'line',
              data: {
                labels: this.MONTHS,
                datasets: [
                  {
                    label: 'sales in ' + this.year1,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    data: year1Costs,
                    fill: false,
                  },
                  {
                    label: 'sales in ' + this.year2,
                    fill: false,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    data: year2Costs,
                  },
                ],
              },
              options: {
                responsive: true,
                title: {
                  display: true,
                  text:
                    'Yearly comparision between ' +
                    this.year1 +
                    ' & ' +
                    this.year2,
                },
                tooltips: {
                  mode: 'index',
                  intersect: false,
                },
                hover: {
                  mode: 'nearest',
                  intersect: true,
                },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      scaleLabel: {
                        display: true,
                        labelString: 'Month',
                      },
                    },
                  ],
                  yAxes: [
                    {
                      display: true,
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
    this.createYearlyChart();
  }
}
