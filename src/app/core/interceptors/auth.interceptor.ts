import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private _localStorageService:LocalStorageService 
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    let localUser:any= '';
    let request = req; 
    const localUserToken = this._localStorageService.get('userData')!; 
    if(localUserToken){
        localUser = JSON.parse(localUserToken)
        request = req.clone({
            setHeaders: {
                Authorization: localUserToken ? `Bearer ${ localUser.token }` : '',
                'Content-Type':'application/json; charset=utf-8',
                Accept: 'application/json', 
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'                
            }
        });
    }else{
      console.log("[NO USER TOKEN]")
    }
  
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        console.log("err.status__",err.status)

        if (err.status === 401) {
          console.log("401_________________________________")
          this.router.navigateByUrl('/');
        }

        return throwError( err );

      })
    );
  }

}