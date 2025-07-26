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

export type OhgoVisualizationRow = {
  with_employee_name: string | null;
  organization_no: string | null;
  [key: `vendingmachine_${number}`]: boolean;
};

export type OhgoVisualizationResponse = {
  data: OhgoVisualizationRow[];
};

export type FloorOhgoBoxProps = {
  floor: string;
  floor_no: number;
};

export type Ohgo = {
  ohgo_no: number;
  employee_no: number;
  with_employee_no: number | null;
  vendingmachine_no: number;
  did_ohgo: boolean;
};
