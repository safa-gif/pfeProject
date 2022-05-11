import { Component, OnInit } from '@angular/core';
import { CmdserviceService } from 'src/app/services/commandeService/cmdservice.service';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
totalAnnee : any
totalAnnees : any
totalAnneem : any

  constructor(private service: CmdserviceService) { }

  ngOnInit(): void {
    this.service.totalCommandes().subscribe((qte: any)=> {
      this.totalAnnee = qte;
    this.service.totalcmdAnnee().subscribe((e:any)=> {
      this.totalAnneem = e;
    })

   })
  }
  // afficher() {
  //  this.service.Counter();
  
  // }


}
