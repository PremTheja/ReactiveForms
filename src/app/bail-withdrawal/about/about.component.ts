import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // startLodgement() {
  //   // Navigate to Form Details (Section 2)
  //   this.router.navigate(['../details'], { relativeTo: this.route });
  // }
}

