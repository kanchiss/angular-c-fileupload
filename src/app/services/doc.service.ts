import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocService {
  progress = 0;
  message = '';
  constructor(private http: HttpClient) {}

  uploadFile(query: FormData): Observable<any> {
    return this.http
      .post('https://localhost:44348/Product/attach/64dc73214b0a03851bcb4187', query, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
          }
        })
      );
  }
}
