import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { DataDataSource, DataItem } from './data-datasource';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements AfterViewInit {
  @ViewChild(MatPaginator ) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataItem>;
  dataSource: DataDataSource;
  // datSource = new DataDataSource();
  donnees: DataItem []= [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'item_number', 'item_name','planning_date', 'semaine_cmd',
  'semaine_prod','BesoinNet','BesoinBrut', 'on_hand_balance'];
      
  constructor(private service: DataserviceService) {
   
    this.dataSource = new DataDataSource();
    this.service.getAllData().subscribe( x => {
      this.donnees =x;
      console.log(this.donnees)
        })
  }
  
  // filterData($event: any) {
  //   this.dataSource.filter = $event.target.value;
  // }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllInfos();
    // this.service.getAllData().subscribe((res)=> {
    //   console.log(res,"===> res");
    // })
    // this.datSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
  public getAllInfos(){
    let res = this.service.getAllData();
      res.subscribe(report => this.dataSource.donnees = report as DataItem [])
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    
  }
  
}
