import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder , } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterServiceService } from 'src/app/services/authServices/register/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string | undefined;
  password:string  | undefined;
  username : string | undefined;
  formLogin!: FormGroup;
  constructor(private service: RegisterServiceService) { }
  public ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  register(): void {
   
  }
 
}
