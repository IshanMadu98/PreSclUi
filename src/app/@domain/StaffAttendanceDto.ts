export interface StaffAttendanceDto {
  id?: string;
  staffId: string;
  staffName?: string;
  date: string;
  attendanceTime?: string | null;
  leaveTime?: string | null;
  attendanceMarked?: boolean;
}
