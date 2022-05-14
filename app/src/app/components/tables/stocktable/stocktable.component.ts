import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StockserviceService } from 'src/app/services/stockService/stockservice.service';
import { StocktableDataSource, StocktableItem } from './stocktable-datasource';

@Component({
  selector: 'app-stocktable',
  templateUrl: './stocktable.component.html',
  styleUrls: ['./stocktable.component.css']
})
export class StocktableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StocktableItem>;
  dataSource: StocktableDataSource;
   data : StocktableItem[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['item_number', 'item_name', 'on_hand_balance', 'Status_Produit'];

  constructor(private service: StockserviceService) {
    this.dataSource = new StocktableDataSource();
    // this.service. retrieveStock().subscribe(a => {
    //   this.data = a
    // })
    //    this.dataSource
  }
  allinfos() {
    // let res = this.service.retrieveStock();
    let res = this.service.countFrequent();
    res.subscribe(r => this.dataSource.data = r as StocktableItem[] );
      console.log(res)
  }
  ngOnInit() : void {
   this.allinfos();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
