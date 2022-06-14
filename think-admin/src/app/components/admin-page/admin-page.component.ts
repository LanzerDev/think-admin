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


  public api = 'http://localhost:3000/';
  ngOnInit(): void {



    this.http.get<any>(this.api+'api/usuarios').subscribe((res:any)=>{
      console.log(res)
    })


    this.dtOptions = {
      pageLength: 5,
      ajax: {
        url: this.api+'api/usuarios',
        type: 'GET',
        dataSrc: ""
      },
      columns: [
        {
          title: "ID",
          data: "id_usuario"
        },
        {
          title: "Nombre(s)",
          data: "Nombre"
        },
        {
          title: "Apellido paterno",
          data: "Apellido_1"
        },
        {
          title: "Apellido materno",
          data: "Apellido_2"
        },
        {
          title: "email",
          data: "Correo"
        },
        {
          title: "Telefono",
          data: "Telefono"
        },
        {
          title: "Genero",
          data: "Genero"
        },
        {
          title: "Fecha de nacimiento",
          data: "Fecha_nacimiento"
        },
        {
          title: "Edad",
          data: "Edad"
        },
        {
          title: "Estado",
          data: "Estado"
        },
        {
          title: "Municipio",
          data: "Municipio"
        },
        {
          title: "Nivel de estudios",
          data: "Nivel_estudios"
        },
        {
          title: "Carrera",
          data: "Carrera_completo"
        },
        {
          title: "Ocupación",
          data: "Ocupacion"
        },
        {
          title: "Nivel de ingresos",
          data: "Ingresos_mensual"
        },
        {
          title: "Estado civil",
          data: "Estado_civil"
        },
        {
          title: "Tiene hijos",
          data: "Tiene_hijos"
        },
        {
          title: "Hijos menores de 18",
          data: "Tiene_hijos_men_18"
        },
        {
          title: "Automoviles hogar",
          data: "Automoviles_hogar"
        },
        {
          title: "Cuenta con internet",
          data: "Internet"
        },
        {
          title: "Numero de personas en el hogar",
          data: "Personas_hogar"
        },
        {
          title: "Numero de personas que trabajaron el ultimo mes",
          data: "Personas_hogar_trabajaron"
        },
        {
          title: "Acciones",
          defaultContent: `<button class="btn btn-danger" id="btn-delete" >Eliminar usuario</button>`
        }
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


  public deleteUser(task: any) {

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
