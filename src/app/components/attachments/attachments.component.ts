import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DocService } from 'src/app/services/doc.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent {
  constructor(public dS: DocService) {}

  uploadFile = () => {
    let b = new Blob();
    let fileToUpload = new File([new Blob()], 'image.png', {
      type: 'image/png',
    });
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.dS.uploadFile(formData).subscribe((r) => console.log(r));
  };
}
