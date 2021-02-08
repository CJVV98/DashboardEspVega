import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'environments/environment';
import { News } from 'app/models/News';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url: string = `${environment.HOST}news`;
  constructor(private http: HttpClient) { }


  create(news : News, imageNew: File, id: number){
    const data = new FormData();
    if(id>0){
      data.append('id', id.toString());
    }
    data.append('title', news.title);
    data.append('autor', news.autor);
    data.append('url_resource', news.url_resource);
    data.append('content', news.content);
    data.append('url_image', imageNew, news.url_image);
    return this.http.post(`${this.url}`,data);
  }

  consult(){
    return this.http.get<any>(`${this.url}`);
  }


  delete(id:number){
     return this.http.delete(`${this.url}/${id}`)
  }

  update(news : News, imageNew: File, id:number){
    console.log(imageNew);
    console.log(id);
    if(imageNew != null){
      this.create(news,imageNew,id);
    }else{
      return this.http.put(`${this.url}/${id}`,news);
    }
  }

}
