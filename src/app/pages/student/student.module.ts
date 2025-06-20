import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DashboardStudentComponent } from './dashboard/dashboard.component';
import { StudentRoutingModule } from './student-routing.module';


@NgModule({
  declarations: [  
    DashboardStudentComponent, 
  ],
  imports: [ 
    CommonModule,    
    StudentRoutingModule, 
    FormsModule, 
    FormsModule,
    ReactiveFormsModule
  ] 
})
export class StudentModule { }