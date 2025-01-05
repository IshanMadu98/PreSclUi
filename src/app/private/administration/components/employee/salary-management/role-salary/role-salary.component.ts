import { UserRole } from './../../../../../../@application/enums/UserRole';
import { Component } from '@angular/core';
import { RoleSalaryDto } from '../../../../../../@domain/RoleSalaryDto';
import { RoleSalaryService } from '../../../../../../@application/services/role-salary-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddUpdateRoleSalaryDialogComponent } from './add-update-role-salary-dialog/add-update-role-salary-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-role-salary',
  templateUrl: './role-salary.component.html',
  styleUrl: './role-salary.component.scss'
})
export class RoleSalaryComponent {
  roleSalaries: RoleSalaryDto[] = [];
  userRole = UserRole;
  constructor(
    private roleSalaryService: RoleSalaryService,
    private message: NzMessageService,
    private modal: NzModalService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadRoleSalaries();
  }

  addRoleSalary() {
    const dialogRef = this.dialog.open(AddUpdateRoleSalaryDialogComponent, {
      width: '50%',
      data: {
        title: 'Add Role Salary',
        btnTitle: 'Add',
      },
    });
    this.reloadAfterClosed(dialogRef);
  }

  updateRoleSalary(roleSalary: RoleSalaryDto) {
    const dialogRef = this.dialog.open(AddUpdateRoleSalaryDialogComponent, {
      width: '50%',
      data: {
        title: 'Update Role Salary',
        btnTitle: 'Update',
        roleSalaryData: roleSalary,
      },
    });
    this.reloadAfterClosed(dialogRef);
  }

  private reloadAfterClosed(dialogRef: MatDialogRef<any>) {
    dialogRef.afterClosed().subscribe(() => {
      this.loadRoleSalaries();
    });
  }

  loadRoleSalaries(): void {
    this.roleSalaryService.getAllRoleSalaries().subscribe((roleSalaries: RoleSalaryDto[]) => {
      this.roleSalaries = roleSalaries;
    });
  }

  deleteRoleSalary(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure?',
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => {
        this.roleSalaryService.deleteRoleSalary(id).subscribe({
          next: () => {
            this.message.success('Role salary deleted');
            this.loadRoleSalaries();
          },
          error: () => this.message.error('Failed to delete role salary'),
        });
      },
    });
  }
}
