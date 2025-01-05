export interface SalaryDto {
  id: string;
  staffId: string;
  staffName: string; // Full name of the staff
  basicSalary: number; // Base salary amount
  overtime: number; // Overtime payment
  deduction: number; // Deductions applied
  totalSalary: number; // Calculated total salary before deductions
  finalSalary: number; // Final payable salary
  createdAt?: Date; // Optional: Record creation date
  updateAt?: Date; // Optional: Record last update date
}
