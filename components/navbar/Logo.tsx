"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function Logo({ }: Props) {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")}>
      <div className="logo-container">
        <Image
          alt="logo-large"
          layout="responsive"
          height="100"
          width="200"
          src="/assets/logo.png"
        />
      </div>
      <style jsx>{`
        .logo-container {
          max-width: 200px; /* Set the maximum width of the logo container */
          width: 100%; /* Make sure it takes up the full width of its container */
        }
      `}</style>
    </div>
  );
}

export default Logo;
