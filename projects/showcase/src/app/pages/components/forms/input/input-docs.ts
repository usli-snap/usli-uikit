import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsliInputComponent } from 'ui-sdk';

@Component({
  selector: 'app-input-docs',
  standalone: true,
  imports: [UsliInputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './input-docs.html',
  styleUrl: './input-docs.scss',
})
export class InputDocs {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      required: new FormControl('', Validators.required),
      minmax: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      formBound: new FormControl('', Validators.required),
      twoWay: new FormControl(''),
      errorEmail: new FormControl('', [Validators.required, Validators.email]),
      disabled: new FormControl({ value: '', disabled: true }),
    });
  }
}
