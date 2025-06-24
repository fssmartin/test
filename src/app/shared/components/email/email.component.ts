import { Component, Input } from '@angular/core';
import { FormControl, FormGroup,  } from '@angular/forms';

@Component({
  selector: 'app-email',
  standalone: false, 
  templateUrl: './email.component.html'
})
export class EmailComponent {

  @Input() form!: FormGroup;  
  isFocused = false;

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false; 
    return control.invalid && (this.isFocused || control.touched || control.dirty);
  }

  passwordShowhide(input: any, eyeClass: string): void {
    const eyeButton = document.querySelector(eyeClass); 
    input.type = input.type === 'email' ? 'text' : 'email';
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
    const control = this.emailControl;
    if (control) {
      control.markAsTouched();
    }
  }

  get emailControl() {
    return this.form.get('email');
  }
  
}
