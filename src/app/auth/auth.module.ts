import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { ForgetComponent } from './register/forget.component';
import { SharedModule } from '../shared/components/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    //ForgetComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
