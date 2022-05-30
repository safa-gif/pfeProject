import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder , } from '@angular/forms';
import { RegisterServiceService } from 'src/app/services/authServices/register/register-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!:FormGroup;
  submitted: boolean | undefined;
  message: any;
  constructor(private service: RegisterServiceService,private snackBar:MatSnackBar, private router: Router) { }
  public ngOnInit(): void {
    this.formRegister = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
    
  }
  register(): void {
    console.log(this.formRegister.value)
    this.submitted = true;

   if(this.formRegister.valid){
     this.service.signup(this.formRegister.value)
      .then(res => {
        console.log(res);
        if (res.status = 201) {
          Swal.fire({
            position : 'center',
              icon : 'success',
              title : 'Your user  has been added successfully',
              showConfirmButton: false,
              timer: 2000
          })
          this.snackBar.open('Register has been  Successful','',{duration:3000});
            this.router.navigate(['/users']) 
          }
      })
   } else {
       Swal.fire(
         {
          position: 'center',
          icon: 'error',
          title : 'Please fill the form ',
          showConfirmButton: false,
          timer: 2000
         }
       )
   }
   
  }
  modifierProfile(){
    
  }
 
}
