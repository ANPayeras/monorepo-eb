import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
