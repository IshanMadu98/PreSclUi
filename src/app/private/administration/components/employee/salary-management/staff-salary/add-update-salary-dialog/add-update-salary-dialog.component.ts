import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SalaryDto } from '../../../../../../../@domain/SalaryDto';
import { SalaryService } from '../../../../../../../@application/services/salary-service';

@Component({
  selector: 'app-add-update-salary-dialog',
  templateUrl: './add-update-salary-dialog.component.html',
  styleUrls: ['./add-update-salary-dialog.component.scss'],
})
export class AddUpdateSalaryDialogComponent {
  salaryForm: FormGroup;
  title: string;
  btnTitle: string;
  salaryData: SalaryDto = {} as SalaryDto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; btnTitle: string; salaryData: SalaryDto },
    private dialogRef: MatDialogRef<AddUpdateSalaryDialogComponent>,
    private salaryService: SalaryService,
    private message: NzMessageService
  ) {
    this.title = this.data.title;
    this.btnTitle = this.data.btnTitle;
    this.salaryData = this.data?.salaryData;

    this.salaryForm = new FormGroup({
      id: new FormControl(this.salaryData?.id, null),
      staffName: new FormControl(this.salaryData?.staffName, [Validators.required]),
      basicSalary: new FormControl(this.salaryData?.basicSalary, [Validators.required]),
      overtime: new FormControl(this.salaryData?.overtime, [Validators.required]),
      deduction: new FormControl(this.salaryData?.deduction, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.salaryForm.valid) {
      const salary = this.salaryForm.value;
      if (this.salaryData?.id) {
        // Update salary
        this.salaryService.addSalary(salary).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        // Add new salary
        this.salaryService.updateSalary(this.salaryData?.id,salary).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
