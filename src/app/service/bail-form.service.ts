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

  // One main form for the whole flow (all empty initially)
  form = this.fb.group({
    // User fills these
    court: ['', Validators.required],
    caseTitle: ['', Validators.required],
    proceedingTitle: ['', Validators.required],
    caseNumber: ['', Validators.required],
    proceedingType: ['', Validators.required],
    accusedName: ['', Validators.required],

    // Optional reference
    referenceCode: [''],

    // Mandatory reason
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
    this.form.reset();
    this.attachments = [
      { type: 'BAIL_WITHDRAWAL', required: true, status: 'idle' },
      { type: 'OTHER', required: false, status: 'idle' }
    ];
  }
}
