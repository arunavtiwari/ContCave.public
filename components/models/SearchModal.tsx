"use client";

import useSearchModal from "@/hook/useSearchModal";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';


import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import CitySelect, { CitySelectValue } from "../inputs/CitySelect";
import Modal from "./Modal";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  TIME = 2,
}

type Props = {};

function SearchModal({}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const searchModel = useSearchModal();
  type ValuePiece = Date | string | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [location, setLocation] = useState<CitySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<Value>(['10:00', '11:00']);
  

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.TIME) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      selectedDate: formatISO(selectedDate),
      selectedTime
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModel.onClose();

    router.push(url);
  }, [step, searchModel, location, router, selectedDate, selectedTime, onNext, params]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.TIME) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna shoot?"
        subtitle="Find the perfect location!"
      />
      <CitySelect
        value={location}
        onChange={(value) => setLocation(value as CitySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Select a Date"
          subtitle="Choose the date for your booking"
        />
        <Calendar
          value={selectedDate}
          onChange={(value) => setSelectedDate(value)}
        />
      </div>
    );
  }

  if (step === STEPS.TIME) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Select Time Slot"
          subtitle="Choose the time range for your booking"
        />
        <TimeRangePicker
          value={selectedTime}
          onChange={(value) => setSelectedTime(value as Value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModel.isOpen}
      onClose={searchModel.onClose}
      onSubmit={onSubmit}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondActionLabel}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
}

export default SearchModal;
