import { SelectSection } from "@/interfaces";
import {
  DeliverMethods,
  Layout,
  PaymentMethods,
  ResizableItem,
  Widget,
} from "@/stores/data-store";
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
  subTitle?: string;
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

export type PaymentMethodsProps = {
  selectSection?: (type: string) => void;
  paymentMethods: PaymentMethods[];
  editSection?: SelectSection;
  props?: any;
  layout: Layout;
  widget: Widget;
};

export type DeliverPreviewProps = {
  selectSection?: (type: string) => void;
  deliverMethods: DeliverMethods[];
  editSection?: SelectSection;
  props?: any;
  layout: Layout;
  widget: Widget;
};

export type ContentResizeWidgetProps = {
  value?: string;
  image?: string;
  textColor?: string;
  placeholder?: string;
  textAlign?: string;
};

export type MenuBarProps = {
  widget: Widget;
  panel?: ResizableItem;
  handleNestedWidgetChanges?: (data: ResizableItem) => void;
};

export type LinkWidgetEditProps = {
  widget: Widget;
  handleNestedWidgetChanges?: (data: ResizableItem) => void;
  panel?: ResizableItem;
  className?: string;
};
