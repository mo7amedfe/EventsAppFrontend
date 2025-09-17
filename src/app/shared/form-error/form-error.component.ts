import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | null;
    @Input() form?: FormGroup | null;
  @Input() mustMatchError?: boolean; 
}
