import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
totalAnnee : any
  constructor(private http: HttpClient,  
    // private service CmdserviceService
    ) { }

  ngOnInit(): void {
  }
  afficher() {
  //  this.service.getAllData().subscribe((data: any)=> {
  //    console.log(data)
  //  })
   this.totalAnnee = 195;  
  }

}
