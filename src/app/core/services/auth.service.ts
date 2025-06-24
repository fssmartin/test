import { computed, Injectable,signal } from '@angular/core'; 
import {  BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
 
 
import { GlobalService } from './global.service';

import { LoginDto, NULL_ROLE, NULL_USERDATA , RegisterDto, UserData  } from '../interfaces/user.dto'
import { LocalStorageService } from './localstorage.service';
import { LoginResponse } from '../interfaces/token.dto';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

// import { ROLES, USERSADMIN } from '@	mocks/users';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly tokenKey = 'token';
  private readonly expirationKey = 'expiresAt';
  private readonly sessionDuration = 1 * 300 * 1000; // 2 minutos
  private readonly userKey = 'userData';
  private readonly sessionHalf = 20;

  private intervalId: any = null;

  private _timeLeft = signal<number>(0);
  timeLeft = computed(() => this._timeLeft());

  private _expiration = signal<number | null>(null);
  private _user = signal<UserData>(NULL_USERDATA);
  private _loading = signal<boolean>(false);

  expiration = computed(() => this._expiration());
  user = computed(() => this._user());
  loading = computed(() => this._loading());

  constructor(
    private router: Router,    
    private _localStorageService: LocalStorageService
  ) {
    console.log("[constructor AUTH]")
    this.isLocalStorage(); 
  }

  register(userRegister:RegisterDto): void { 
    this._loading.set(true);


    console.log("registeeeeeeeeeeeeeeeeeeeeeeeeer",userRegister)
    let user:UserData = { 
          username:"TREMP1",
          name:  userRegister.name,
          email: userRegister.email,
          id: 1,
          role: NULL_ROLE
    }  

    const data = {
      token: "abc123...",
      expiresIn: 300,
      user: user  
    }
    
    setTimeout(() => {
      this.setUserData(data);
      this._loading.set(false);
    }, 1000);

        /*
     this.http.post<UserTokenDto>(this.url, loginDto).subscribe({
      next: (userToken) => {
        this.setUserData(userToken);
        this._loading.set(false);
      },
      error: (error) => this.loginError.set(error.message),
    });
    */
  }

  login(userLogin:LoginDto): void { 
    
    
    this._loading.set(true);
    
    // data del post
    let user:UserData = { 
          username:"RPEM1",
          name:"Raul Perez Marcos",
          email:"raul.perez@softtek.com",
          id: 1,
          role: {
            id: 1,
            name: "SUPER",
            functionalities: [
              {
                "id": 1,
                "name": "CREATE"
              },
              {
                "id": 2,
                "name": "UPDATE"
              },
              {
                "id": 3,
                "name": "DELETE"
              }
            ]
          }
    }    
    
    const data = {
      token: "abc123...",
      expiresIn: 300,
      user: user  
    }
    
    setTimeout(() => {
      this.setUserData(data);
      this._loading.set(false);
    }, 1000);

    /*
     this.http.post<UserTokenDto>(this.url, loginDto).subscribe({
      next: (userToken) => {
        this.setUserData(userToken);
        this._loading.set(false);
      },
      error: (error) => this.loginError.set(error.message),
    });
    */

    //return of(data.user)

  }

  setUserData(data: any): void { 
    const expiresAt = Date.now() + data.expiresIn * 1000;
    this._localStorageService.set(this.tokenKey, data.token);
    this._localStorageService.set(this.expirationKey, ''+expiresAt);
    this._localStorageService.set(this.userKey, JSON.stringify(data.user));
    this._expiration.set(expiresAt);
    this._user.set(data.user);
    this.startCountdown();
  }

  isLocalStorage(): void {  
    const storedUser     = this._localStorageService.get(this.userKey);
    const tokenUser      = this._localStorageService.get(this.tokenKey);
    let expiresAtUser    = this._localStorageService.get(this.expirationKey);
 
    if (storedUser && tokenUser) { 
        const user: UserData = JSON.parse(storedUser);
        const token = tokenUser;
        const expiresAt:number = expiresAtUser === null ? 0 : parseInt(expiresAtUser)
        this._user.set(user);
        this._expiration.set( expiresAt  ) ;
        this.startCountdown();
    }
  }  

  renewSession(): void {
    const newExpiration = Date.now() + this.sessionDuration;
    this._localStorageService.set(this.expirationKey, newExpiration.toString());
    this._expiration.set(newExpiration);
  } 

  logOut(): void {
    clearInterval(this.intervalId);
     this._timeLeft.set(0);
    this._localStorageService.remove(this.tokenKey);
    this._localStorageService.remove(this.expirationKey);
    this._localStorageService.clean();
    this._expiration.set(null);
    this._user.set(NULL_USERDATA);
    this.router.navigate(['/auth']);
  }

  reset$(data:any):Observable<boolean>{

    
      console.log("Enviando correo...",data)
      this._loading.set(false);
      return of(true); 

  }

  private loadSession(): void {
    const stored = this._localStorageService.get(this.expirationKey);
    console.log("[loadSession]",stored)
    if (stored) { 
      this._expiration.set(+stored);
    }else{
      this.router.navigate(['/auth']);
    }
  }

  isLoggedIn(): boolean {
    console.log("[isLoggedIn]",!!this._localStorageService.get(this.tokenKey))
    return !!this._localStorageService.get(this.tokenKey);
  }  

  private startCountdown() { 
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      const expiresAt = this._expiration(); 
      if (expiresAt) {
        const now = Date.now();
        const timeLeft = Math.max(0, expiresAt - now);
        this._timeLeft.set(timeLeft);
        if (timeLeft === 0) {
          this.showModalOut()
        } else if (Math.trunc(timeLeft/1000) === this.sessionHalf) {
          this.showModalCasi()
        }
        
      }
    }, 1000); // cada segundo
  }

  private showModalCasi(){
  
    const swalWithBootstrapButtons = Swal.mixin({ 
      customClass: {
        confirmButton: "btn btn--success",
        actions: 'center',
        htmlContainer:'left ft-size14'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title:'!Session a punto de caducar¡',
      icon: 'warning',
      html: "<br>Su sesión  va a caducar por Inactivad<br>Pulse el boton si quiere mantener la session actual",
      focusConfirm: true,
      confirmButtonText: 'Aceptar',  
      reverseButtons: true, 
    }).then((result:any) => {
      if (result.isConfirmed) {  
          this.renewSession();
      }
    });
  }

  private showModalComun():string{
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour12: false });
  }  

  private showModalOut(){
    
    const hora:string = this.showModalComun();

    const swalWithBootstrapButtons = Swal.mixin({ 
      customClass: {
        confirmButton: "btn btn--success",
        actions: 'center',
        htmlContainer:'left ft-size14'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title:'!Tu sesión ha caducado¡',
      icon: 'warning',
      html: "<br>Su sesión ha caducado a las <strong>" + hora + "</strong><br> Pulsa en Aceptar para iniciar sesión de nuevo<br><br>",
      focusConfirm: true,
      confirmButtonText: 'Aceptar',  
      reverseButtons: true, 
    }).then((result:any) => {
      if (result.isConfirmed) {  
          this.logOut(); 
      }
    });
  }

}
function off(arg0: string): Observable<boolean> {
  throw new Error('Function not implemented.');
}

