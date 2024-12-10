import { Component, Inject } from '@angular/core';
import { StaffDto } from '../../../../../@domain/StaffDto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffService } from '../../../../../@application/services/staff.service';

@Component({
  selector: 'app-add-update-staff-dialog',
  templateUrl: './add-update-staff-dialog.component.html',
  styleUrl: './add-update-staff-dialog.component.scss'
})
export class AddUpdateStaffDialogComponent {
  title!: string;
  btnTitle!: string;
  staffData = {} as StaffDto;
  staffForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { title: string; btnTitle: string; staffData: StaffDto },
    private staffService: StaffService,
    private dialogRef: MatDialogRef<AddUpdateStaffDialogComponent>
  ) {
    this.title = this.data.title;
    this.btnTitle = this.data.btnTitle;
    this.staffData = this.data?.staffData;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.staffForm = new FormGroup({
      id: new FormControl(this.staffData?.id, null),
      empNo: new FormControl(this.staffData?.empNo, [Validators.required]),
      firstName: new FormControl(this.staffData?.firstName, [Validators.required]),
      lastName: new FormControl(this.staffData?.lastName, [Validators.required]),
      gender: new FormControl(this.staffData?.gender, [Validators.required]),
      email: new FormControl(this.staffData?.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.staffData?.phoneNumber, [Validators.required, Validators.pattern('^\\+?[0-9]{10,12}$')]),
      nic: new FormControl(this.staffData?.nic, [Validators.required, Validators.pattern('[0-9]{9}[vV]|[0-9]{12}')]),
      address: new FormControl(this.staffData?.address, [Validators.required]),
      dateJoined: new FormControl(this.staffData?.dateJoined, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.staffForm.valid) {
      const data = this.staffForm.value;
      if (this.btnTitle === 'Add') {
        this.addStaff(data);
      } else {
        this.updateStaff(data);
      }
    }
  }

  private addStaff(data: StaffDto): void {
    this.staffService.addStaff(data).subscribe({
      next: (response) => {
        this.dialogRef.close(response); // Close the dialog with the response.
      },
      error: (error) => {
        console.error('Error adding staff:', error);
      },
    });
  }

  private updateStaff(data: StaffDto): void {
    this.staffService.updateStaff(data.id, data).subscribe({
      next: (response) => {
        this.dialogRef.close(response); // Close the dialog with the response.
      },
      error: (error) => {
        console.error('Error updating staff:', error);
      },
    });
  }
}

