import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const addDaysToDate = (startDate: Date, days: number) => {
  let _startDate = new Date(startDate.valueOf());
  _startDate.setDate(_startDate.getDate() + days);

  return _startDate;
};

export const getLocalDateAndTime = (date: string) => {
  const _date = new Date(date);
  return {
    date: _date.toLocaleDateString(),
    time: _date.toLocaleTimeString(),
  };
};
