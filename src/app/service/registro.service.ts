import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, signal, inject, computed } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment'; 

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private myAppUrl: string;
  private myAPIUrl: string;
  private http = inject( HttpClient );
  constructor() {
    this.myAppUrl =  enviroment.endpoint;
    this.myAPIUrl = 'entregas';
  }

  saveRegistro(data:any): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myAPIUrl}/saveRegistro/`,data)
  }

  getDeptos():Observable<[]>{
    const url = `${this.myAppUrl}${this.myAPIUrl}/selectDeptos`;
    return this.http.get<[]>(url)
  }
  
  getSP():Observable<[]>{
    const url = `${this.myAppUrl}${this.myAPIUrl}/selectSP`;
    return this.http.get<[]>(url)
  }

  editRegistro(id: any){
      const url = `${this.myAppUrl}${this.myAPIUrl}/${id}`;
      return this.http.get(url)
    }

  updateRegistro(id: any, registro: []){
      const url = `${this.myAppUrl}${this.myAPIUrl}/${id}`;
    return this.http.patch(url,registro)
    }

}
