import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
}
export function Image({ src, alt, width = 45 }: ImageProps) {
  const FALLBACK_IMAGE = "/image-not-found.jpg";
  const [loading, setOnloading] = useState(false);
  const imageOnLoadHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    if (event.currentTarget.className !== "error") {
      event.currentTarget.className = "success";
      setOnloading(false);
    }
  };
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = FALLBACK_IMAGE;
    event.currentTarget.className = "error";
    setOnloading(false);
  };

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <img
      src={src}
      width={width}
      onLoad={imageOnLoadHandler}
      onError={imageOnErrorHandler}
      alt={alt}
    />
  );
}
