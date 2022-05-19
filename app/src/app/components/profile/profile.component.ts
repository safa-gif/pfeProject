import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/authServices/login/login.service';
import {User} from 'src/app/donnees/User';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  username :string | undefined;
  email: string | undefined;
  public data:any ;
 public basicForm!:FormGroup;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  utilisateur: any;
    x!:number;
    Users :User[] | undefined 
    id!: string
  constructor(private toastr: ToastrService, private service: LoginService,
    private formbuilder:FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private snackBar:MatSnackBar,private router:Router) { }
    
  ngOnInit(): void {
    this.findAll();
    this.service.count().subscribe((dta: any)=> {
      this.utilisateur = dta;
     })
    //  let button=document.getElementById(btnAlter);
    //  this.onupdate(id:string);
  }
  
  findAll() {
    const res = this.service.findAll();
     res.subscribe((data: any)=> {
       console.log(data)
       let t: any[] | undefined = []
       data.forEach((el: any)=>{
         Object(t).push(el)
       })
       this.Users = t;
     })
          
  }
  

 onupdate(id: string): void {
  this.data ={
   username : this.basicForm.value.username,
   email : this.basicForm.value.email,
    }
    console.log(id)
    // console.log(data)
 
   this.service.updateUser(id,this.data).subscribe(response =>{
    console.log(response);
    console.log("response ",response);
  
  })
}
getIdUser(id:string) {
   this.service.getSingleUser(this.id).subscribe(response => {
    console.log(response);
    console.log("response ",response)
     console.log(id)
   })
}

  
}


