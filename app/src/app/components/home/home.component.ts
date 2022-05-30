import { Component,NgModule, ElementRef,AfterViewInit,OnDestroy,Input,Output,EventEmitter,ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/services/chartServices/app-config.service';
import { AppConfig } from 'src/app/donnees/AppConfig';
import {Subscription} from 'rxjs';
import { DatePipe } from '@angular/common';
import { DashboardServiceService } from 'src/app/services/chartServices/dashboard-service.service';
import { DateServiceService } from 'src/app/services/dateService/date-service.service';
import {Dashboard} from 'src/app/donnees/Dashboard'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data: any;
  datas: any;
  //linear chart
  basicData: any;
  basicOptions: any;
  config!: AppConfig;
  subscription!: Subscription;
  //combor chart
  chartOptions: any;
  data2: any;
  data1:any;
  datepipeWeek!: any;
  retardAnnee:any;  
  retardMois:any;
  totalevents: any;
  retardSemaine: any;
//   item = {
//     _id: '',
//     item_number: '',
//     calendar_year:'',
//     planning_date:'' ,
//     week:'',
//     week_prod:'',
//     order_number:'',
//     month:'',
//     StatusCommande:'',
//     BesoinBrut: '',
//     BesoinNet:'',
//     OrderNumber: ''
//   }
  Items :Dashboard[] | undefined 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    postData: any;
    
    displayedColumns = ['item_number','item_name','calendar_year', 'planning_date','week','week_prod','month','StatusCommande', 'BesoinBrut','BesoinNet']
    dataSource!:MatTableDataSource<any>;
    @ViewChild('paginator')paginator!: MatPaginator;
    @ViewChild(MatSort)matSort!: MatSort;
    datap: any;
    constructor(private breakpointObserver: BreakpointObserver,
     private toastr: ToastrService,  private configService: AppConfigService,
      private datePipe: DatePipe, private ser: DashboardServiceService,
      private eveneS :DateServiceService) {
        
     this.datepipeWeek = datePipe.transform(Date.now(), 'w')
    //pie chart
  
    this.data = {
      labels: ['Temps','Retards'],

      datasets: [
          {
              data: [450, 1394],
              backgroundColor: [
                //   "rgb(244, 115, 115)",
                "#FFA726",
                  "#42A5F5"
              ],
              hoverBackgroundColor: [
                // "rgb(244, 115, 115)",
                "#FFA726",
                "#42A5F5"
              ]
          }]    
      }

        //linear chart
        this.basicData = {
            labels : ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juilliet', 'août','spetembre', 'octobre','novembre','décembre'],
            datasets : [
                {
                label : '2021',
                data : [ 150, 2, 2, 2, 24, 2, 6, 16, 6, 6, 28, 34 ],
                fill:false,
                borderColor: '#42A5F5',
                tension: 0.6
                },
                {
                    label: '2022',
                    data : [142, 300, 448, 340, 282, 142, 34, 12, 4, 4 ,4 ,4 ],
                    fill:false,
                    borderColor: '#FFA726',
                    tension:0.6
                }
            ]
        };
        
  }
  ngOnInit(){
    this.ser.retards().subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
    })
     this.datepipeWeek = this.datePipe.transform(Date.now(), 'w')
     this.ser.RetardsSemaine().subscribe((info: any)=> {
         this.retardSemaine = info;
     })
     this.ser.RetardsAnnee().subscribe((infos: any)=> {
        this.retardAnnee = infos;
    })
    this.eveneS.totalEvents().subscribe((a:any)=>{
        this.totalevents = a;
    })
    this.ser.RetardsMois().subscribe((infor: any) =>{
        this.retardMois = infor;
    })
    this.configService.late().subscribe((datax)=>{
        this.data1 = [], this.data2 = []
            for(const i of Object.values(datax)) {
               if((i.calendar_year) == 2021) {
                this.data1.push({
                    calendar_year: i.calendar_year,
                    Besoin:i.Besoin,
                    month:i.month
                })
               }
               else {
                  
                   this.data2.push({
                       calendar_year: i.calendar_year,
                       month:i.month,
                       Besoin:i.Besoin
                })
                console.log(this.data2)
                }
            }
            console.log('the data is here 2021 out ',this.data1)
            console.log('the data is here 2022 out ',this.data2)

            
        } );
        this.configService.latepie().subscribe((dataR)=> {
            this.datap = []
           for (const i of Object.values(dataR)) {
               
               this.datap.push({
                   StatusCommande : i.StatusCommande,
                   BesoinStatus : i.BesoinStatus
               })
           }
           console.log(this.datap)
        });
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
  
  }
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
  updateChartOptions() {
    if (this.config.dark)
        this.applyDarkTheme();
    else
        this.applyLightTheme();
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
// 
logout() {
    
}
}