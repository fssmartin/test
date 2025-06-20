import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module'; 
import { TeacherRoutingModule } from './teacher/teacher-routing.module';
import { StudentRoutingModule } from './student/student-routing.module';


@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TeacherRoutingModule,
    StudentRoutingModule
  ]
})
export class PagesModule { }
