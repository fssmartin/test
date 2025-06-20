import { ChangeDetectionStrategy, Component, effect, ElementRef,  Input,  Renderer2, signal } from '@angular/core';  
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NULL_USERDATA, UserData } from 'src/app/core/interfaces/user.dto';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: false,
  changeDetection : ChangeDetectionStrategy.OnPush   
})
export class HomeComponent   { 
   
   localDataUser = signal<UserData>(NULL_USERDATA); 
   
  constructor(
    private el: ElementRef, private renderer: Renderer2,
      private router: Router, 
      private _authService: AuthService    
    ){

    effect(() => {
          this.localDataUser.set(this._authService.user()); 
      },{ allowSignalWrites: true });

  }

  ngOnInit(): void {  
    this.renderer.removeClass(document.body, 'noCanvas'); 
  }
  
  goPage(page:string):void{ 
      setTimeout(() => {
        this.router.navigate([page]);
      },200); 
  }
  
  goExit():void{  
      this._authService.logOut();   
      this.router.navigate(['']);      
  }

  

}
