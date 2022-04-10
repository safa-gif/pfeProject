import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'demoApp';
  email:string | undefined;
  password:string  | undefined;
  remail:string | undefined;
  rpassword:string | undefined;
  rcpassword:string | undefined;
  
  constructor(private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  login(){
    if(this.email=="administrator@gmail.com" && this.password=="admin"){
      this.snackBar.open('Login Successful','',{duration:2000})
  }else{
    this.snackBar.open('Login error','',{duration:1000})
  }
  }
  register(){

  }
}
