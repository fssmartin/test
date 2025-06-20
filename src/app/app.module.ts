import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { SharedModule } from './shared/components/shared.module';

import { AppComponent }    from './app.component';
import { HomeComponent }   from './pages/home/home.page';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

import { AuthInterceptorService } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
