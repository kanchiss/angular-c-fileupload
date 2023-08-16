import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DocService } from 'src/app/services/doc.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent {
  progress = 0;
  message = '';

  constructor(private dS: DocService) {}

  uploadFile = () => {
    let b = new Blob();
    let fileToUpload = new File([new Blob()], 'image.png', {
      type: 'image/png',
    });
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.dS.uploadFile(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
        }
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  };
}
