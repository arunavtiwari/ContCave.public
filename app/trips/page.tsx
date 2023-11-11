import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import BookingClient from "./BookingClient";

type Props = {};

const BookingPage = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservation({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No bookings found"
          subtitle="Looks like you havent booked for any space."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BookingClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default BookingPage;
