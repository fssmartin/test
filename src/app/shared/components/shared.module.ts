import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { LoadingComponent } from './loading/loading.component';
import { IrArribaComponent } from './irarriba/irarriba.component';
 
@NgModule({
  declarations: [  
    LoadingComponent,
    IrArribaComponent
  ],
  imports: [ 
    CommonModule,    
  ],
  exports: [  
    LoadingComponent,
    IrArribaComponent
  ]   
})
export class SharedModule { }
