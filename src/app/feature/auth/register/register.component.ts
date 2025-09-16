import { Component } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    constructor(private theme: ThemeService) {
  }

  registerForm= new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });


  submit(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      console.log("Form is not valid");
    }
  }
}
