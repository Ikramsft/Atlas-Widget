import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "react-image-lightbox";

function SingleLightbox({ thumb, className, large }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Link href="#" onClick={() => setIsOpen(true)}>
        <a><Image width="40px" height="40px" src={thumb} alt="thumbnail" className={className} /></a>
      </Link>

      {isOpen && (
        <Lightbox mainSrc={large} onCloseRequest={() => setIsOpen(false)} />
      )}
    </>
  );
}
export default SingleLightbox;
