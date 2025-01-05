import { Component } from '@angular/core';

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrl: './salary-management.component.scss'
})
export class SalaryManagementComponent {
  tabIndex = 0

  onChangeTab(tabIndex: number) {
    this.tabIndex = tabIndex
  }
}
