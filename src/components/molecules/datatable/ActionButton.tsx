"use client";

import { PropsWithChildren } from "react";

const ActionButton = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex max-w-max items-center justify-center gap-5">
      {children}
    </div>
  );
};

export default ActionButton;
