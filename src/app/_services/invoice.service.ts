import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';
import { News } from 'app/models/News';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  url: string = `${environment.HOST}invoice`;
  constructor(private http: HttpClient) { }

  show(id:number){
    return this.http.get<any>(`${this.url}/${id}`);
  }

}