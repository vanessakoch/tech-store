import { InputHTMLAttributes } from "react";
import FormError from "./FormError";
import { cn } from "@/lib/utils";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function FormInput({
  label,
  error,
  className,
  ...props
}: FormInputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      

      <input
        {...props}
        className={cn(
          "w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black",
          className
        )}
      />

      <FormError message={error} />

    </div>
  );
}
