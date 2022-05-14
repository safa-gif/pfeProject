import { Component, OnInit } from '@angular/core';
import { StockserviceService } from 'src/app/services/stockService/stockservice.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
  constructor(private service: StockserviceService,private breakpointObserver: BreakpointObserver) { }
  ngOnInit(): void {
    this.service.totalStocks().subscribe((pt: any)=>{
      this.totalProduit = pt;
    })
    this.service.stockEmpty().subscribe((data:any)=> {
      this.produitsDanger = data;
    })
    this.service.stockLoaded().subscribe((info:any)=> {
      this.produitplusDi = info;
    })
    // this.service.produitDisponible().subscribe((kop: any)=> {
    //    this.produit = kop
    // })
    
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
}
