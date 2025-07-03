import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DashboardUserComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module'; 


@NgModule({
  declarations: [  
    DashboardUserComponent 
  ],
  imports: [ 
    CommonModule,    
    UserRoutingModule, 
    FormsModule, 
    FormsModule,
    ReactiveFormsModule
  ] 
})
export class StudentModule { }