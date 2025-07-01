import { Component } from '@angular/core';
import { GlobalService } from './core/services/global.service';
import { ThemeService } from './core/services/themes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-empresa';

  currentTheme: string = 'light';

  constructor(
    private _themeService: ThemeService,
    private _globalService:   GlobalService
  ){
     this._globalService.errSubject.next(''); 
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











}
