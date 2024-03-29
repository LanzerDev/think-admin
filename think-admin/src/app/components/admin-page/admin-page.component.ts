import { AfterViewInit, OnDestroy, Component, Inject, OnInit, ViewChild, TemplateRef, Renderer2, ElementRef, OnChanges} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Moment } from 'moment';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild(DataTableDirective, { static: false })
  public datatableElement: DataTableDirective;
  minEdad: number;
  maxEdad: number;

  minIng: number;
  maxIng: number;

  public dtOptions: any = {};

  constructor(
    private http: HttpClient,
    public _usuariosService: UsuariosService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public authService: AuthService
  ) {
    this.usuarioActual()
  }
  
  public deleteButton:any;
  public commentButton:any;
  public usuarios: Array<any> = [];
  public api = 'https://thinkform.shop/';

  ngOnInit(): void {



    jQuery.fn['dataTable'].ext.search.push((settings:any, data:any, dataIndex:any) => {
      if(this.minEdad == 0 || this.minEdad == null || this.minEdad == undefined){
        this.minEdad = 0;
      //  console.log(this.minEdad)
      }
      if(this.maxEdad == 0 || this.maxEdad == null || this.maxEdad == undefined){
        this.maxEdad = 100;
      }
      const id = parseFloat(data[7]) || 0; // use data for the id column
      if ((isNaN(this.minEdad) && isNaN(this.maxEdad)) ||
        (isNaN(this.minEdad) && id <= this.maxEdad) ||
        (this.minEdad <= id && isNaN(this.maxEdad)) ||
        (this.minEdad <= id && id <= this.maxEdad)) {
        return true;
      }
      return false;
    });

    jQuery.fn['dataTable'].ext.search.push((settings:any, data:any, dataIndex:any) => {
      if(this.minIng == 0 || this.minIng == null || this.minIng == undefined){
        this.minIng = 0;
       // console.log(this.minEdad)
      }
      if(this.maxIng == 0 || this.maxIng == null || this.maxIng == undefined){
        this.maxIng = 100000;
      }
      const id = parseFloat(data[16]) || 0; // use data for the id column
      if ((isNaN(this.minIng) && isNaN(this.maxIng)) ||
        (isNaN(this.minIng) && id <= this.maxIng) ||
        (this.minIng <= id && isNaN(this.maxIng)) ||
        (this.minIng <= id && id <= this.maxIng)) {
        return true;
      }
      return false;
    });

    this.http.get<any>(this.api + 'api/usuarios').subscribe((res: any) => {
      this.usuarios = res;
    })
    const self = this;
    this.dtOptions = {
      pageLength: 1000,
      lengthMenu: [
          [5,10,25,50,100,1000],
          [5,10,25,50,100,'Todos'],
      ],
      ajax: {
        url: this.api + 'api/usuarios',
        type: 'GET',
        dataSrc: ""
      },
      columns: [
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
          title: "Calle",
          data: "Calle"
        },
        {
          title: "Numero",
          data: "Numero"
        },
        {
          title: "Colonia",
          data: "Colonia"
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
          data: "Ingresos_mensual",
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
        },
        {
          title: "Action",
          data: "id_usuario",
          render: function (data:any, type:any, row:any, meta:any){
            return `
                  <button class='btn btn-danger delete-btn' id="${data}">
                       <img src="../assets/trash.svg" width="22" height="22" style="pointer-events: none;"/>
                  </button>
                  <button class='btn btn-primary comment-btn' data-bs-toggle="modal" data-bs-target="#agregarComentario" id="${data}">
                       <img src="../assets/pen.svg" width="22" height="22" style="pointer-events: none;"/>
                  </button>
                   `
          }
        }
      ],
      dom: 'Blfrtip',
      // Configure the buttons
      buttons: [
        'excel'
      ],
      select: true

      // dom: 'B<"top"i>rt<"bottom"flp><"clear">',
      // // Configure the buttons
      // buttons: [
      //   'excel'
      // ]
    };


    setInterval(()=>{
      setTimeout(()=>{
        this.deleteButton = document.getElementsByClassName("delete-btn")
        for(let i = 0; i < this.deleteButton.length; i++){
            this.deleteButton[i].addEventListener("click", (e:any)=>{
            const id = e.target.getAttribute("id");
            this.borrarUsuario(id);
          })
        }
      },1000);
      setTimeout(()=>{
        this.commentButton = document.getElementsByClassName("comment-btn")
        for(let i = 0; i < this.commentButton.length; i++){
          if(this.commentButton){
            this.commentButton[i].addEventListener("click", (e:any)=>{
              const id = e.target.getAttribute("id");
              this.usuario_comentario = id;
              this.comentarios = ""
              this.getComentarioUser(id);
            })
          }
        }
      },1000)
    },4000)

    setTimeout(()=>{
      document.querySelector<HTMLElement>(".dt-buttons").style.display = "flex";
      document.querySelector<HTMLElement>(".dt-buttons").style.justifyContent = "center";
      document.querySelector<HTMLElement>(".dt-buttons").style.margin = "5px";
      document.querySelector<HTMLElement>(".dt-button").style.backgroundColor = "#93c83d";
      document.querySelector<HTMLElement>(".dt-button").style.color = "white";
      document.querySelector<HTMLElement>(".dt-button").style.borderRadius = "5px";
      document.querySelector<HTMLElement>(".dt-button").style.borderStyle = "none";
      document.querySelector<HTMLElement>(".dt-button").style.width = "125px";
      document.querySelector<HTMLElement>(".dt-button").style.height = "35px";
      document.querySelector<HTMLElement>(".dt-button").textContent = "Descargar excel";
    }, 200)

  } 

// generacion de la tabla
ngAfterViewInit(): void {
   // this.dtTrigger.next(void 0);
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== $(this).val()) {
            that
            .search($(this).val().toString())
            .draw();
          }
        });
      });
    });
    
  }

  
  public getComentarioUser(id:any){
    this._usuariosService.getUser(id).subscribe((res:any)=>{
      this.comentarios = res.usuario[0].Comentarios
    })
  }

  public getEdad(fecha_nacimiento: any) {
    return moment().diff(fecha_nacimiento, 'years')
  }

  public actual_user:any;
  public usuarioActual(){
   this.actual_user = this.authService.getActualUser()
  }

  
  public borrarUsuario(id:any){
    Swal.fire({
      title: 'Confirmar',
      text: `¿Desea eliminar a este usuario?`,
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
        this._usuariosService.deleteUser(id).subscribe((res: any) => {
          //
        })
        setTimeout(()=>{
          location.reload()
        },2200)
      }
    });
  }

  public comentarios: any = "";
  public usuario_comentario: any;
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

  ngOnDestroy(): void {
    // We remove the last function in the global ext search array so we do not add the fn each time the component is drawn
    // /!\ This is not the ideal solution as other components may add other search function in this array, so be careful when
    // handling this global variable
    jQuery.fn['dataTable'].ext.search.pop();
  }

  filterByEdad(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  filterByIng(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
