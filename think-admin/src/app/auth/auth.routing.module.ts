import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { LoginComponent } from '../components/login/login.component';
import { GuardGuard } from '../guards/guard.guard';
import { CanActivate } from '@angular/router';


const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'login/admin', canActivate:[GuardGuard], component: AdminPageComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
