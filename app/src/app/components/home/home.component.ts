import { Component,NgModule, ElementRef,AfterViewInit,OnDestroy,Input,Output,EventEmitter,ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/services/chartServices/app-config.service';
import { AppConfig } from 'src/app/donnees/AppConfig';
import {Subscription} from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataserviceService } from 'src/app/services/dataservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers: [MessageService]
})
export class HomeComponent {
  data: any;
  //linear chart
  basicData: any;
  basicOptions: any;
  config!: AppConfig;
  subscription!: Subscription;
  //combor chart
  chartOptions: any;
  data2: any;
  datepipeWeek!: any;
  exactWeek!:any;  
   total2!: number;
   total3!: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
    
  constructor(private breakpointObserver: BreakpointObserver,
     private toastr: ToastrService,  private configService: AppConfigService,
      private datePipe: DatePipe,private service: DataserviceService ) {
        
     this.datepipeWeek = datePipe.transform(Date.now(), 'w')
    //pie chart
    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      }
      //combo chart
      this.data2 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'line',
                label: 'Dataset 1',
                borderColor: '#42A5F5',
                borderWidth: 2,
                fill: false,
                data: [
                    50,
                    25,
                    12,
                    48,
                    56,
                    76,
                    42
                ]
            }, {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: '#66BB6A',
                data: [
                    21,
                    84,
                    24,
                    75,
                    37,
                    65,
                    34
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: '#FFA726',
                data: [
                    41,
                    52,
                    24,
                    74,
                    23,
                    21,
                    32
                ]
            }]
        };
        //linear chart
        this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#FFA726',
                    tension: .4
                }
            ]
        };
  }
  OnInit(){
      //exact week 
     this.datepipeWeek = this.datePipe.transform(Date.now(), 'w')
     
      //linear chart
this.chartOptions =  {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};
// linear chart & combo chart
  this.config = this.configService.config;
  this.updateChartOptions();
  this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
  });
  this.datepipeWeek = this.datePipe.transform(Date.now(), 'w') 
    this.exactWeek = this.datepipeWeek - 1;
    this.total2= 60;
    this.total3 = 100;
  this.exactWeek = this.datepipeWeek - 1;

  }

  updateChartOptions() {
    if (this.config.dark)
        this.applyDarkTheme();
    else
        this.applyLightTheme();
}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  afficher() {
    
    this.datepipeWeek = this.datePipe.transform(Date.now(), 'w') 
    this.exactWeek = this.datepipeWeek - 1;
    this.total2= 60;
    this.total3 = 100;
  }

 
applyLightTheme() {
  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };
}

applyDarkTheme() {
  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#ebedef'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          }
      }
  };

 
}
}