export interface LeaveRequestDto {
  id: string;
  staffId: string;
  staffName: string;
  leaveType: number;
  session: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: number;
  approvedBy: string;
  approvedDate: string;
  requestedDate: string;
}
