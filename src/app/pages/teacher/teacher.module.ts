import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardTeacherComponent } from './dashboard/dashboard.component';
 


@NgModule({
  declarations: [  
    DashboardTeacherComponent, 
  ],
  imports: [ 
    CommonModule,    
    TeacherRoutingModule, 
    FormsModule, 
    FormsModule,
    ReactiveFormsModule
  ] 
})
export class TeacherModule { }