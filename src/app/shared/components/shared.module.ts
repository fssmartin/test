import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { LoadingComponent } from './loading/loading.component';
import { IrArribaComponent } from './irarriba/irarriba.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './password/password.component';
import { EmailComponent } from './email/email.component';
 
@NgModule({
  declarations: [      
    LoadingComponent,
    IrArribaComponent, 
    PasswordComponent,
    EmailComponent
  ],
  imports: [ 
    CommonModule,    
    ReactiveFormsModule
  ],
  exports: [  
    PasswordComponent,
    EmailComponent,
    LoadingComponent,
    IrArribaComponent
  ]   
})
export class SharedModule { }
