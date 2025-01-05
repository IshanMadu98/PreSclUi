import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleSalaryDto } from '../../../../../../../@domain/RoleSalaryDto';
import { RoleSalaryService } from '../../../../../../../@application/services/role-salary-service';
import { FormHelper, KeyString, KeyValue } from '../../../../../../../@application/form.helper';

@Component({
  selector: 'app-add-update-role-salary-dialog',
  templateUrl: './add-update-role-salary-dialog.component.html',
  styleUrls: ['./add-update-role-salary-dialog.component.scss'],
})
export class AddUpdateRoleSalaryDialogComponent {
  roleSalaryForm: FormGroup;
  title: string;
  btnTitle: string;
  roleSalaryData: RoleSalaryDto = {} as RoleSalaryDto;
  staffRoleKeyValue = [] as KeyValue[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; btnTitle: string; roleSalaryData: RoleSalaryDto },
    private dialogRef: MatDialogRef<AddUpdateRoleSalaryDialogComponent>,
    private roleSalaryService: RoleSalaryService,
    private message: NzMessageService
  ) {
    this.title = this.data.title;
    this.btnTitle = this.data.btnTitle;
    this.roleSalaryData = this.data?.roleSalaryData;

    this.roleSalaryForm = new FormGroup({
      id: new FormControl(this.roleSalaryData?.id, null),
      staffRole: new FormControl(this.roleSalaryData?.staffRole, [Validators.required]),
      baseSalary: new FormControl(this.roleSalaryData?.basicSalary, [Validators.required]),
    });
    this.staffRoleKeyValue = FormHelper.GetStaffRoleKeyValue();
    this.staffRoleKeyValue = this.staffRoleKeyValue.filter((role) => role.key !== 5);
  }

  onSubmit() {
    if (this.roleSalaryForm.valid) {
      const roleSalary = this.roleSalaryForm.value;
      if (this.roleSalaryData?.id) {
        // Update role salary
        this.roleSalaryService.updateRoleSalary(this.roleSalaryData?.id,roleSalary).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        // Add new role salary
        this.roleSalaryService.addRoleSalary(roleSalary).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
