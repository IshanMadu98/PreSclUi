export interface StudentAttendanceDto {
  id?: string;
  studentId: string;
  studentNo?:string;
  studentName?: string;
  date: string;
  isPresent?: boolean;
  attendanceMarked?: boolean;
}
