"use client";

import * as React from "react";
import { cn } from "cn";
import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function PasswordInput(
  { className, ...props }: React.ComponentProps<"input">,
  ref,
) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        ref={ref}
        className={cn("pr-10", className)}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
        {showPassword ? (
          <EyeIcon
            className="h-4 w-4 text-gray-400"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <EyeOffIcon
            className="h-4 w-4 text-gray-400"
            onClick={() => setShowPassword(true)}
          />
        )}
      </span>
    </div>
  );
}

export { PasswordInput };
