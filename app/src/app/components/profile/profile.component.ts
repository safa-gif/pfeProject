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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user = {
  //  _id: '',
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
   // let id = localStorage.getItem('id')
   // console.log(id);

 
    this.findAll();
    this.service.count().subscribe((dta: any)=> {
      this.utilisateur = dta;
     });
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
    console.log(this.Users)
          
  }
  

//  onupdate(): void {
//    let id = localStorage.getItem('id')
  
//   console.log(id)
//   this.data = {
//    username : this.basicForm.value.username,
//    email : this.basicForm.value.email,
   
//   }
//    this.service.updateUser(id,this.data).subscribe(response =>{
//     console.log(response);
//     console.log("response ",response);
  
//   })
// }

// getIdUser() {
 
//   if(!true) {
//     this.service.getSingleUser(this.id).subscribe(resp => {
//       console.log(resp);
//       console.log("response ",resp)
//        console.log(id)
//      })
//      Swal.fire( {
//       position : 'center',
//       icon : 'success',
//       title : 'Your user  has been added successfully',
//       showConfirmButton: false,
//       timer: 2000
//     })
//   }
//   else {
//     Swal.fire( {
//       position : 'center',
//       icon : 'warning',
//       title : 'Your have a problem somewhere',
//       showConfirmButton: true,
//       timer: 2000
//     })
//   }
   
// }
//  getIdUserD(id:string) {
//    this.service.deleteUser(this.id).subscribe(res => {
//      console.log(res)
    
//    })
//  }
//  modifier() {
//   if(!true) {
//      Swal.fire( {
//       position : 'center',
//       icon : 'success',
//       title : 'Your  modification  has been added successfully',
//       showConfirmButton: false,
//       timer: 2000
//     })
//   }
//   else {
//     Swal.fire( {
//       position : 'center',
//       icon : 'warning',
//       title : 'Your have a problem somewhere',
//       showConfirmButton: false,
//       timer: 2000
//     })
//   }
   
//  }
}


