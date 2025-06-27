import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { ForgetComponent } from './register/forget.component';
import { SharedModule } from '../shared/components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetComponent } from './forget/forget.component'; 
import { ChangeComponent } from './change/change.component';


@NgModule({
  declarations: [ 
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    ChangeComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
