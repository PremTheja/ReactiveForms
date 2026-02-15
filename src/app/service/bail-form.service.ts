import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export type UploadStatus = 'idle' | 'selected' | 'uploading' | 'uploaded' | 'error';

export interface Attachment {
  type: 'BAIL_WITHDRAWAL' | 'OTHER';
  required: boolean;
  fileName?: string;
  size?: number;
  status: UploadStatus;
}

@Injectable({ providedIn: 'root' })
export class BailFormService {

  constructor(private fb: FormBuilder) {}

  // One main form for the whole flow
  form = this.fb.group({
    // Prefilled case details (read-only in UI)
    court: ['Supreme Court NSW'],
    caseTitle: ['Bail Application - John Doe'],
    proceedingTitle: ['State vs John Doe'],
    caseNumber: ['SCN-12345'],
    proceedingType: ['Bail Withdrawal'],
    accusedName: ['John Doe'],

    // User inputs
    referenceCode: [''], // optional
    reasonForWithdrawal: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  // Attachments state (frontend-only)
  private attachments: Attachment[] = [
    {
      type: 'BAIL_WITHDRAWAL',
      required: true,
      status: 'idle'
    },
    {
      type: 'OTHER',
      required: false,
      status: 'idle'
    }
  ];

  // --- Form helpers ---
  getForm() {
    return this.form;
  }

  // --- Attachments helpers ---
  getAttachments(): Attachment[] {
    return this.attachments;
  }


  
  setAttachment(index: number, patch: Partial<Attachment>) {
    this.attachments[index] = { ...this.attachments[index], ...patch };
  }

  resetAttachment(index: number) {
    const base = this.attachments[index];
    this.attachments[index] = {
      ...base,
      fileName: undefined,
      size: undefined,
      status: 'idle'
    };
  }

  allRequiredUploaded(): boolean {
    return this.attachments
      .filter(a => a.required)
      .every(a => a.status === 'uploaded');
  }

  // --- Final payload for Submit ---
  getFinalPayload() {
    return {
      ...this.form.value,
      attachments: this.attachments.map(a => ({
        type: a.type,
        required: a.required,
        fileName: a.fileName,
        size: a.size,
        status: a.status
      }))
    };
  }

  // --- Optional: reset form (if user starts new form) ---
  resetAll() {
    this.form.reset({
      court: 'Supreme Court NSW',
      caseTitle: 'Bail Application - John Doe',
      proceedingTitle: 'State vs John Doe',
      caseNumber: 'SCN-12345',
      proceedingType: 'Bail Withdrawal',
      accusedName: 'John Doe',
      referenceCode: '',
      reasonForWithdrawal: ''
    });

    this.attachments = [
      { type: 'BAIL_WITHDRAWAL', required: true, status: 'idle' },
      { type: 'OTHER', required: false, status: 'idle' }
    ];
  }
}
