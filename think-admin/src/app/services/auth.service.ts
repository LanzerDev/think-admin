import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { JwtResponse } from '../models/JwtResponse';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'https://thinkform.shop/api';

  public userL:any;
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }


  login(user:User): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`,user).pipe(tap(
      (res: JwtResponse)=>{
        if (res){
           this.saveToken(res.dataUser.accesToken, res.dataUser.expiresIn);
        }
      }
    ))
  } 

  basicLogin(user:any){
    let headers = new HttpHeaders().set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    return this.httpClient.post(this.AUTH_SERVER + '/login', user, {headers: headers})
  }

  setUserLoged(user:any){
    localStorage.setItem("USER_LOGED", user)
  }

  getUserLoged(){
    if(localStorage.getItem("USER_LOGED")){
      return true
    } else {
      return false
    }
  }

  getActualUser(){
   return this.userL = localStorage.getItem("USER_LOGED");
  }
  cerrarSesion(){
    this.userL = "";
    localStorage.removeItem("USER_LOGED")
  }

  logout(){
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token:string, expiresIn: string):void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken():string{
    if(this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token
  }
}

/*https://somosthink.com:2083/ c panel*/
