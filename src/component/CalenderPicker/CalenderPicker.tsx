'use client';

import { Box, IconButton, Popover, Stack, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers";

const CalendarPicker = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setSelectedDate(value);
      handleClose();
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems={"center"}
        spacing={2}
        justifyContent={"center"}
      >
        <Typography variant="body1">
          {selectedDate.format("YYYY年MM月DD日")}
        </Typography>
        <IconButton onClick={handleOpen}>
          <CalendarMonthIcon />
        </IconButton>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={selectedDate} onChange={handleDateChange} />
          </LocalizationProvider>
        </Popover>
      </Stack>
    </Box>
  );
};

export default CalendarPicker;
