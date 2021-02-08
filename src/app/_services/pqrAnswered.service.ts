import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PqrAnswered } from 'app/models/PqrAnswered';
@Injectable({
  providedIn: 'root'
})
export class PqrAnsweredService {
  url: string = `${environment.HOST}pqrans`;
  constructor(private http: HttpClient) { }


  send(pqr : PqrAnswered){
    return this.http.post(`${this.url}`,pqr);
  }


}
