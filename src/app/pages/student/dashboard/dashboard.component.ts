import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html'
})
export class DashboardUserComponent {

  constructor( 
    private renderer: Renderer2,
    private router: Router) {}

  ngOnInit () { 

    this.renderer.addClass(document.body, 'noCanvas');
    
  }

}