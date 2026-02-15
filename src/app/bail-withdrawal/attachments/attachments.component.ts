import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BailFormService, Attachment} from '../../service/bail-form.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  imports: [CommonModule],
  styleUrls: ['./attachments.component.scss'],
  standalone: true
})
export class AttachmentsComponent {
  attachments: Attachment[];

  constructor(private bailFormService: BailFormService) {
    this.attachments = this.bailFormService.getAttachments();
  }

  onFileSelect(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];

    // Validation
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed');
      this.bailFormService.setAttachment(index, { status: 'error' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB');
      this.bailFormService.setAttachment(index, { status: 'error' });
      return;
    }

    // Mark selected
    this.bailFormService.setAttachment(index, {
      fileName: file.name,
      size: file.size,
      status: 'selected'
    });
  }

  upload(index: number) {
    this.bailFormService.setAttachment(index, { status: 'uploading' });

    // Simulate upload delay
    setTimeout(() => {
      this.bailFormService.setAttachment(index, { status: 'uploaded' });
    }, 1000);
  }

  remove(index: number) {
    this.bailFormService.setAttachment(index, {
      fileName: undefined,
      size: undefined,
      status: 'idle'
    });
  }
}
