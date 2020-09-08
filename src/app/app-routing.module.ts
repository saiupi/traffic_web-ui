import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/login/login.component';
 

const routes: Routes = [
  { path:'', redirectTo:'/auth', pathMatch:'full' },
  { path:'home', loadChildren:() => import('./home/home.module').then(m => m.HomeModule) },
  { path:'auth', loadChildren:() => import('./core/core.module').then(m => m.CoreModule) },
  { path:'**', loadChildren:() => import('./core/core.module').then(m => m.CoreModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
