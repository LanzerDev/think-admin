import { AfterViewInit, Component, Inject, OnInit, ViewChild, TemplateRef} from '@angular/core';
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


  public dtOptions: any = {};

  constructor(
    private http: HttpClient,
    public _usuariosService: UsuariosService,
  ) {

  }



  public usuarios: Array<any> = [];


  public api = 'https://formularioapi.shop/';
  ngOnInit(): void {



    this.http.get<any>(this.api + 'api/usuarios').subscribe((res: any) => {
      console.log(res)
    })


    const self = this;
    this.dtOptions = {
      pageLength: 5,
      ajax: {
        url: this.api + 'api/usuarios',
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
          title: "Comentarios del administrador",
          data: "Comentarios"
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

  public getEdad(fecha_nacimiento: any) {
    return moment().diff(fecha_nacimiento, 'years')
  }

  public id_eliminar: any;
  public inputDelete(e: any) {
    this.id_eliminar = e.target.value
  }

  public nombre_user: any = "";
  public apellido_user: any = "";
  public correo_user: any = "";
  public comentarios: any = "";

  public usuario_comentario: any;
  public mostrarUsuario(e: any) {
    this.usuario_comentario = e.target.value;
    this._usuariosService.getUser(e.target.value).subscribe((res: any) => {
      if (res.usuario.length > 0) {
        this.nombre_user = res.usuario[0].Nombre;
        this.apellido_user = res.usuario[0].Apellido_1;
        this.correo_user = res.usuario[0].Correo;
        this.comentarios = res.usuario[0].Comentarios;
      } else {
        this.nombre_user = "";
        this.apellido_user = "";
        this.correo_user = "";
        this.comentarios = "";
      }
    })
  }

  public comentario_value: any;
  public comentario_request = {
    "Comentarios": ""
  }
  public guardarComentario() {
    this.comentario_value = document.getElementById('comentario-box');
    this.comentario_request.Comentarios = this.comentario_value.value;
    this._usuariosService.saveComentario(this.usuario_comentario, this.comentario_request).subscribe((res: any) => {
      if(res.message){
        Swal.fire({
          icon: 'success',
          title: 'Listo!',
          text: `Comentario guardado`,
          confirmButtonText: 'ok',
          timer: 2000
        })
        setTimeout(()=>{
          location.reload()
        },2100)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: `Ocurrio un error`,
          confirmButtonText: 'ok',
        })
      }
    })
  }


  public nombre_del: any;
  public apellido1_del: any;
  public apellido2_del: any;
  public id_buscar: any;

  public getUsers(callback: any) {
    this._usuariosService.getUser(this.id_eliminar).subscribe((res: any) => {
      if (res.usuario.length > 0) {
        this.nombre_del = res.usuario[0].Nombre;
        this.apellido1_del = res.usuario[0].Apellido_1;
        this.apellido2_del = res.usuario[0].Apellido_2;
        callback(this.nombre_del, this.apellido1_del, this.apellido2_del)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Este usuario no existe',
          confirmButtonText: 'ok',
          timer: 1700,
        });
      }
    })
  }

  public deleteUser() {
    this.getUsers((nombre: any, apellido1_del: any, apellido2_del: any) => {
      Swal.fire({
        title: 'Confirmar',
        text: `¿Desea eliminar a ${nombre + " " + apellido1_del + " " + apellido2_del}?`,
        icon: 'warning',
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario eliminado',
            confirmButtonText: 'ok',
            timer: 2100,
          });
          this._usuariosService.deleteUser(this.id_eliminar).subscribe((res: any) => {
            console.log(res)
          })
          setTimeout(()=>{
            location.reload()
          },2200)
        }
      });
    })

  }
}
