import { Component } from '@angular/core'; 

@Component({
  selector: 'app-register',
    standalone: false,
  templateUrl: './register.component.html'
})
export class RegisterComponent {  

  constructor(){    
  }
  

  ngAfterViewInit() { 
  }

  
  passwordShowhide(input: any, eye:string):void {
    var eyeButton = document.querySelector(eye);
    eyeButton!.classList.toggle('fa-eye-slash');     
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
