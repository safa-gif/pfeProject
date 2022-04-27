import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Output() sendLoginForm = new EventEmitter<void>();
  // public form!: FormGroup;
  // public flatlogicEmail = 'admin@flatlogic.com';
  // public flatlogicPassword = 'admin';
  constructor() { }
  public ngOnInit(): void {
    // this.form = new FormGroup({
    //   email: new FormControl(this.flatlogicEmail, [Validators.required, Validators.email]),
    //   password: new FormControl(this.flatlogicPassword, [Validators.required])
    // });
  }

  // public login(): void {
  //   if (this.form.valid) {
  //     this.sendLoginForm.emit();
  //   }
  // }
 
}
