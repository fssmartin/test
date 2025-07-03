import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

import { DashBoardAdminComponent } from "./dashboard/dashboard.component";
import { QuestionsComponent } from './questions/questions.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GraficasComponent } from './graficas/graficas.component';


const routes: Routes = [  
    { 
      path: '', component: DashBoardAdminComponent ,
      children: [
        { path: '',              component: QuestionsComponent },
        { path: 'configuration', component: ConfigurationComponent },
        { path: 'users',         component: UsersComponent },
        { path: 'questions',     component: QuestionsComponent },
        { path: 'grafics',       component: GraficasComponent },
        { path: 'categories',    component: CategoriesComponent },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }