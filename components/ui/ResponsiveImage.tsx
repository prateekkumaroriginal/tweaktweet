"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  maxWidth: number;  // Max width of container
  maxHeight: number; // Max height of container
}

export default function ResponsiveImage({ src, alt, maxWidth, maxHeight }: ResponsiveImageProps) {
  const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      const { width, height } = img;

      // If both dimensions are within the max limits, keep original size
      if (width <= maxWidth && height <= maxHeight) {
        setImgSize({ width, height });
      }
      // If width exceeds max but height is fine, scale by width
      else if (width > maxWidth && height <= maxHeight) {
        const scale = maxWidth / width;
        setImgSize({ width: maxWidth, height: height * scale });
      }
      // If height exceeds max but width is fine, scale by height
      else if (height > maxHeight && width <= maxWidth) {
        const scale = maxHeight / height;
        setImgSize({ width: width * scale, height: maxHeight });
      }
      // If both exceed max limits, scale down while maintaining aspect ratio
      else {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        setImgSize({ width: width * scale, height: height * scale });
      }
    };
  }, [src, maxWidth, maxHeight]);

  return (
    <Image
      src={src}
      alt={alt}
      width={imgSize.width}
      height={imgSize.height}
      className="rounded-lg shadow-md"
    />
  );
}
