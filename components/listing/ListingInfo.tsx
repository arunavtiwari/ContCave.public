"use client";

import useCities from "@/hook/useCities";
import { SafeUser } from "@/types";
import dynamic from "next/dynamic";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Sleep from "../Sleep";
import Offers from "../Offers";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

type Props = {
  user: SafeUser;
  description: string;
  category:
  | {
    icon: IconType;
    label: string;
    description: string;
  }
  | undefined;
  locationValue: string;
};

function ListingInfo({
  user,
  description,
  category,
  locationValue,
}: Props) {
  const { getByValue } = useCities();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className=" text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} userName={user?.name} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
     
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Offers />
      <hr />
      <p className="text-xl font-semibold">{`Where you’ll be`}</p>
      <Map center={coordinates} locationValue={locationValue} />
    </div>
  );
}

export default ListingInfo;
