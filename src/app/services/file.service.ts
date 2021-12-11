import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  apikey = "281ef48028d1743498d54556f59c997f";

  constructor(private readonly http:HttpClient) { }


  upload(file:File):Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post('/upload',formData, {params:{key:this.apikey}}).pipe(map((response:any) => response['data']['url']));
  }
}

