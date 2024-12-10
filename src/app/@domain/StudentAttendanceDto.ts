export interface StudentAttendanceDto {
  id?: string;
  studentId: string;
  studentName?: string;
  date: string;
  isPresent?: boolean;
  attendanceMarked?: boolean;
}
