import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveRequestDto } from '../../../../../@domain/LeaveRequestDto';
import { FormHelper, KeyString } from '../../../../../@application/form.helper';
import { StaffDto } from '../../../../../@domain/StaffDto';
import { LeaveRequestService } from '../../../../../@application/services/leave-request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffService } from '../../../../../@application/services/staff.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-update-leave-request-dialog',
  templateUrl: './add-update-leave-request-dialog.component.html',
  styleUrl: './add-update-leave-request-dialog.component.scss'
})
export class AddUpdateLeaveRequestDialogComponent {
  leaveForm!: FormGroup;
  title!: string;
  btnTitle!: string;
  leaveData = {} as LeaveRequestDto;
  leaveTypeKeyValue = FormHelper.GetLeaveTypeKeyValue();
  leaveSessionKeyValue = FormHelper.GetLeaveSessionKeyValue();
  staffKeyValue = [] as KeyString[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; btnTitle: string; leaveData: LeaveRequestDto },
    private dialogRef: MatDialogRef<AddUpdateLeaveRequestDialogComponent>,
    private leaveService: LeaveRequestService,
    private staffService: StaffService,
    private message: NzMessageService
  ) {
    this.title = this.data.title;
    this.btnTitle = this.data.btnTitle;
    this.leaveData = this.data?.leaveData;

    this.leaveForm = new FormGroup({
      id: new FormControl(this.leaveData?.id),
      staffId: new FormControl(this.leaveData?.staffId, [Validators.required]),
      leaveType: new FormControl(this.leaveData?.leaveType, [Validators.required]),
      session: new FormControl(this.leaveData?.session, [Validators.required]),
      startDate: new FormControl(this.leaveData?.startDate, [Validators.required]),
      endDate: new FormControl(this.leaveData?.endDate),
      reason: new FormControl(this.leaveData?.reason),
    });
  }

  ngOnInit(): void {
    this.loadStaff();
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const leaveRequest = this.leaveForm.value;
      if (this.leaveData && this.leaveData.id) {
        // Update existing leave request
        // this.leaveService.updateLeaveRequest(leaveRequest).subscribe(() => {
        //   this.message.success('Leave request updated successfully');
        //   this.dialogRef.close();
        // });
      } else {
        // Add new leave request
        this.leaveService.createLeaveRequest(leaveRequest).subscribe(() => {
          this.message.success('Leave request created successfully');
          this.dialogRef.close();
        });
      }
    } else {
      this.message.error('Please fill all required fields');
    }
  }

  private loadStaff(): void {
    this.staffService.getAllStaff().subscribe(
      (staff: StaffDto[]) => {
        // Convert staff list into key-value pairs for the dropdown
        this.staffKeyValue = FormHelper.ConvertForDropDownNew(staff, {
          key: 'id', // Use `id` as the dropdown key
          value: (item: StaffDto) => `${item.firstName} ${item.lastName}`, // Combine firstName and lastName
        });
      },
      (error) => {
        // Display a user-friendly error message
        this.message.error('Failed to load staff members. Please try again later.');
      }
    );
  }


}
