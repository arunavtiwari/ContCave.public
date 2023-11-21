"use client";
import Logo from "@/components/navbar/Logo";
import React, { useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";
import FooterColumn from "@/components/FooterColumn";
import {
  BsLinkedin, BsInstagram
} from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Icon } from "leaflet";

type Props = {};

function Footer({ }: Props) {
  const [country, setCountry] = useState("India");

  const itemData = [
    ["Company", "About", "Guides", "Blog"],
    ["Support", "Help Center", "Guielines", "Safety", "FAQ"],
    ["Activities", "Photo Shoot", "Filming Content", "Event", "Wedding", "Party", "Birthday", "Outdoor Event"],
    ["Cities", "Delhi", "Mumbai"],
  ];

  useEffect(() => {
    fetch(
      `https://extreme-ip-lookup.com/json/?key=${process.env.NEXT_PUBLIC_LOOKUP_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCountry(data.country));
  }, []);

  const footerColumns = itemData.map((item, index) => (
    <FooterColumn index={index} data={item} />
  ))

  return (
    <ClientOnly>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
        <div className="md:col-span-1 grid grid-rows-auto-1 gap-y-4">
          <div className="md:col-span-1">
            <Logo />
          </div>
          <div className="md:col-span-1 flex flex-col  space-y-2">
            <p className="text-lg font-semibold">Subscribe to our newsletter</p>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="border p-2"
              />
              <button className="bg-black text-white px-4 py-2 rounded">
                Subscribe
              </button>
            </div>
          </div>

          <div className="md:col-span-1 flex items-center space-x-4">
            <p className="text-lg font-semibold">Follow Us</p>
            <a href="https://www.linkedin.com/company/contcave/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <BsLinkedin size={24} />
            </a>
            <a href="https://www.linkedin.com/company/contcave/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter size={24} />
            </a>
            <a href="https://www.linkedin.com/company/contcave/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <BsInstagram size={24} />
            </a>
          </div>
          <div className="md:col-span-1 flex items-center space-x-4">
            <p className="text-lg font-semibold">
              Have a question? Feel free to reach out to us at{" "}
              <a href="mailto:support@contcave.tech" className="text-blue-500 underline">
                support@contcave.tech
              </a>
            </p>
          </div>


        </div>

        {/* <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-y-10">
          {footerColumns}
        </div> */}

        <p className="text-sm md:col-span-5">{country}</p>
      </div>
    </ClientOnly>

  );
}

export default Footer;
