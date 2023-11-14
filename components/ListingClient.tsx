"use client";

import useLoginModel from "@/hook/useLoginModal";
import { SafeReservation, SafeUser, safeListing } from "@/types";
import axios from "axios";
import { timeStamp } from "console";
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

// const initialTimeRange = {
//   startTime: new Date(),
//   endTime: new Date(),
//   key: "selection",
// };

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

  //disable time to be implented instead of disable date
  const disableDates = reservations.map((reservation) => new Date(reservation.startDate));


  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<[Date, Date]>([
    new Date(1970, 0, 1, 10, 0),
    new Date(1970, 0, 1, 11, 0)
  ]);


  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    setIsLoading(true);

    axios.post("/api/reservations", {
      totalPrice,
      startDate: selectedDate.toISOString(),
      startTime: selectedTimeSlot[0].toISOString(),
      endTime: selectedTimeSlot[1].toISOString(),
      listingId: listing.id,
    })
      .then(() => {
        toast.success("Reservation Successful!");
        setSelectedDate(initialDate);
        router.push("/bookings");
      })
      .catch(() => {
        toast.error("Error in Reservation");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, selectedDate, selectedTimeSlot, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (selectedDate && selectedTimeSlot) {
      const timeDifferenceInMilliseconds = new Date(selectedTimeSlot[1]).getTime() - new Date(selectedTimeSlot[0]).getTime();;
      const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);
      setTotalPrice(timeDifferenceInHours * listing.price);
    }
  }, [selectedDate, selectedTimeSlot, listing.price]);



    const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);


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