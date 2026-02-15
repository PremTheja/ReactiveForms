import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BailFormService } from '../../service/bail-form.service';

@Component({
  selector: 'app-bail-shell',
  imports:[RouterOutlet],
  templateUrl: './bail-shell.component.html',
  styleUrls: ['./bail-shell.component.scss'],
  standalone: true
})
export class BailShellComponent {
  steps = [
    { label: 'About this form', path: 'about' },
    { label: 'Form details', path: 'details' },
    { label: 'Attachments', path: 'attachments' },
    { label: 'Summary', path: 'summary' }
  ];

  currentStepIndex = 0; // 0-based index

  constructor(private router: Router, private route: ActivatedRoute,
    private bailFormService: BailFormService) {
    // Update current step whenever route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const childRoute = this.route.firstChild;
        const currentPath = childRoute?.snapshot.url[0]?.path;

        const index = this.steps.findIndex(step => step.path === currentPath);
        this.currentStepIndex = index === -1 ? 0 : index;
      });
  }

goNext() {
  const currentPath = this.steps[this.currentStepIndex].path;

  if (currentPath === 'details') {
    if (this.bailFormService.getForm().invalid) {
      this.bailFormService.getForm().markAllAsTouched();
      return;
    }
  }

  if (currentPath === 'attachments') {
    if (!this.bailFormService.allRequiredUploaded()) {
      alert('Please upload all mandatory documents before proceeding.');
      return;
    }
  }

  if (this.currentStepIndex < this.steps.length - 1) {
    const nextPath = this.steps[this.currentStepIndex + 1].path;
    this.router.navigate([nextPath], { relativeTo: this.route });
  }
}


  goBack() {
    if (this.currentStepIndex > 0) {
      const prevPath = this.steps[this.currentStepIndex - 1].path;
      this.router.navigate([prevPath], { relativeTo: this.route });
    }
  }

  goToStep(index: number) {
    // Prevent jumping to future steps for now
    if (index <= this.currentStepIndex) {
      const path = this.steps[index].path;
      this.router.navigate([path], { relativeTo: this.route });
    }
  }
}
