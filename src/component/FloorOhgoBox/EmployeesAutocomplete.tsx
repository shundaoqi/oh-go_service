"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useEmployees } from "../../../hooks/useEmployees";
import { Employee } from "../../../type/type";

type Props = {
  value: Employee | null;
  employeeNo: number | null;
  handleChange: (employee: Employee | null) => void;
};

const EmployeesAutocomplete = ({ value, employeeNo, handleChange }: Props) => {
  const { employees } = useEmployees();
  const filteredEmployees = employees.filter(
    (employee) => Number(employee.employee_no) !== employeeNo
  );


  return (
    <Autocomplete
      disablePortal
      options={filteredEmployees}
      getOptionLabel={(option) =>
        option
          ? `${option.last_name} ${
              option.first_name
            } (${option.employee_no.toString()})`
          : ""
      }
      sx={{
        width: 300,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
        },
      }}
      value={value}
      onChange={(_event, newValue) => {
        handleChange(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="誰と？" />}
    />
  );
};

export default EmployeesAutocomplete;
