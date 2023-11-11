import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// Import necessary components from 'react-date-range'
import { Calendar as ReactDateRangeCalendar, DateRange } from 'react-date-range';

type Props = {
  value: Date; // Change the type to Date for single date
  onChange: (value: Date) => void; // Adjust the onChange function
  disabledDates?: Date[];
};

function Calendar({ value, onChange, disabledDates }: Props) {
  // Use the Calendar component directly from 'react-date-range'
  return (
    <ReactDateRangeCalendar
      date={value} // Set the selected date
      onChange={(newDate) => onChange(newDate as Date)} // Adjust the onChange function
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
}

export default Calendar;
