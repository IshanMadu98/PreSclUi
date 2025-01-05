import { Component } from '@angular/core';
import { SalaryDto } from '../../../../../../@domain/SalaryDto';
import { SalaryService } from '../../../../../../@application/services/salary-service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-staff-salary',
  templateUrl: './staff-salary.component.html',
  styleUrl: './staff-salary.component.scss'
})
export class StaffSalaryComponent {
  salaries: SalaryDto[] = [];
  selectedDate: Date | null = null; // Bind the selected date

  constructor(
    private salaryService: SalaryService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    this.selectedDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.fetchSalary(); // Optionally load the salary data for the current month
  }

  // Disable future months
  disableFutureMonths = (current: Date): boolean => {
    // Disable future months by comparing the current date to the current month
    const today = new Date();
    return current.getFullYear() > today.getFullYear() ||
      (current.getFullYear() === today.getFullYear() && current.getMonth() > today.getMonth());
  }

  // This function will be triggered when the date changes
  fetchSalary(): void {
    if (this.selectedDate) {
      const year = this.selectedDate.getFullYear(); // Get the selected year
      const month = this.selectedDate.getMonth() + 1; // Get the selected month (Note: months are 0-indexed)
      this.loadSalariesByMonth(year, month); // Call the method to fetch salaries
    }
  }

  // loadSalaries(): void {
  //   this.salaryService.getAllSalaries().subscribe({
  //     next: (data) => (this.salaries = data),
  //     error: () => this.message.error('Failed to load salaries'),
  //   });
  // }

  loadSalariesByMonth(year: number, month: number): void {
    this.salaryService.getSalariesByMonth(year, month).subscribe(
      (salaries) => {
        this.salaries = salaries;
      },
      (error) => {
        console.error('Error fetching salaries:', error);
      }
    );
  }

  generateSalary(staffId: string): void {
    this.salaryService.addSalary(staffId).subscribe({
      next: () => {
        this.message.success('Salary generated');
        if (this.selectedDate) {
          const year = this.selectedDate.getFullYear();
          const month = this.selectedDate.getMonth() + 1;
          this.loadSalariesByMonth(year, month); // Reload salaries after generating
        }
      },
      error: () => this.message.error('Failed to generate salary'),
    });
  }
}
