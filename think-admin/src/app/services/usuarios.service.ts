import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public api = 'https://thinkform.shop/'; 
 // public api = 'localhost:3000/';
  constructor(
    public _http: HttpClient,
  ) { }

  public getUsuarios(){
    let headers = new HttpHeaders()
    this._http.get(this.api+'api/usuarios',{ headers: headers })
  }
  
  public createUser(form:any){
    let headers = new HttpHeaders().set('content-type', 'application/json')
    return this._http.post(this.api+'api/newUser',form,{headers: headers})
  }

  public getUser(id:any){
    let headers = new HttpHeaders().set('content-type', 'application/json')
    return this._http.get(this.api+`api/usuarios/${id}`, {headers: headers})
  }

  public deleteUser(id:any){
    let headers = new HttpHeaders().set('content-type', 'application/json')
    return this._http.delete(this.api+`api/borrarusuario/${id}`, {headers: headers})
  }
  public saveComentario(id:any, comentario:any){
    let headers = new HttpHeaders().set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    return this._http.put(this.api+`api/comentario/${id}`, comentario, {headers: headers})
  }
}
