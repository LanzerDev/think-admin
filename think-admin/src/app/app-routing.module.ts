import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { GuardGuard } from './guards/guard.guard';
import { CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full' },
  { path: 'login', component: LoginComponent},
  { path: 'login/admin', canActivate:[GuardGuard], component: AdminPageComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
