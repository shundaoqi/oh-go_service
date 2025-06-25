"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useEmployees } from "../../../hooks/useEmployees";

const EmployeesAutocomplete = () => {
  const { employees, error } = useEmployees();

  if (error) return <p>Error: {error}</p>;

  return (
    <Autocomplete
      disablePortal
      options={employees}
      getOptionLabel={(option) =>
        `${option.last_name} ${option.first_name} (${option.employee_no})`
      }
      sx={{
        width: 300,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white", // 背景色を白に設定
        },
      }}
      renderInput={(params) => <TextField {...params} label="誰と？" />}
    />
  );
};

export default EmployeesAutocomplete;
