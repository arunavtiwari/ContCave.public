"use client";

import React from "react";
import "@/styles/globals.css";
import { formatISO } from "date-fns";
import Calendar from "../inputs/Calendar";
import Button from "../Button";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';

type Props = {
  price: number;
  totalPrice: number;
  setSelectDate: (value: Date) => void;
  selectedDate: Date;
  setSelectTime: (value: [string, string]) => void; 
  selectedTime: [string, string]; 
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

function ListingReservation({
  price,
  totalPrice,
  setSelectDate,
  selectedDate,
  setSelectTime,
  selectedTime,
  onSubmit,
  disabled,
  disabledDates
}: Props) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="flex gap-1 text-2xl font-semibold">
          ₹ {price} <p className="font-light text-neutral-600">/hour</p>
        </p>
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg"><h1>Select Date for Booking</h1></div>

      <Calendar
        value={selectedDate}
        disabledDates={disabledDates}
        onChange={(value) => setSelectDate(value)}
      />
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg"><h1>Pick your Time Slot</h1></div>
      <TimeRangePicker
        value={selectedTime}
        onChange={(value) => setSelectTime(value as [string, string])}
        rangeDivider=" to "
        className="w-full my-custom-timepicker "
        autoFocus={true}
      />

      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <p>Total</p>
        <p> ₹ {totalPrice}</p>
      </div>
    </div>
  );
}

export default ListingReservation;
