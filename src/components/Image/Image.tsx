import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface ImageProps {
  src: string;
  alt: string;
}
export function Image({ src, alt }: ImageProps) {
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
      width={45}
      onLoad={imageOnLoadHandler}
      onError={imageOnErrorHandler}
      alt={alt}
    />
  );
}
