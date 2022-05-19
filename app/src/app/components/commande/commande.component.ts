import { Component, OnInit, ViewChild } from '@angular/core';
import { CmdserviceService } from 'src/app/services/commandeService/cmdservice.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Commande} from 'src/app/donnees/Commande'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
totalAnnee : any
totalAnnees : any
totalAnneem : any
// cmd = {
//   item_number: '',
//   item_name:'',
//   besoin : '',
//   calendar: "",
//   planning_date:'' ,
  
//   order_number:'',
//   status_order:'',
//   customer_name:'',
  
// }
   Commandes:Commande [] | undefined;
  //  pageSizeOptions: number[] = [1, 10, 15, 20];
  //  pageIndex: number = 0;
  //  itemsPerPage = 10;
  //  pageSize: any;
   displayedColumns = ['item_number', 'item_name', 'besoin','calendar_year', 'planning_date','order_number','status_order','customer_name']
   dataSource!:MatTableDataSource <any>;
   @ViewChild('paginator') paginator!:MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  constructor(private service: CmdserviceService,private breakpointObserver: BreakpointObserver) { }
  // handlePageEvent(event: PageEvent) {
  //   this.pageSize = event.pageIndex;
  //   this.itemsPerPage = event.pageSize;
  // }
  // retrieve() :void {
  //   const res = this.service.retrieve();
  //   res.subscribe((dataxx: any)=> {
  //     console.log(dataxx)
  //     let t: any[] | undefined = []
  //     dataxx.forEach((el: any)=>{
  //       Object(t).push(el)
  //     })
  //     this.Commandes = t;
  //   })
  // }
  ngOnInit(): void {
    this.service.retrieve().subscribe((response:any)=> {
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log('the response is ',response)
    })
    this.service.totalCommandes().subscribe((qte: any)=> {
      this.totalAnnee = qte;
    this.service.totalcmdAnnee().subscribe((e:any)=> {
      this.totalAnneem = e;
    })

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
