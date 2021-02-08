import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';
import { News } from 'app/models/News';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  url: string = `${environment.HOST}file`;
  constructor(private http: HttpClient) { }


  create(file: File){
    const data = new FormData();
    data.append('url_file', file, "Facturas");
    return this.http.post(`${this.url}`,data);
  }

}
