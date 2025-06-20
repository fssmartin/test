import { Component, Renderer2, computed, effect, signal } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { Subject, take, takeUntil, tap } from 'rxjs';
import { UserData } from '../../core/interfaces/user.dto';
import { GlobalService } from '../../core/services/global.service';
import { AuthService } from '../../core/services/auth.service';
 

@Component({
  selector: 'app-forget',
  standalone: false,
  templateUrl: './forget.component.html' 
})
export class ForgetComponent { 
  
  destroy$ = new Subject();
  
  isError:boolean  = false;
  disabled:string = '';
  loading:boolean  = true; 

  isAuthenticated = signal(false); 

  constructor(private router: Router, 
    private _authService: AuthService,
    private _globalService:GlobalService, 
    private renderer: Renderer2, ){  
 
  }

  ngOnInit(){
  }
   
  reset():void{ 

      const email = (document.getElementById('emailForm') as HTMLInputElement); 

      this.loading = true; 

      if(email.value.trim() === "") {
          this.isError = true; 
          this.loading = false; 
      }else{ 
          this.isError = false;  
/*
          this._authService.reset$(email.value.trim())
          .subscribe(
            (response: any) => {   
              this.loading = false;
              
               console.log("response__",response)
               
              this.router.navigate(['/home']);     
            } 
          ); 
  */
 this.router.navigate(['/home']);     

      }
  }


  ngOnDestroy():void { 
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
