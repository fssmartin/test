import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.page';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent   },   
  { path: 'auth', 
      loadChildren: () => import( './auth/auth.module').then(m => m.AuthModule) 
  }, 
  {
    path: 'admin',
      loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
       canActivate: [AuthGuard] 
  },  
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
