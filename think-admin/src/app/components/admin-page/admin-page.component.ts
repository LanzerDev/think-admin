import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Moment } from 'moment';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, AfterViewInit{
  @ViewChild(DataTableDirective, {static: false}) 
  public datatableElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  
  constructor(private http: HttpClient) {
  }

  public usuarios:Array<any> = [];
  
  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 5,
      ajax: {
          url: 'http://localhost:3000/api/usuarios',
          type: 'GET',
          dataSrc: ""
      },
      columns: [
        {
          title: "nombre",
          data: "nombre"
        },
        {
          title: "apellido1",
          data: "apellido1"
        },
        {
          title: "apellido2",
          data: "apellido2"
        },
        {
          title: "email",
          data: "email"
        },
        {
          title: "telefono",
          data: "telefono"
        },
        {
          title: "genero",
          data: "genero"
        },
        {
          title: "fecha_nacimiento",
          data: "fecha_nacimiento"
        },
        {
          title: "estado",
          data: "estado"
        },
        {
          title: "municipio",
          data: "municipio"
        },
        {
          title: "nivel_estudios",
          data: "nivel_estudios"
        },
        {
          title: "carrera",
          data: "carrera"
        },
        {
          title: "ocupacion",
          data: "ocupacion"
        },
        {
          title: "nivel_ingresos",
          data: "nivel_ingresos"
        },
        {
          title: "estado_civil",
          data: "estado_civil"
        },
        {
          title: "tiene_hijos",
          data: "tiene_hijos"
        },
        {
          title: "tiene_hijos_menores18",
          data: "tiene_hijos_menores18"
        },
        {
          title: "numero_automoviles",
          data: "numero_automoviles"
        },
        {
          title: "tiene_internet",
          data: "tiene_internet"
        },
        {
          title: "numero_personas_hogar",
          data: "numero_personas_hogar"
        },
        {
          title: "numero_personas_trabajaron",
          data: "numero_personas_trabajaron"
        },
      ]
    };
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== $(this).val()) {
            that
              .search($(this).val().toString())
              .draw();

            }
            console.log($(this).val().toString())
        });
      });
    });
  }





  public getUsuarios() {
    if (localStorage.getItem("usuarios") === null) {
      this.usuarios = []
    } else {
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
      cancelButtonText: 'Cancelar',
    }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire({
          icon: 'success',
          title: 'Usuario eliminado',
          confirmButtonText: 'ok',
          timer: 1700,
        });
        for(let i = 0; i < this.usuarios.length; i++){
          if(task == this.usuarios[i]){
            this.usuarios.splice(i, 1);
            localStorage.setItem("usuarios", JSON.stringify(this.usuarios))
            console.log(this.usuarios)
          }
        }
      }
    });
  }
}
