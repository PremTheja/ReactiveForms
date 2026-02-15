import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BailFormService } from '../../service/bail-form.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  formValue: any;
  attachments: any[] = [];

  constructor(
    private bailFormService: BailFormService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formValue = this.bailFormService.getForm().value;
    this.attachments = this.bailFormService.getAttachments();
  }

  editDetails() {
    // Go back to Form Details step
    this.router.navigate(['../details'], { relativeTo: this.route });
  }

  editAttachments() {
    // Go back to Attachments step
    this.router.navigate(['../attachments'], { relativeTo: this.route });
  }

  submit() {
    const payload = this.bailFormService.getFinalPayload();
    console.log('Final Bail Withdrawal Payload:', payload);
    alert('Form submitted! Check console for JSON.');
  }
}
