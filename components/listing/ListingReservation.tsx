"use client";

import React from "react";
import { Range } from "react-date-range";
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
  setSelectTime: (value: [Date, Date]) => void;
  selectedTime: [Date, Date];
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
          ₹ {price} <p className="font-light text-neutral-600">night</p>
        </p>
      </div>
      <hr />
      <Calendar
        value={selectedDate}
        disabledDates={disabledDates}
        onChange={(value) => setSelectDate(value)}
      />
      <hr />
      <TimeRangePicker
        value={selectedTime}
        onChange={(value) => setSelectTime(value as [Date, Date])}
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
