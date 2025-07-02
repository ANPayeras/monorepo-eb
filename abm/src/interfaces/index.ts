import {
  Contact,
  DeliverMethods,
  ItemCart,
  Layout,
  PaymentMethods,
  resizableItem,
  Widget,
  WidgetData,
} from "@/stores/data-store";
import { Doc } from "../../convex/_generated/dataModel";
import { MutableRefObject } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { IColor } from "react-color-palette";
import { DropzoneOptions } from "react-dropzone";

declare global {
  interface Window {
    cardPaymentBrickController: any;
  }
}

export interface SectionsProps {}

export type InputCardProps = {
  type: string;
  title?: string;
  description?: string;
  handleAccept: (data: any) => Promise<any>;
  onCancel?: () => void;
  textButton: string;
  inputValue?: string;
  isPassword?: boolean;
};

export type GenericInputProps = {
  type: string;
  title: string;
  description: string;
  handleAccept: (data: any) => Promise<any>;
  onCancel: () => void;
  inputValue?: string;
  helperText: string;
};

export type EmptyLayoutProps = {
  selectSection: (type: string) => void;
  editSection: SelectSection;
  data: {
    layout: Layout;
    contact: Contact[];
    paymentMethods: PaymentMethods[];
    deliverMethods: DeliverMethods[];
  };
};

export type LayoutFeatures = {
  name: string;
  tabs: {
    title: string;
    value: string;
  }[];
  widgets: boolean;
};

export type SelectSection = {
  section: string;
  combo: number;
  widget: Widget | {};
};

export type EmptyTemplatesInterface = {
  mainTitle: string;
  linkTitle: string;
  linkUrl: string;
};

export type RightSectionInterface = {
  editSection: SelectSection;
  templateLayout: LayoutFeatures;
  swiperRef: MutableRefObject<SwiperType | undefined>;
  template: Doc<"templates">;
  userConvex: Doc<"users">;
};

export type ChangeColorFeatureInterface = {
  title: string;
  type: keyof Omit<Layout, "backgroundImg" | "backgroundVideo">;
  color: IColor;
  onChange: (color: IColor, type: string) => void;
};

export type MpBrickInterface = {
  email: string;
  amount: number;
  onReady: () => void;
  onUnmount: () => void;
  description: string;
};

export type UpdateImgToolProps = {
  isAsset: boolean;
  deleteAsset: () => void;
  onChangeFiles: (file: File[]) => void;
  onAccept: () => void;
  isUploading?: boolean;
  isSuccess?: boolean;
  dropzoneOptions?: DropzoneOptions;
  modalTexts?: {
    title?: string;
    subTitle?: string;
    description?: string;
  };
};

// Widgets

export type LinkWidgetInterface = {
  widget: Widget;
  editWidget: Widget;
  selectSection: (type: string, combo: number, widget: Widget | {}) => void;
  props?: any;
  layout?: Layout;
};

export type TextWidgetInterface = {
  widget: Widget;
  editWidget: Widget;
  selectSection: (type: string, combo: number, widget: Widget | {}) => void;
  props?: any;
  layout?: Layout;
};

export type ImgWidgetInterface = {
  widget: Widget;
  editWidget: Widget;
  selectSection: (type: string, combo: number, widget: Widget | {}) => void;
  props?: any;
  layout?: Layout;
};

export type ResizableWidgetInterface = {
  widget: Widget;
  editWidget: Widget;
  selectSection: (type: string, combo: number, widget: Widget | {}) => void;
  props?: any;
  layout?: Layout;
};

export type ImageWidgetInterface = {
  widget: Widget;
  title?: string;
  isNestedWidget?: boolean;
  handleNestedWidgetChanges?: (data: WidgetData) => void;
  panel?: resizableItem;
  className?: string;
  layout?: Layout;
};

export type DetailMetricsResponse = [
  string,
  string | null,
  string | null,
  string | null,
  number,
][];

export type FlagsKeys = "payment";

export type SwiperTemplatesPreviewProps = {
  swiperRef: MutableRefObject<SwiperType | undefined>;
  userData: Doc<"users">;
  layout: Layout;
  editSection: { section: string; combo: number };
  layoutTemplate: JSX.Element;
  cart: ItemCart[];
};

export type TemplateBtnsOptionsProps = {
  t: Doc<"templates">;
  i: number;
  isHovered: boolean;
  templateHovered: number | null;
  onActiveTemplate: (template: Doc<"templates">, isActive: boolean) => void;
  isPremium: boolean;
  activesTemplates: Doc<"templates">[];
};
