export type Organization = {
  organization_no: number;
  organization_name: string;
};

export type VendingMachine = {
  vendingmachine_no: number;
  vendingmachine_name: string;
};

export type Employee = {
  employee_no: number;
  first_name: string;
  last_name: string;
  email: string;
  auth_user_id: string;
};

export interface OhgoVisualizationRow {
  with_employee_name: string | null;
  organization_no: string | null;
  [key: `vendingmachine_${number}`]: boolean;
}

export interface OhgoVisualizationResponse {
  data: OhgoVisualizationRow[];
}
