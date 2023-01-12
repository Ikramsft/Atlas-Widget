import Image from "next/image";

import React from "react";
import { IMAGE } from "../../lib/constants";

const Logo = React.forwardRef(({ type, placeholder, color, ...props }, ref) => {
  return (

    <Image
      src={IMAGE.PATH}
      width={IMAGE.WIDTH}
      height={IMAGE.HEIGHT}
      alt={IMAGE.ALT}

    />

  );
});

export default Logo;
