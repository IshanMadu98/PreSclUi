import { Component } from '@angular/core';
import { StudentService } from '../../../../@application/services/student.service';
import { StudentDto } from '../../../../@domain/StudentDto';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddUpdateStudentDialogComponent } from './add-update-student-dialog/add-update-student-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  students: StudentDto[] = [];
  studentForm: StudentDto = {} as StudentDto;
  expandSet = new Set<string>();

  constructor(private dialog: MatDialog, private modal: NzModalService, private studentService: StudentService, private message: NzMessageService) { }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  AddStudent() {
    const dialogRef = this.dialog.open(AddUpdateStudentDialogComponent, {
      width: '50%',
      data: {
        title: 'Add Student',
        btnTitle: 'Add',
      },
    })
    this.reloadAfterClosed(dialogRef)
  }

  UpdateStudent(student: StudentDto) {
    const dialogRef = this.dialog.open(AddUpdateStudentDialogComponent, {
      width: '50%',
      data: {
        title: 'Update Student',
        btnTitle: 'Update',
        studentData: student
      }
    })
    this.reloadAfterClosed(dialogRef)
  }

  private reloadAfterClosed(dialogRef: MatDialogRef<any>) {
    dialogRef.afterClosed().subscribe({
      next: value => {
        this.loadStudents();
      }
    })
  }


  deleteStudent(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this student?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.studentService.deleteStudent(id).subscribe(
          () => {
            this.message.success('Student deleted successfully');
            this.loadStudents();
          },
          (error) => {
            this.message.error('Failed to delete student');
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        this.message.info('Deletion canceled');
      }
    });
  }


  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (students: StudentDto[]) => {
        this.students = students;
        console.log(this.students);

      },
      (error) => {
        this.message.error('Failed to load students');
      }
    );
  }
}
