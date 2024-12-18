import { Component } from '@angular/core';
import { LeaveRequestDto } from '../../../../@domain/LeaveRequestDto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUpdateLeaveRequestDialogComponent } from './add-update-leave-request-dialog/add-update-leave-request-dialog.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LeaveRequestService } from '../../../../@application/services/leave-request.service';
import { LeaveSession, LeaveStatus, LeaveType } from '../../../../@application/enums/LeaveRequest';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss'
})
export class LeaveRequestComponent {
  leaveRequests: LeaveRequestDto[] = [];
  leaveType = LeaveType;
  leaveStatus = LeaveStatus;
  leaveSession = LeaveSession;

  constructor(
    private dialog: MatDialog,
    private modal: NzModalService,
    private leaveRequestService: LeaveRequestService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveRequestService.getAllLeaveRequests().subscribe(
      (requests) => {
        this.leaveRequests = requests;
      },
      () => {
        this.message.error('Failed to load leave requests');
      }
    );
  }

  addLeaveRequest(): void {
    const dialogRef = this.dialog.open(AddUpdateLeaveRequestDialogComponent, {
      width: '50%',
      data: { title: 'Add Leave Request', btnTitle: 'Add' },
    });
    this.reloadAfterDialog(dialogRef);
  }

  updateLeaveRequest(request: LeaveRequestDto): void {
    const dialogRef = this.dialog.open(AddUpdateLeaveRequestDialogComponent, {
      width: '50%',
      data: {
        title: 'Update Leave Request',
        btnTitle: 'Update',
        leaveRequestData: request,
      },
    });
    this.reloadAfterDialog(dialogRef);
  }

  deleteLeaveRequest(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this leave request?',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.leaveRequestService.deleteLeaveRequest(id).subscribe(
          () => {
            this.message.success('Leave request deleted successfully');
            this.loadLeaveRequests();
          },
          () => {
            this.message.error('Failed to delete leave request');
          }
        );
      },
    });
  }
  approveLeave(request: LeaveRequestDto): void {
    this.leaveRequestService.approveOrRejectLeave(request.id, LeaveStatus.Approved, 'Director').subscribe(
      () => {
        this.message.success('Leave request approved');
        this.loadLeaveRequests();
      },
      () => this.message.error('Failed to approve leave request')
    );
  }

  rejectLeave(request: LeaveRequestDto): void {
    this.leaveRequestService.approveOrRejectLeave(request.id, LeaveStatus.Rejected, 'Director').subscribe(
      () => {
        this.message.success('Leave request rejected');
        this.loadLeaveRequests();
      },
      () => this.message.error('Failed to reject leave request')
    );
  }

  private reloadAfterDialog(dialogRef: MatDialogRef<any>): void {
    dialogRef.afterClosed().subscribe(() => this.loadLeaveRequests());
  }
}
