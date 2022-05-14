import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/authServices/login/login.service';
import {User} from 'src/app/donnees/User';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user = {
    _id: '',
    username : '',
    email : '',
    password : '',
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  constructor(private toastr: ToastrService, private service: LoginService,
    private breakpointObserver: BreakpointObserver,private snackBar:MatSnackBar,private router:Router) { }
    utilisateur:any;
   Users = [];
    x:any;
  ngOnInit(): void {
    this.findAll();
    this.service.count().subscribe((dta: any)=> {
      this.utilisateur = dta;
      console.log(dta)
     })
     this.modifier();
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  findAll() {
    const res = this.service.findAll();
     res.subscribe((data: any)=> {
       console.log(data)
       data.forEach((x: any)=> {
         return this.user = x
       })
       data.map((el: never[])=> {
         this.Users = el
       })
       this.Users = data
       console.log(this.Users)
     })
     
  }
  
  modifier(){
    this.x = 3;
    if(this.x == 5)
        {this.snackBar.open('Modification réalisé avec succés','',{duration:1000});
         
        }
        else
        { 
          this.snackBar.open('Modification échouée','',{duration:1000})
      }
  //  this.service.updateUser().subscribe()
  }
  // count(){
  //   this.service.count().subscribe((data: any)=> {
  //    this.utilisateur = data;
  //    console.log(data)
  //   })
  // }

}
