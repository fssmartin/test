import { Component, Renderer2, computed, effect, signal } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { Subject, take, takeUntil, tap } from 'rxjs';
import { UserData } from '../../core/interfaces/user.dto';
import { GlobalService } from '../../core/services/global.service';
import { AuthService } from '../../core/services/auth.service';
 

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html' 
})
export class LoginComponent { 
  
  destroy$ = new Subject();
  
  isError:boolean  = false;
  disabled:string = '';
  loading:boolean  = true; 

  isAuthenticated = signal(false); 

  constructor(private router: Router, 
    private _authService: AuthService,
    private _globalService:GlobalService, 
    private renderer: Renderer2, ){  

    this.disabled = ''; 

    // observable ERROR conexion !    
    /*
    this._authService.isLocalStorage();  

    this._globalService.errConexion$
    .subscribe(
      (error:any) =>{ 
        console.log("[entro______________________________]",error)
        this.disabled = error; 
        if(error!='first')
          this.loading = false;
      }
    );*/

    effect(() => { 
      
      if( this._authService.isLoggedIn()) {
        console.log("voy a la home")
            this.router.navigate(['/home']);   
      }      

    },{ allowSignalWrites: true }); 


  }


  ngOnInit(){

    this.renderer.removeClass(document.body, 'noCanvas');

    // si estoy logado .. paso a la home
    // this._authService.isLoggedIn$().pipe(
    //     takeUntil(this.destroy$),
    //     take(1), 
    //     tap(loggedIn => {  
    //         console.log("isLoggedIn$___",loggedIn)
    //         if (loggedIn) this.router.navigate(['home']);
    //     })
    //   ).subscribe();  
 
  }
   
  
  passwordShowhide(input: any, eye:string):void {
    var eyeButton = document.querySelector(eye);
    eyeButton!.classList.toggle('fa-eye-slash');     
    input.type = input.type === 'password' ? 'text' : 'password';
  }
 

  login():void{ 

      const email = (document.getElementById('emailForm') as HTMLInputElement);
      const clave = (document.getElementById('password') as HTMLInputElement);

      this.loading = true; 

      if ( (email.value.trim() === "") || (clave.value.trim() === "")   ) {
          this.isError = true; 
          this.loading = false; 
      }else{ 
          this.isError = false;  
          this._authService.login$(email.value.trim() ?? "", clave.value.trim() ?? "")
          .subscribe(
            (response: any) => {   
              this.loading = false;
               console.log("response__",response)
              this.router.navigate(['/home']);     
            } 
          ); 
  

      }
  }


  ngOnDestroy():void { 
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
