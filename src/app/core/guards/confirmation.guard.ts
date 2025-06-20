import { HostListener, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs'; 
// import {QuestionnaireComponent} from '../../../questionnaire/questionnaire.component';
// import {ConfirmationDialogService} from '../../../modal/confirmation-dialog.service';


@Injectable({
  providedIn: 'root'
})

export class ConfirmationGuard implements  CanDeactivate<any> {


// constructor(private app: ConfirmationDialogService){
// }

  canDeactivate(): Observable<boolean> | boolean  {
//     if (this.app.changesMade) {
//       const subject = new Subject<boolean>();
//       this.app.showConfirmationDialog(true);
//       this.app.confirmationResult.subscribe((result: boolean) => {
//         if (result) {
//           subject.next(true);
//         } else {
//           subject.next(false);
//         }
//       });
//       return this.app.confirmationResult.asObservable();
//     } else {
//       return true;
//     }
  }
}
