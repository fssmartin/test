import { Component, Input } from '@angular/core';
import { FormControl, FormGroup,  } from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: false, 
  templateUrl: './password.component.html'
})
export class PasswordComponent {

  @Input() form!: FormGroup; 
  @Input() includeConfirm: boolean = false;

  isFocused = false;

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false; 
    return control.invalid && (this.isFocused || control.touched || control.dirty);
  }

  passwordShowhide(input: any, eyeClass: string): void {
    const eyeButton = document.querySelector(eyeClass);
    eyeButton?.classList.toggle('fa-eye-slash');
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
    this.passwordControl?.markAsTouched();
    this.confirmPasswordControl?.markAsTouched();
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get confirmPasswordControl() {
    return this.form.get('confirmPassword');
  }
}
