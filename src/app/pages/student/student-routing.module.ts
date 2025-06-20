import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardStudentComponent } from './dashboard/dashboard.component'; 

const routes: Routes = [  
    { 
      path: '', component: DashboardStudentComponent ,
      children: [
      //  { path: '', component: DashStudentComponent },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }