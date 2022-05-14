import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder , } from '@angular/forms';
import { RegisterServiceService } from 'src/app/services/authServices/register/register-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!:FormGroup;
  submitted: boolean | undefined;
  message: any;
  // user = {
  //   username : '', 
  //   email : '',
  //   password : '',
  // };
  // email:string | undefined;
  // password:string  | undefined;
  // username : string | undefined;
  // formLogin!: FormGroup;
  constructor(private service: RegisterServiceService,private snackBar:MatSnackBar, private router: Router) { }
  public ngOnInit(): void {
    this.formRegister = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
    // this.register();
  }
  register(): void {
    console.log(this.formRegister.value)
    this.submitted = true;

   if(this.formRegister.valid){
     this.service.signup(this.formRegister.value)
      .then(res => {
        console.log(res);
        if (res.message = 'Error registering user') {
            this.snackBar.open('Login Successful','',{duration:1000});
            this.router.navigate(['/profile'])
          }
        else {
          this.snackBar.open('Register has been  Successful','',{duration:1000});
            this.router.navigate(['/profile'])
          
        }
      })
   } else {
     console.log('the form is not valid!!!')
   }
   
  }
  modifierProfile(){
    
  }
 
}
