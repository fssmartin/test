import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardTeacherComponent } from './dashboard/dashboard.component';



const routes: Routes = [ 
    { 
      path: '', component: DashboardTeacherComponent ,
      children: [
        //{ path: '',              component: QuestionsComponent },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }