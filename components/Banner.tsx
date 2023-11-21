"use client";

import React, { useRef } from "react";
import Search from "./navbar/Search";
type BannerProps = {};


function Banner({ }: BannerProps) {
    return (
        <div className="flex p-8 items-center mb-0"> {/* Added mb-0 for bottom margin */}
            {/* Left Column - Image */}
            <div className="flex-shrink-0 pr-8" style={{ flex: "3" }}>
                <img
                    src="assets/banner-img.png"
                    alt="Banner Image"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            {/* Right Column - Text and Buttons */}
            <div className="flex flex-col flex-grow" style={{ flex: "2" }}>
                <h1 className="text-7xl font-bold mb-4" style={{ fontFamily: 'YourChosenFontFamily' }}>
                    Book a Studio or Open Space for Your Next Project
                </h1>
                <p className="text-gray-600 mb-6">
                    We are your dedicated platform for creative space solutions. We handle
                    everything from discovery to booking.
                </p>

            </div>
        </div>
    );
}

export default Banner;