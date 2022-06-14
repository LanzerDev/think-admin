import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public api = 'http://localhost:3000/';

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

}
