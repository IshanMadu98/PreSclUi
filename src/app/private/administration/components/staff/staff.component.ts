import { Component } from '@angular/core';
import { StaffDto } from '../../../../@domain/StaffDto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from 'express';
import { AddUpdateStaffDialogComponent } from './add-update-staff-dialog/add-update-staff-dialog.component';
import { StaffService } from '../../../../@application/services/staff.service';
import { StudentDto } from '../../../../@domain/StudentDto';
import { AddUpdateStudentDialogComponent } from '../student/add-update-student-dialog/add-update-student-dialog.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {
  staffMembers: StaffDto[] = [];
  expandSet = new Set<string>();

  constructor(private dialog: MatDialog, private staffService: StaffService, private message: NzMessageService,private modal: NzModalService) { }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  ngOnInit(): void {
    this.loadStaffs();
  }

  AddStaff() {
    const dialogRef = this.dialog.open(AddUpdateStaffDialogComponent, {
      width: '50%',
      data: {
        title: 'Add Staff',
        btnTitle: 'Add',
      },
    })
    this.reloadAfterClosed(dialogRef)
  }

  UpdateStaff(Staff: StaffDto) {
    const dialogRef = this.dialog.open(AddUpdateStaffDialogComponent, {
      width: '50%',
      data: {
        title: 'Update Staff',
        btnTitle: 'Update',
        staffData: Staff
      }
    })
    this.reloadAfterClosed(dialogRef)
  }

  private reloadAfterClosed(dialogRef: MatDialogRef<any>) {
    dialogRef.afterClosed().subscribe({
      next: value => {
        this.loadStaffs();
      }
    })
  }


  deleteStaff(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this staff member?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.staffService.deleteStaff(id).subscribe(
          () => {
            this.message.success('Staff member deleted successfully');
            this.loadStaffs();
          },
          (error) => {
            this.message.error('Failed to delete staff member');
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        this.message.info('Deletion Canceled');
      }
    });
  }


  loadStaffs(): void {
    this.staffService.getAllStaff().subscribe(
      (staffs: StaffDto[]) => {
        this.staffMembers = staffs;
      },
      (error) => {
        this.message.error('Failed to load students');
      }
    );
  }
}
