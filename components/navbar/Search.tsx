"use client";

import useCountries from "@/hook/useCities";
import useSearchModal from "@/hook/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

function Search({ }: Props) {
  const searchModel = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("selectedDate");
  const timeSlot = params?.get("timeSlot");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "City"; // 
  }, [getByValue, locationValue]);

  const dateLabel = useMemo(() => {
    if (startDate) {
      const start = new Date(startDate as string);
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
      const formattedDate = start.toLocaleString('en-US', options);

      // Adjust the fontSize as needed
      const styledDate = <span style={{ fontSize: '14px' }}>{formattedDate}</span>;
      return styledDate;
    }

    return "Date";
  }, [startDate]);

  const timeSlotLabel = useMemo(() => {
    if (timeSlot) {
      return `${timeSlot}`;
    }

    return "Time";
  }, []);

  return (
    <div
      onClick={searchModel.onOpen}
      className="border-[1px] md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-losm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {dateLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block text-center">{timeSlotLabel}</div>
          <div className="p-2 bg-yellow-700 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
