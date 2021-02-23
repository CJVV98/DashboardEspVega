import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { environment } from 'environments/environment';
import { News } from 'app/models/News';
import { User } from 'app/models/User';
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


  login(user: User) {
    return this.http.post( `${environment.HOST}auth`+"/loginAdmin", user);
  }

  consultCount(){
    return this.http.get<any>(`${environment.HOST}users-count`);
  }

}