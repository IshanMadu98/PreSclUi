import { Component, Inject } from '@angular/core';
import { StudentDto } from '../../../../../@domain/StudentDto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../../../../@application/services/student.service';

@Component({
  selector: 'app-add-update-student-dialog',
  templateUrl: './add-update-student-dialog.component.html',
  styleUrl: './add-update-student-dialog.component.scss',
})
export class AddUpdateStudentDialogComponent {
  title!: string;
  btnTitle!: string;
  studentData = {} as StudentDto;
  studentForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { title: string; btnTitle: string; studentData: StudentDto },
    private studentService: StudentService,
    private dialogRef: MatDialogRef<AddUpdateStudentDialogComponent>
  ) {
    this.title = this.data.title;
    this.btnTitle = this.data.btnTitle;
    this.studentData = this.data.studentData;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentForm = new FormGroup({
      id: new FormControl(this.studentData?.id, null),
      studentNo: new FormControl(this.studentData?.studentNo, [Validators.required,]),
      firstName: new FormControl(this.studentData?.firstName, [Validators.required,]),
      lastName: new FormControl(this.studentData?.lastName, [Validators.required,]),
      email: new FormControl(this.studentData?.email, [Validators.required, Validators.email,]),
      phoneNumber: new FormControl(this.studentData?.phoneNumber, [Validators.required, Validators.pattern('^\\+?[0-9]{10,12}$'),]),
      dateOfBirth: new FormControl(this.studentData?.dateOfBirth, [Validators.required,]),
      gender: new FormControl(this.studentData?.gender, [Validators.required]),
      enrollmentDate: new FormControl(this.studentData?.enrollmentDate, [Validators.required,]),
      parentFullName: new FormControl(this.studentData?.parentFullName, [Validators.required,]),
      parentEmail: new FormControl(this.studentData?.parentEmail, [Validators.required, Validators.email,]),
      parentAddress: new FormControl(this.studentData?.parentAddress, [Validators.required,]),
      parentNIC: new FormControl(this.studentData?.parentNIC, [Validators.required, Validators.pattern('[0-9]{9}[vV]|[0-9]{12}'),]),
      photo: new FormControl()
    });
  }

  onSubmit(): void {
    console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      const data = this.studentForm.value;
      if (this.btnTitle === 'Add') {
        this.addStudent(data);
      } else {
        this.updateStudent(data);
      }
    }
  }

  private addStudent(data: StudentDto): void {
    this.studentService.addStudent(data).subscribe({
      next: (response) => {
        this.dialogRef.close(response); // Close the dialog and return the response.
      },
      error: (error) => {
        console.error('Error adding student:', error); // Handle any errors.
      },
    });
  }

  private updateStudent(data: StudentDto): void {
    this.studentService.updateStudent(data.id, data).subscribe({
      next: (response) => {
        this.dialogRef.close(response); // Close the dialog and return the response.
      },
      error: (error) => {
        console.error('Error updating student:', error); // Handle any errors.
      },
    });
  }
}
