import { Component } from '@angular/core';
import { UsliFormFieldComponent, UsliInputComponent } from 'ui-sdk';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-field-docs',
  standalone: true,
  imports: [UsliFormFieldComponent, UsliInputComponent, ReactiveFormsModule],
  templateUrl: './form-field-docs.html',
  styleUrl: './form-field-docs.scss',
})
export class FormFieldDocs {
  protected hintControl = new FormControl('', Validators.required);
  protected floatingControl = new FormControl('');
}
