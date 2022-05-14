import { Component, OnInit } from '@angular/core';
import { CmdserviceService } from 'src/app/services/commandeService/cmdservice.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
totalAnnee : any
totalAnnees : any
totalAnneem : any

  constructor(private service: CmdserviceService,private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.service.totalCommandes().subscribe((qte: any)=> {
      this.totalAnnee = qte;
    this.service.totalcmdAnnee().subscribe((e:any)=> {
      this.totalAnneem = e;
    })

   }) 

  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


}
