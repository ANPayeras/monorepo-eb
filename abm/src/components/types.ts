import { HTMLAttributeAnchorTarget, ReactNode } from "react";

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  cancelText?: string;
  acceptText?: string;
  title: string;
  description: string;
};

export type SheetPaymentProps = {
  open: boolean;
  handleChange: () => void;
  children: ReactNode;
  title: string;
  description?: string;
  descriptionClassName?: string;
};

export type LinkWordProps = {
  link: string;
  text?: string;
  target?: HTMLAttributeAnchorTarget;
};
export type SpinnersColors =
  | "white"
  | "current"
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

export type LoaderSpinnerProps = {
  size?: "sm" | "md" | "lg" | undefined;
  className?: string;
  color?: SpinnersColors;
};
