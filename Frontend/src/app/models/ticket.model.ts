export interface Ticket {
  id: string;
  tenantId: string;
  assignedEmployeeId?: string;
  categoryId: number;
  title: string;
  description: string;
  roomLocation: string;
  imageUrl?: string;
  priority: number;
  statusId: number;
  createdAt: Date;
  updatedAt?: Date;
}
