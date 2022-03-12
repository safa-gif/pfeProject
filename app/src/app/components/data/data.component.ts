import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { DataDataSource, DataItem } from './data-datasource';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements AfterViewInit {
  @ViewChild(MatPaginator , {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataItem>;
  dataSource: DataDataSource;
  datSource = new DataDataSource();
   donnees: DataItem []= [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'item_number', 'item_name','planning_date', 'semaine_prod', 'on_hand_balance'];
      
  constructor(private service: DataserviceService) {
   
    this.dataSource = new DataDataSource();
    this.service.getAllData().subscribe( x => {
      this.donnees =x;
      console.log(this.donnees)
        })
  }
  public getAllInfos(){
    let res = this.service.getAllData();
      res.subscribe(report => this.dataSource.data = report as DataItem [])
  }
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
  ngOnInit(): void {
    // this.service.getAllData().subscribe((res)=> {
    //   console.log(res,"===> res");
    // })
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
