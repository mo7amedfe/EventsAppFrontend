import { AuthService } from './../../../auth.service';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { FormErrorComponent } from "../../../shared/form-error/form-error.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private _AuthService = inject(AuthService);

 
  loginForm = new FormGroup(
    {
      
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
      ]),
    
    },

  );

  submit() {
      console.log(this.loginForm.errors);
    
    if (this.loginForm.valid) {
      console.log(this.loginForm.errors);
      
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res.token);
        },
        error: (err) => console.error(err),
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
