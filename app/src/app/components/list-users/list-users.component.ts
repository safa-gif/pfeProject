import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { LoginService } from 'src/app/services/authServices/login/login.service';
import Swal from 'sweetalert2';
import {User} from 'src/app/donnees/User';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder,Validators ,FormGroup } from '@angular/forms';



@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  table!:any;
  id: string | undefined;
  user = {
   // id: '',
    username : '',
    email : '',
    password : '',
  }
  utilisateur!: number;
   Users :User[] | undefined;
  public users:any;
  public data:any ;
   public basicForm!: FormGroup;

  constructor(private service: LoginService, private breakpointObserver: BreakpointObserver,
    private router:Router,
    private formbuilder:FormBuilder) { }
  
   ngOnInit(): void {
   
    
    this.service.count().subscribe((dta: any)=> {
      this.utilisateur = dta;
     });
    this.findAll() 
    
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

  // getIdUser(idButton:any){
  //   let button = document.getElementById(idButton);
  //   console.log(idButton);
  //   localStorage.setItem("id",idButton);
  //   this.router.navigate(['/profile'])
   
  // }
 


    // this.service.getSingleUser(id).subscribe(resp => {
    //   document.getElementById()
    //   console.log(resp);
    //   console.log("response ",resp)
    //    console.log(id)
    
        
    //   }
    //  })
    //  Swal.fire( {
    //   position : 'center',
    //   icon : 'success',
    //   title : 'Your user  has been added successfully',
    //   showConfirmButton: false,
    //   timer: 2000
    // })
   

  //   update(idModal:any,idButton :any,role :any,adminId :any,userId:any): void{
     
  //      let button=document.getElementById(idButton);
  //     // button.setAttribute("data-target","#b"+idModal);
  
  //  }
  

 deleteUser(id:any){
  if(confirm('are you sure you want to delete this user ?')){
  let users =document.getElementById(id);
  // console.log(this.table.children[1].removeChild(user))
  console.log(id);
  this.service.deleteUser(id).subscribe(response => {
    this.users = this.users.filter((item: { id: any; }) => item.id !== id);
    
    // this.users = this.users.filter((item: { _id: any; }) => item._id !== _id);
    console.log(response)
    Swal.fire({
      position : 'center',
          icon : 'success',
          title : 'Your user has been deleted  successfuly',
          showConfirmButton: false,
          timer: 2000
    })
  });
  
}
}
 addUser() {
   this.router.navigate(['/register'])
 }


 onupdate(id :any): void {
  let User = document.getElementById(id); 
this.data ={

  username:this.basicForm.value.username,
 email: this.basicForm.value.email,
 
    }
    console.log(id)
    this.service.updateUser(id,this.data).subscribe(response =>{
      console.log(response);
      console.log("response ",response);
      //this.projets=[response,...this.projets];


    })
}

















}