import { Injectable, WritableSignal, signal } from '@angular/core'; 
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
 

import { Language, NULL_LANGUAGE } from '../interfaces/base.dto';

//import { LANGUAGES } from '@mocks/languajes'; 

@Injectable({
  providedIn: 'root'
})
export class GlobalService {  

  MOCK:Boolean = true;

  private language:WritableSignal<Language>       = signal<Language>(NULL_LANGUAGE);
  private languagesAux:WritableSignal<Language[]> = signal<Language[]>([NULL_LANGUAGE]);
	private languages:Language[] = [NULL_LANGUAGE]; 

  isError:string='';
 
	errSubject = new BehaviorSubject<any>("first"); 
	 
	get errConexion$():Observable<any>{
    return this.errSubject.asObservable();
  }
 
  // MOCK JSON
  apiUrl:any =  {
    api         :'./assets/mocks',
    categories  :'/categories.json',
    languages   :'/languajes.json',
    typegames   :'/typegames.json',
    configs     :'/configames.json',
    questions   :'/questions.json',
    users       :'/users.json',
    roles       :'/roles.json',
    scores      :'/scores.json',
    games       :'/games.json'
  }

  
  constructor(   ) {  
      // trim
      if (!String.prototype.trim) {
        (function () { 
          var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
          String.prototype.trim = function () {
            return this.replace(rtrim, "");
          };
        })();
      }   
  }
 
 
  handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {	 
      let miarray:[] = [];  
      console.log("error",error)  
      let resultAux:any = { "error": error.error.error ? error.error.text  : error.error  }
  
			// console.log(`-- Error in -> ${operation}\n-- failed: ${error.message}`)
  
      //LANZO subject del error para el login por ahora..
      this.errSubject.next(error);  

			console.log(`-- Error in -> ${operation}\n-- failed: ${error.name}`)
  

      if(error.name==='HttpErrorResponse')
          return of( 'noconexion' as T);

      if (typeof result == "boolean") {
        return of( result as T);
      }else{
        if( Array.isArray(result) !== Array.isArray(miarray)  ) { 
          return of( resultAux as T);
        }
      }
      
      return of( result as T);
		};
	}	
  
}