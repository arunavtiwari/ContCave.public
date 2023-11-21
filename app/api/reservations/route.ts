import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { listingId, startDate, startTime, endTime, totalPrice } = body;

  if (!listingId || !startDate || !startTime || !endTime || !totalPrice) {
    return NextResponse.error();
  }

  const listenAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          startTime,
          endTime,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listenAndReservation);
}
