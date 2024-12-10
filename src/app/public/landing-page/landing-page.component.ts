import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  features = [
    {
      title: 'Student Management',
      description: 'Comprehensive student profiles and attendance tracking',
      icon: 'fas fa-user-graduate'
    },
    {
      title: 'Staff Administration',
      description: 'Efficient staff management and leave tracking',
      icon: 'fas fa-chalkboard-teacher'
    },
    {
      title: 'Communication Hub',
      description: 'Seamless messaging between parents and staff',
      icon: 'fas fa-comments'
    },
    {
      title: 'Performance Tracking',
      description: 'Monitor and report student progress',
      icon: 'fas fa-chart-line'
    }
  ];
}
