import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment'; 


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private myAppUrl: string;
  private myAPIUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl =  enviroment.endpoint;
    this.myAPIUrl = 'documentos';
  }

  getDocs(id: any){
      const url = `${this.myAppUrl}${this.myAPIUrl}/${id}`;
    return this.http.get(url)
  }
  addDoc(data:any): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myAPIUrl}/saveDoc/`,data)
  }

  verDoc(data: any): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myAPIUrl}/verDoc/`,data)
  }
  
}
