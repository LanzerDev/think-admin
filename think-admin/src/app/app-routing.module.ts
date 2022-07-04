import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { GuardGuard } from './guards/guard.guard';
import { CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch:'full'},
  { path: 'admin', canActivate:[GuardGuard], component: AdminPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'login/admin', canActivate:[GuardGuard], component: AdminPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
