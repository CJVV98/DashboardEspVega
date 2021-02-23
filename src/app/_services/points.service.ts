import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Point } from 'app/models/Point';
@Injectable({
  providedIn: 'root'
})
export class PointsService {
  url: string = `${environment.HOST}points`;
  constructor(private http: HttpClient) { }


  create(point : Point){
    return this.http.post(`${this.url}`,point);
  }

  consult(){
    return this.http.get<any>(`${this.url}`);
  }

  delete(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }


  consultCount(){
    return this.http.get<any>(`${environment.HOST}points-count`);
  }
}
