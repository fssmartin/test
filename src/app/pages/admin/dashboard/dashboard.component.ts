import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core'; 
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UserData } from 'src/app/core/interfaces/user.dto';
import { AuthService } from 'src/app/core/services/auth.service';
 

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
})
export class DashBoardAdminComponent {   
 
  //user:UserData = this._authService.user();
  isMenuOpen: boolean = false; // Estado inicial del menú (cerrado)

  @ViewChild("preguntas") preguntas!: ElementRef; 

  public subscriber: Subscription | undefined;
    
  constructor(
    private _authService:AuthService,
    private renderer: Renderer2,
    private router: Router) {}

  ngOnInit () {

    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => { 
      console.log("event['url']",event['url'])      
      this.renderer.addClass(this.preguntas.nativeElement, "active");
     
    });

    this.renderer.addClass(document.body, 'noCanvas');
    
  }


  ngAfterViewInit() {
    let url = this.router.url; 
    console.log("url",url)    
 
        this.renderer.addClass(this.preguntas.nativeElement, "active");

  }
 
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeClassActive(): void {
    this.renderer.removeClass(this.preguntas.nativeElement, "active");
  }
}