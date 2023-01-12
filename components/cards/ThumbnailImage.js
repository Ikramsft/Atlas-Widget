import classnames from "classnames";
import Image from "next/image";
import React from "react";

const ThumbnailImage = ({ alt, src, className, rounded, small }) => {
  return (
    <Image
      alt={alt}
      src={src}
      width="auto"
      height="auto"
      className={`img-thumbnail list-thumbnail align-self-center ${className}  ${classnames(
        {
          "rounded-circle": rounded,
          small,
        }
      )}`}
    />
  );
};

export default React.memo(ThumbnailImage);
