import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public show:any;
  public checked:any = false;
  public type:string = "password"
  constructor(
    private router: Router,
    private authService: AuthService,
    public route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    
    this.show = document.getElementById('show-password');
    this.show.addEventListener('click', (e:any)=>{
      if(this.checked == true){
        this.checked = false;
        this.type = 'password'
      } else{
        this.checked = true;
        this.type = 'text'
      }

    })

    
  }



  public login(form:any){

    this.authService.basicLogin(form).subscribe((res:any)=>{

      if(res.estatus == "0"){
        Swal.fire({
          icon: 'error',
          title:'Ups!',
          text:'Contraseña incorrecta'
        })
      }
      if(res.estatus == "1"){
        Swal.fire({
          icon: 'success',
          title:'Listo!',
          text:`Bienvenido ${form.usuario}!`,
          timer: 1900
        })
        this.authService.setUserLoged(form.usuario)
        setTimeout(()=>{
          this.router.navigate(['admin'], { relativeTo: this.route })
        },2000)
      }
      if(res.estatus == "2"){
        Swal.fire({
          icon: 'error',
          title:'Ups!',
          text:'Este usuario no existe'
        })
      }
    })
  }


}
