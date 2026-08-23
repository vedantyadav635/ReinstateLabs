import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-pads an index for the editorial "01 / 02 / 03" numbering used site-wide. */
export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}
