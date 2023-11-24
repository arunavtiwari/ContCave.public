"use client";

import useCities from "@/hook/useCities";
import { SafeUser } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

type Props = {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
};

function ListingHead({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: Props) {
  const { getByValue } = useCities();
  const location = getByValue(locationValue);

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div></div>
      <Heading
        title={title}
        subtitle={`India, ${location?.label}`}
      />

      <Slider {...slickSettings}>

        {imageSrc.map((url, index) => (
          <div key={index} className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image
              src={url}
              alt={`image-${index}`}
              fill
              className="object-cover w-full"
            /></div>
        ))}
      </Slider>

      <div className="absolute top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>

    </>
  );
}

export default ListingHead;
