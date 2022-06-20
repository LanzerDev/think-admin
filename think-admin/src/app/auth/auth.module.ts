import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarClosesesionComponent } from '../components/navbar-closesesion/navbar-closesesion.component';

@NgModule({
  declarations: [
    LoginComponent,
    NavbarClosesesionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],

})
export class AuthModule { }
