"use client";

import Image from "next/image";
import React, { useState } from "react";

const ImageWithFallback = (props: {
  src: string;
  alt: string;
  className: string;
  width?: number;
  height?: number;
}) => {
  const [imgSrc, setImgSrc] = useState(props.src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900 animate-pulse rounded-lg"></div>
      )}
      <Image
        width={props.width || 400}
        height={props.height || 300}
        {...props}
        src={imgSrc}
        alt={props.alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc("/images/placeholder.jpeg");
          setIsLoading(false);
        }}
        className={`${props.className} transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default ImageWithFallback;
