import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { Observable }     from 'rxjs';
import {LoginService} from 'src/app/services/authServices/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  datepipe: any;
  formLogin!:FormGroup;
  submitted: boolean | undefined;
  message: any;
  constructor(private snackBar:MatSnackBar,private service: LoginService
    , private router:Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  login() {
    // this.message = ''
    console.log(this.formLogin.value)
    this.submitted = true;
    if (this.formLogin.valid) {
      this.service.login(this.formLogin.value)
      .then(res => {
        console.log(res);

        if (res.status = 200) {
            this.snackBar.open('Login Successful','',{duration:1000});
            this.router.navigate(['/home'])
          }
       
        else {
          console.log(res.message)
          this.message = res.message;
          this.snackBar.open('Login error','',{duration:1000})
        }
      })
      

    }
  }
  
    
  }
