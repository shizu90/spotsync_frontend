import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addressToString(address: {
  sub_area: string,
  area: string,
  country_code: string,
  locality?: string,
  street_number?: string,
  postal_code?: string,
}) {
  let string = "";

  if (address.street_number) {
      string += `${address.street_number}, `;   
  }

  if (address.locality) {
      string += `${address.locality}, `;
  }

  string += `${address.sub_area}, ${address.area}, ${address.country_code}`;

  return string;
}