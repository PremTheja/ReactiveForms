import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BailFormService } from '../../service/bail-form.service';

@Component({
  selector: 'app-bail-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './bail-shell.component.html',
  styleUrls: ['./bail-shell.component.scss']
})
export class BailShellComponent {

  steps = ['about', 'details', 'attachments', 'summary'];
  labels = ['About this form', 'Form details', 'Attachments', 'Summary'];

  currentStepIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bailFormService: BailFormService
  ) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.updateCurrentStep());
  }

  updateCurrentStep() {
    const currentPath = this.route.firstChild?.snapshot.url[0]?.path;
    const index = this.steps.indexOf(currentPath || 'about');
    this.currentStepIndex = index === -1 ? 0 : index;
  }

  goNext() {
    const step = this.steps[this.currentStepIndex];

    // Block Next on Details if form is invalid
    if (step === 'details' && this.bailFormService.getForm().invalid) {
      this.bailFormService.getForm().markAllAsTouched();
      return;
    }

    // Block Next on Attachments if mandatory upload not done
    if (step === 'attachments' && !this.bailFormService.allRequiredUploaded()) {
      alert('Please upload all mandatory documents before proceeding.');
      return;
    }

    if (this.currentStepIndex < this.steps.length - 1) {
      this.router.navigate([this.steps[this.currentStepIndex + 1]], {
        relativeTo: this.route
      });
    }
  }

  goBack() {
    if (this.currentStepIndex > 0) {
      this.router.navigate([this.steps[this.currentStepIndex - 1]], {
        relativeTo: this.route
      });
    }
  }

  goToStep(index: number) {
    if (index <= this.currentStepIndex) {
      this.router.navigate([this.steps[index]], { relativeTo: this.route });
    }
  }
}
