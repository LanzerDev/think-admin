import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Moment } from 'moment';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  public datatableElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};

  constructor(
    private http: HttpClient,
    public _usuariosService: UsuariosService,
  ) {

  }

  public usuarios: Array<any> = [];
  public edad:any;
  ngOnInit(): void {
    this.edad = "19";
    this.http.get<any>('http://localhost:3000/api/usuarios').subscribe((res:any)=>{
      console.log(res)
    })


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
          data: "Nombre"
        },
        {
          title: "apellido1",
          data: "Apellido_1"
        },
        {
          title: "apellido2",
          data: "Apellido_2"
        },
        {
          title: "email",
          data: "Correo"
        },
        {
          title: "telefono",
          data: "Telefono"
        },
        {
          title: "genero",
          data: "Genero"
        },
        {
          title: "fecha_nacimiento",
          data: "Fecha_nacimiento"
        },
        {
          title: "Edad",
          data: "Edad"
        },
        {
          title: "estado",
          data: "Estado"
        },
        {
          title: "municipio",
          data: "Municipio"
        },
        {
          title: "nivel_estudios",
          data: "Nivel_estudios"
        },
        {
          title: "carrera",
          data: "Carrera_completo"
        },
        {
          title: "ocupacion",
          data: "Ocupacion"
        },
        {
          title: "nivel_ingresos",
          data: "Ingresos_mensual"
        },
        {
          title: "estado_civil",
          data: "Estado_civil"
        },
        {
          title: "tiene_hijos",
          data: "Tiene_hijos"
        },
        {
          title: "tiene_hijos_menores18",
          data: "Tiene_hijos_men_18"
        },
        {
          title: "numero_automoviles",
          data: "Automoviles_hogar"
        },
        {
          title: "tiene_internet",
          data: "Internet"
        },
        {
          title: "numero_personas_hogar",
          data: "Personas_hogar"
        },
        {
          title: "numero_personas_trabajaron",
          data: "Personas_hogar_trabajaron"
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


  public getEdad(fecha_nacimiento: any) {
    return moment().diff(fecha_nacimiento, 'years')
  }


  public removeTask(task: any) {

    Swal.fire({
      title: 'Confirmar',
      text: '¿Desea eliminar a este usuario?',
      icon: 'error',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario eliminado',
          confirmButtonText: 'ok',
          timer: 1700,
        });
        for (let i = 0; i < this.usuarios.length; i++) {
          if (task == this.usuarios[i]) {
            this.usuarios.splice(i, 1);
            localStorage.setItem("usuarios", JSON.stringify(this.usuarios))
            console.log(this.usuarios)
          }
        }
      }
    });
  }
}
