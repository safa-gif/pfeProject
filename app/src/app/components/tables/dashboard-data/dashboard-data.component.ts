import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DashboardServiceService } from 'src/app/services/chartServices/dashboard-service.service';
import { DashboardDataDataSource, DashboardDataItem } from './dashboard-data-datasource';

@Component({
  selector: 'app-dashboard-data',
  templateUrl: './dashboard-data.component.html',
  styleUrls: ['./dashboard-data.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardDataComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DashboardDataItem>;
  dataSource: DashboardDataDataSource;
   data : DashboardDataItem[]= [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['item_number', 'planning_date', 'week',"week_prod",'month' ,'calendar_year', 'BesoinBrut','BesoinNet','StatusCommande','month'];

  constructor(private service: DashboardServiceService) {
    this.dataSource = new DashboardDataDataSource();
    this.service.allData().subscribe( x => {
     this.data = x;
     console.log(this.data)
   })
      this.dataSource
  }
  getAllInfos(): void {
    let res = this.service.allData()
    res.subscribe(report => this.dataSource.data = report as DashboardDataItem[] );

  }
  ngOnInit() {
   this.getAllInfos();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  filter() {

  }
}
