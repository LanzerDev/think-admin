import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

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


  public getEdad(fecha_nacimiento:any){
    return moment().diff(fecha_nacimiento, 'years')
  }

  
  public removeTask(task:any){

    Swal.fire({
      title: 'Confirmar',
      text: '¿Desea eliminar a este usuario?',
      icon: 'error',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'cancelar'
    }).then(res =>{
      if(res){
        for(let i = 0; i < this.usuarios.length; i++){
          if(task == this.usuarios[i]){
            this.usuarios.splice(i, 1);
            localStorage.setItem("usuarios", JSON.stringify(this.usuarios))
            console.log(this.usuarios)
          }
        }
      }
    })

  }
}
