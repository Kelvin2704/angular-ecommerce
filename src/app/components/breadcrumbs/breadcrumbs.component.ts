import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() category: string = '';
  @Input() productTitle: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  navigateCategory(): void {
    this.router.navigate([`/category/${this.category}`]);
  }
}
