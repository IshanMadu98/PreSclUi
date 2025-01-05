import { UserRole } from "../@application/enums/UserRole";

export interface RoleSalaryDto {
  id: string;
  staffRole: UserRole; // Enum representing the role of the staff
  basicSalary: number; // Base salary assigned to the role
}
