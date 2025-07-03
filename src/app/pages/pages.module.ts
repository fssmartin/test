import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module'; 
import { TeacherRoutingModule } from './teacher/teacher-routing.module';
import { UserRoutingModule } from './student/user-routing.module';


@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TeacherRoutingModule,
    UserRoutingModule
  ]
})
export class PagesModule { }
