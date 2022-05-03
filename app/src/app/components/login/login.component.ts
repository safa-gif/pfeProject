import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string | undefined;
  password:string  | undefined;

  
  constructor(private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }
  login()
  {
      
      if(this.email=="administrator@gmail.com" && this.password=="admin")
      {
        this.snackBar.open('Login Successful','',{duration:1000});
        this.router.navigate(['/home']);
            
      }
      else
      {
        this.snackBar.open('Login error','',{duration:1000})
      }
  }

}
