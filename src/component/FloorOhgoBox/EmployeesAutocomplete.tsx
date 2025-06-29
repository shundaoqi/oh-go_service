"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useEmployees } from "../../../hooks/useEmployees";
import { Employee } from "../../../type/type";

type Props = {
  value: Employee | null;
  handleChange: (employee: Employee | null) => void;
};

const EmployeesAutocomplete = ({ value, handleChange }: Props) => {
  const { employees, error } = useEmployees();

  if (error) return <p>Error: {error}</p>;

  return (
    <Autocomplete
      disablePortal
      options={employees}
      getOptionLabel={(option) =>
        option
          ? `${option.last_name} ${option.first_name} (${option.employee_no.toString()})`
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