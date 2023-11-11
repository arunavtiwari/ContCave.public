"use client";

import useLoginModel from "@/hook/useLoginModal";
import { SafeReservation, SafeUser, safeListing } from "@/types";
import axios from "axios";
import { timeStamp } from "console";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "react-date-range";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Container from "./Container";
import ListingHead from "./listing/ListingHead";
import ListingInfo from "./listing/ListingInfo";
import ListingReservation from "./listing/ListingReservation";
import { categories } from "./navbar/Categories";

const initialDate = new Date();

const initialTimeRange = {
  startTime: new Date(),
  endTime: new Date(),
  key: "selection",
};

type Props = {
  reservations?: SafeReservation[];
  listing: safeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

function ListingClient({ reservations = [], listing, currentUser }: Props) {
  const router = useRouter();
  const loginModal = useLoginModel();


  const disableDates = reservations.map((reservation) => new Date(reservation.startDate));

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<[Date, Date]>([
    new Date(1970, 0, 1, 10, 0), // initial start time (10:00 AM)
    new Date(1970, 0, 1, 11, 0)  // initial end time (11:00 AM)
  ]);


  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    setIsLoading(true);

    axios.post("/api/reservations", {
      totalPrice,
      startDate: selectedDate, // Format the date if needed
      startTime: selectedTimeSlot[0], // Format the time
      endTime: selectedTimeSlot[1],
      listingId: listing.id,
    })
      .then(() => {
        toast.success("Reservation Successful!");
        setSelectedDate(new Date());
        setSelectedTimeSlot([
          new Date(1970, 0, 1, 10, 0), // initial start time (10:00 AM)
          new Date(1970, 0, 1, 11, 0)  // initial end time (11:00 AM)
        ]);
        router.push("/bookings");
      })
      .catch(() => {
        toast.error("Error in Reservation");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, selectedDate, selectedTimeSlot, listing.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (selectedDate && selectedTimeSlot && listing.price) {
      const [startTime, endTime] = selectedTimeSlot;

      // Get hours and minutes from Date objects
      const startHours = startTime.getHours();
      const startMinutes = startTime.getMinutes();
      const endHours = endTime.getHours();
      const endMinutes = endTime.getMinutes();

      // Calculate duration in minutes
      const durationInMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

      // Calculate total price
      setTotalPrice((durationInMinutes / 60) * listing.price);
    }
  }, [selectedDate, selectedTimeSlot, listing.price]);



  const category = categories.find((item) => item.label === listing.category);


  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                setSelectDate={(value) => setSelectedDate(value)}
                selectedDate={selectedDate}
                setSelectTime={(value) => setSelectedTimeSlot(value)}
                selectedTime={selectedTimeSlot}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;