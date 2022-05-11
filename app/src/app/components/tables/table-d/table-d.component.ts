import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CmdserviceService } from 'src/app/services/commandeService/cmdservice.service';
import { TableDDataSource, TableDItem } from './table-d-datasource';

@Component({
  selector: 'app-table-d',
  templateUrl: './table-d.component.html',
  styleUrls: ['./table-d.component.css']
})
export class TableDComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableDItem>;
  dataSource: TableDDataSource;
  data : TableDItem[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['item_number', 'item_name', 'planning_date', 'order_number','calendar_year', 'customer_name','status_order'];

  constructor(private service: CmdserviceService) {
    this.dataSource = new TableDDataSource();
    this.service.getAll().subscribe( x => {
     this.data = x;
     console.log(this.data)
   })
      this.dataSource
      
  }
  getAllInfos(): void {
    let res = this.service.getAll();
    res.subscribe(report => this.dataSource.data = report as TableDItem[] );

  }
   ngOnInit(): void {
     this.getAllInfos();
   }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
}
