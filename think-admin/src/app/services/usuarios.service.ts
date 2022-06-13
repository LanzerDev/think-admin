import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    public _http: HttpClient,
  ) { }

  public getUsuarios(){
    let headers = new HttpHeaders()
    this._http.get('http://localhost:3000/api/usuarios',{ headers: headers })
  }

}
