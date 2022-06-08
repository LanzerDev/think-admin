import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor() { }

  public usuarios:Array<any> = [];
  
  ngOnInit(): void {
    this.getUsuarios()
  }


  public getUsuarios() {
    if (localStorage.getItem("usuarios") === null) {
      this.usuarios = []
    } else {
      console.log('si')
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
    }
  }

}
