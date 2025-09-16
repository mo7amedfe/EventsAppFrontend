import { Component } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    constructor() {
  }

  loginForm= new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });


  submit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      console.log("Form is not valid");
    }
  }
}


