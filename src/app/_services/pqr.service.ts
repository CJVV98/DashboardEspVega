import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Pqr } from 'app/models/Pqr';
@Injectable({
  providedIn: 'root'
})
export class PqrService {
  url: string = `${environment.HOST}pqr`;
  constructor(private http: HttpClient) { }


  create(pqr : Pqr){
    return this.http.post(`${this.url}`,pqr);
  }

  consult(){
    return this.http.get<any>(`${this.url}`);
  }

  delete(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }

}
