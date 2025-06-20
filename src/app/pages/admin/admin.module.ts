import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashBoardAdminComponent } from './dashboard/dashboard.component';
 


@NgModule({
  declarations: [  
    DashBoardAdminComponent, 
  ],
  imports: [ 
    CommonModule,    
    AdminRoutingModule, 
    FormsModule, 
    FormsModule,
    ReactiveFormsModule
  ] 
})
export class AdminModule { }