"use client";
import Logo from "@/components/navbar/Logo";
import React, { useEffect, useState } from "react";
import ClientOnly from "../components/ClientOnly";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type Props = {};

function Footer({ }: Props) {
  const [country, setCountry] = useState("India");
  const router = useRouter();

  useEffect(() => {
    fetch(`https://extreme-ip-lookup.com/json/?key=${process.env.NEXT_PUBLIC_LOOKUP_KEY}`)
      .then((res) => res.json())
      .then((data) => setCountry(data.country));
  }, []);

  return (
    <ClientOnly>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-10 px-10 py-10 bg-gray-100 text-gray-600">
        <div className="md:col-span-1 grid grid-rows-auto-1 gap-y-4">
          <div className="md:col-span-1">
            <Logo />
          </div>
          <div className="md:col-span-1 flex flex-col space-y-2">
            <p className="text-lg font-semibold">Subscribe to our newsletter</p>
            <div className="flex items-center space-x-2">
              <input type="email" placeholder="Enter your email" className="border p-2" />
              <button className="bg-black text-white px-4 py-2 rounded">Subscribe</button>
            </div>
          </div>

          <div className="md:col-span-1 flex items-center space-x-4">
            <p className="text-lg font-semibold">Follow Us</p>
            <a href="https://www.linkedin.com/company/contcave/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <BsLinkedin size={24} />
            </a>
            <a href="https://x.com/contcave/" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/contcave/" target="_blank" rel="noopener noreferrer">
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

        <div className="md:col-span-1 px-6 pt-10 flex flex-col space-y-2">
          <p className="text-xl font-bold text-black mb-4">Company</p>
          <a onClick={() => { router.push("/about") }} className="cursor-pointer text-black">About</a>
          <a onClick={() => { router.push("/about") }} className="cursor-pointer text-black">Privacy Policy</a>
          <a onClick={() => { router.push("/about") }} className="cursor-pointer text-black">Terms & Conditions</a>
        </div>

        <div className="md:col-span-1 px-6 pt-10 flex flex-col space-y-2">
          <p className="text-xl font-bold text-black mb-4">Support</p>
          <a href="#" className="text-black">Help Center</a>
          <a href="#" className="text-black">Guidelines</a>
          <a href="#" className="text-black">Safety</a>
          <a href="#" className="text-black">FAQ</a>
        </div>


        <div className="md:col-span-1 px-6 pt-10 flex flex-col space-y-2">
          <p className="text-xl font-bold text-black mb-4">Activities</p>
          <a href="#" className="text-black">Photo Shoot</a>
          <a href="#" className="text-black">Filming Content</a>
          <a href="#" className="text-black">Pre-Wedding Shoot</a>
          <a href="#" className="text-black">Outdoor Event</a>
          <a href="#" className="text-black">Podcasts</a>
          <a href="#" className="text-black">Party</a>
          <a href="#" className="text-black">Meetings</a>
        </div>

        <div className="md:col-span-1 px-6 pt-10 flex flex-col space-y-2">
          <p className="text-xl font-bold text-black mb-4">Cities</p>
          <a href="#" className="text-black">Delhi</a>
          <a href="#" className="text-black">Mumbai</a>
        </div>

        <p className="text-sm md:col-span-5">{country}</p>
      </div>
    </ClientOnly>
  );
}

export default Footer;
