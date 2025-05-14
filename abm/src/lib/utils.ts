import { assetsTypesPermitted } from "@/constants";
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

export const checkLoadingQuery = (query: any) => {
  return typeof query === "undefined";
};

const splitAmountToInput = (
  value: number
): { numbers: string; decimals: string } => {
  let numbers = "0";
  let decimals = "00";
  const tempNumber = value ? value.toFixed(2) : (+value).toFixed(2);
  const formatedNumber = tempNumber
    .toString()
    .replace(/^0+/, "")
    .replace(".", "");
  if (formatedNumber.length > 2) {
    decimals = formatedNumber.substr(formatedNumber.length - 2, 2);
    numbers = formatedNumber.substr(0, formatedNumber.length - 2);
  } else {
    decimals =
      formatedNumber.length === 1 ? `0${formatedNumber}` : formatedNumber;
    numbers = "0";
  }

  return {
    numbers,
    decimals,
  };
};

const formatNumbers = (numbers: string): string =>
  numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const amountToCurrency = (value: number): string => {
  const { numbers, decimals } = splitAmountToInput(value);

  const formattedNumbers = formatNumbers(numbers);

  return `$${formattedNumbers},${decimals}`;
};

export const checkAsset = (file: File) => {
  const validSize = file.size < 25000000; // 25 MB
  const validType = assetsTypesPermitted.includes(file.type);

  if (!validSize || !validType) throw new Error("Tamaño o formato inválido");
};
