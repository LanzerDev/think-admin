import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.loged()
  }

  public isloged:any;

  public cerrarSesion(){
    this.authService.cerrarSesion()
    this.router.navigate(['/login'])
   // location.reload()
  }

  public loged(){
    this.isloged = this.authService.getUserLoged()
    return this.loged;
  }


}
