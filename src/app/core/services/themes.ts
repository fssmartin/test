// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');  // Tema por defecto
  currentTheme$ = this.themeSubject.asObservable();

  setTheme(theme: string) {
    this.themeSubject.next(theme);  // Cambiar el tema
  }
}
