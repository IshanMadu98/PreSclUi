import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
  tabIndex = 0

  onChangeTab(tabIndex: number) {
    this.tabIndex = tabIndex
  }

}
