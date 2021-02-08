import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';
import { News } from 'app/models/News';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string = `${environment.HOST}users`;
  constructor(private http: HttpClient) { }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  consult(){
    return this.http.get<any>(`${this.url}`);
  }

}