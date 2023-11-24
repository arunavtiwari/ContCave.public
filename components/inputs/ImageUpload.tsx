"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

type Props = {
  onChange: (value: string[]) => void;
  values: string[];
};

function ImageUpload({ onChange, values }: Props) {
  const handleCallback = useCallback(
    (result: any) => {
      const urls = Array.isArray(result.info.secure_url)
        ? result.info.secure_url
        : [result.info.secure_url];

      onChange([...values, ...urls]);
    },
    [onChange, values]
  );

  return (
    <CldUploadWidget
      onUpload={handleCallback}
      uploadPreset="phxjukr6"
      options={{
        maxFiles: 10,
        multiple: true
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className=" relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {values.length > 0 && (
              <div className=" absolute inset-0 w-full h-full">
                {values.map((url, index) => (
                  <Image
                    key={index}
                    alt={`upload-${index}`}
                    fill
                    style={{ objectFit: "cover" }}
                    src={url}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
