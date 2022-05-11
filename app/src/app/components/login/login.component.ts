import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { Observable }     from 'rxjs';


import {LoginService} from 'src/app/services/authServices/login/login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // email:string | undefined;
  // password:string  | undefined;
  // datepipe: any;
  formLogin!:FormGroup;
  submitted: boolean | undefined;
  message: any;
  constructor(private snackBar:MatSnackBar,private service: LoginService
    , private router:Router) { }

  ngOnInit(): void {
    // const timer = new Date();
    // const weekYear = this.datepipe.transform(timer, 'w')
    //        window.alert("this is the test"+weekYear)
    this.formLogin = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
 onClickSubmit(formData: { email: string; password: string; }){
  console.log(' User Effected Patient name is : ' + formData.email);
  console.log('Coronal Effected Patient age is : ' + formData.password);
 }
  // login()
  // {
      
  //     if(this.email=="administrator@gmail.com" && this.password=="admin")
  //     {
  //       this.snackBar.open('Login Successful','',{duration:1000});
  //       this.router.navigate(['/home']);

  //     }
  //     else
  //     {
  //       this.snackBar.open('Login error','',{duration:1000})
  //     }
  // }
  // login() {
  //   this.message = ''
  //   console.log(this.formLogin.value)
  //   this.submitted = true;
  //   if (this.formLogin.valid) {
  //     this.service.login(this.formLogin.value)
      
  //         this.res =>{

  //       if (res.status === 'OK') {
  //           this.router.navigate(['/home'])
  //         }
       
  //       else {
  //         console.log(res.message)
  //         this.message = res.message;
  //       }
  //     }
    
  //   }
  login() {
    this.message = ''
    console.log(this.formLogin.value)
    this.submitted = true;
    if (this.formLogin.valid) {
      this.service.login(this.formLogin.value)
      .then(res => {
        console.log(res);

        if (res.message == 'User Logged') {
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
  
    // console.log(this.formLogin.value)
    // this.submitted = true;
    // if (this.formLogin.valid) {
    //   this.serv.Login(this.formLogin.value).then(res => {
    //     console.log(res);

    //     if (res.status === 'OK') {
    //         this.router.navigate(['/dashboard'])   
    //     }
    //     else {
    //       console.log(res.message)
    //       this.message = res.message;
    //     }
    //   })

    // }
  }

// }
