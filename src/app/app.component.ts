import { Component } from '@angular/core';
import { GlobalService } from './core/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-empresa';
  constructor(
    private _globalService:   GlobalService
  ){
     this._globalService.errSubject.next(''); 
  }
}
