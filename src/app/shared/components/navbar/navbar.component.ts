import { ChangeDetectionStrategy, Component, Input, Signal, SimpleChanges, computed, effect, signal } from '@angular/core'; 
 import Swal from 'sweetalert2'

import { Router } from '@angular/router';

 
import { AuthService } from '../../../core/services/auth.service';

import { NULL_USERDATA, UserData } from '../../../core/interfaces/user.dto';
import { Language, NULL_LANGUAGE } from '../../../core/interfaces/base.dto';
import { ThemeService } from 'src/app/core/services/themes';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html'  ,
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class NavbarComponent  {  
 
  //private isAuthenticated = signal(false);
  timeLeft$:any;
  
  localDataUser = signal<UserData>(NULL_USERDATA); 
  langSelected  = signal<Language>(NULL_LANGUAGE); 

currentTheme: string = 'light';
  
  constructor( 
    private router: Router, 
    private _themeService: ThemeService,
    private _authService:AuthService    
  ) { 
      
    this.timeLeft$ = this._authService.timeLeft;

/*
    effect(() => {
        this.isAuthenticated.set( this._authService.isLoggedIn());      
        console.log("this._authService.isLoggedIn()",this._authService.isLoggedIn())
    },{ allowSignalWrites: true });    
*/
    effect(() => {
        this.localDataUser.set(this._authService.user());
    },{ allowSignalWrites: true });
/*
    effect(() => {
      this.langSelected.set(this._globalService.getLanguage());
    },{ allowSignalWrites: true });    
    */ 
     
  }

  ngOnInit(): void {
    this._themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`);
    });
  }

  // Método para cambiar el tema
  switchTheme(theme: string): void {
    this._themeService.setTheme(theme);
  }

  changeLanguage(lang : string, $event:any){
    $event.preventDefault();  
  }

  login(): void { 
    this._authService.logOut(); 
  }

  logout(){

    const swalWithBootstrapButtons = Swal.mixin({ 
      customClass: {
        confirmButton: "btn btn--success",
        cancelButton:  "btn btn--danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title:'¿Desea cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,  
      focusDeny:true,
      focusConfirm: true,
      focusCancel: false,
      confirmButtonText: 'Si',
      cancelButtonText:  'No',   
      reverseButtons: true, 
    }).then((result:any) => {
      if (result.isConfirmed) { 
        this._authService.logOut(); 
      }
    }); 

  }
 
  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
 
}
