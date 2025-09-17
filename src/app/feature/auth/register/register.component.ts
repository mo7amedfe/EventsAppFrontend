import { AuthService } from './../../../auth.service';
import { Component } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from "../../../shared/form-error/form-error.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private theme: ThemeService, private _AuthService:AuthService) {}


  MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const group = formGroup as any;
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) return null;

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) return null;

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        if (matchingControl.errors && matchingControl.errors['mustMatch']) {
          const { mustMatch, ...rest } = matchingControl.errors;
          matchingControl.setErrors(Object.keys(rest).length ? rest : null);
        }
        return null;
      }
    };
  }

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
      ]),
      role: new FormControl('', Validators.required),
    },
    { validators: this.MustMatch('password', 'rePassword') }
  );



  submit() {
    console.log(this.registerForm.errors);
    
  this._AuthService.register(this.registerForm.value).subscribe({
    next(value) {
        console.log(value);
        
    },
  })
  }
}
