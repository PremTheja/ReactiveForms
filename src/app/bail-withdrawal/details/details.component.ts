import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BailFormService } from '../../service/bail-form.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // 👈 required
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  form!: FormGroup;

  constructor(private bailFormService: BailFormService) {
    this.form = this.bailFormService.getForm();   // 👈 MUST use service form
  }
}
