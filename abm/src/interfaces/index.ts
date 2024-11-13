import {
  Contact,
  DeliverMethods,
  Layout,
  PaymentMethods,
  Widget,
} from "@/stores/data-store";
import { Doc } from "../../convex/_generated/dataModel";
import { MutableRefObject } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { IColor } from "react-color-palette";

export interface SectionsProps {}

export type InputCardProps = {
  type: string;
  openType: string;
  title: string;
  description: string;
  handleAccept: (data: any) => Promise<any>;
  textButton: string;
  inputValue?: string;
};

export type GenericInputProps = {
  type: string;
  title: string;
  description: string;
  handleAccept: (data: any) => Promise<any>;
  inputValue?: string;
  setOpen: (data: boolean) => void;
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
  type: keyof Layout;
  color: IColor;
  onChange: (color: IColor, type: string) => void;
};
