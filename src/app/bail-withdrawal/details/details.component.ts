import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BailFormService } from '../../service/bail-form.service';

@Component({
  selector: 'app-details',
  
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class DetailsComponent {
  form!: FormGroup;

  constructor(private bailFormService: BailFormService) {
    // Get the shared form from service
    this.form = this.bailFormService.getForm() as FormGroup;
  }

  get reason() {
    return this.form.get('reasonForWithdrawal');
  }
}