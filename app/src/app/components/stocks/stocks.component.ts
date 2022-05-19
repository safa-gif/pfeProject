import { Component, OnInit, ViewChild } from '@angular/core';
import { StockserviceService } from 'src/app/services/stockService/stockservice.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Stock} from "src/app/donnees/Stock"
import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  totalProduit: any;
  produitsDanger: any;
  produitplusDi: any;
  produit:any;
  // product = {
  //   item_name: '',
  //   item_number: '', 
  //   on_hand_balance:'',
  //   Status_Produit: '',
  // }
  displayedColumns = ['item_number','item_name', 'on_hand_balance','Status_Produit']
  dataSource! : MatTableDataSource<any>
  @ViewChild('paginator') paginator!:MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  Products : Stock []|undefined
  // pageSizeOptions: number[] = [1, 10, 15, 20];
  //  pageIndex: number = 0;
  //  itemsPerPage = 10;
  //  pageSize: any;

  constructor(private service: StockserviceService,private breakpointObserver: BreakpointObserver) { }
  // handlePageEvent(event: PageEvent) {
  //   this.pageSize = event.pageIndex;
  //   this.itemsPerPage = event.pageSize;
  // }
  countFrequent() :void {
    const res = this.service.countFrequent();
    res.subscribe((dataxx: any)=> {
      console.log(dataxx)
      let t: any[] | undefined = []
      dataxx.forEach((el: any)=>{
        Object(t).push(el)
      })
      this.Products = t;
    })
  }
  ngOnInit(): void {
    //material data table 
    this.service.getStock().subscribe((response:any)=> {
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })

    this.countFrequent()
    this.service.totalStocks().subscribe((pt: any)=>{
      this.totalProduit = pt;
    })
    this.service.stockEmpty().subscribe((data:any)=> {
      this.produitsDanger = data;
    })
    this.service.stockLoaded().subscribe((info:any)=> {
      this.produitplusDi = info;
    })
  }
    filterData($event: any) {
       this.dataSource.filter = $event.target.value;
    }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

}
