import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardUserComponent } from './dashboard/dashboard.component'; 
import { UserComponent } from './user/user.component';

const routes: Routes = [  
    { 
      path: '', component: DashboardUserComponent ,
      children: [
      { path: '', component: UserComponent },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }