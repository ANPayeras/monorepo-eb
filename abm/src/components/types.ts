import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributeAnchorTarget,
  ReactNode,
  VideoHTMLAttributes,
} from "react";

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

export type RowProps = { title: string; description: string };

export type BgVideoPlayerProps = {
  src: string;
  videoProps?: DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >;
  className?: string;
  style?: CSSProperties;
};

export type RowPlanLimitsProps = {
  quantity: number;
  limit: number;
};
