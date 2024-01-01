import clsx from "clsx";
import React from "react";

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(className, "btn md:text-lg xl:text-base xl:px-3 xl:py2")}
    >
      {children}
    </button>
  );
}
