import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import User from '../../../backend/src/models/user';
import { enviroment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class EntregaService {
    
  private myAppUrl: string;
  private myAPIUrl: string;
  private http = inject( HttpClient );
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() { 
    this.myAppUrl =  enviroment.endpoint;
    this.myAPIUrl = 'entregas';
  }

  getRegistros(): Observable<[]> {
    const url = `${this.myAppUrl}${this.myAPIUrl}/findAll`;
      return this.http.get<[]>(url)
  }
}
