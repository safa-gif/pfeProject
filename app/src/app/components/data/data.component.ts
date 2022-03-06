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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataItem>;
  dataSource: DataDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'item_number', 'item_name', 'besoin_net', 'besoin_cumulee', 'semaine_prod'];
      
  constructor(private service: DataserviceService) {
    this.dataSource = new DataDataSource();
  }
    readData: any;
  ngOnInit(): void {
    this.service.getAllData().subscribe((res)=> {
      console.log(res,"===> res");
      this.readData = res.data;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
