import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';
import { CalculadoraResponse } from '../types/calculadora-response.type';

@Injectable({
  providedIn: 'root'
})
export class ApiCalculadoraService {
  
  private apiUrl = 'http://localhost:8000//';

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<LoginResponse>(this.apiUrl + 'api/token/', { username, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.access)
      })
    )
  }

  calcular(operacao: string, numero1: string, numero2: string){
    let headers = new HttpHeaders();
    let token = sessionStorage.getItem("auth-token")

    headers = headers.set('Authorization', `Bearer ${token}`)
    headers = headers.set('Content-Type', 'application/json')
    headers = headers.set('Accept', '*/*')

    return this.http.get(this.apiUrl + 'api/calcular/' + operacao+"/"+numero1+"/"+numero2 , {headers});
  }

}
