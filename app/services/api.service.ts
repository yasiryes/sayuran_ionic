import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private env: EnvService,
    ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  doGet(url: string): Observable<Object>{
    return this.http.get(this.env.API_URL + url).pipe()
  }

  doPost(url: string, post_data: {}){
    return this.http.post(this.env.API_URL + url, post_data, this.httpOptions).pipe()
  }
  doGetRaw(url: string): Observable<Object>{
    return this.http.get(url).pipe()
  }

}
