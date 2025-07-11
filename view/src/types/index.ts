import { CSSProperties, DetailedHTMLProps, VideoHTMLAttributes } from "react";
import { Doc, Id } from "../../convex/_generated/dataModel";

type Items = {
  name: string;
  price: string | null;
  id: string;
  itemImage: {
    localImg?: string;
    uploadImgUrl: string;
    storageId: Id<"_storage"> | string;
  };
};

export type Sections = {
  id?: string;
  name: string;
  label: string;
  items: Items[];
};

type Combos = {
  title: string;
  description: string;
  imgUrl: { url: string; storageId: Id<"_storage"> | string }[];
  price: number | null;
  id: string;
};

type Contact = {
  id?: number;
  title: string;
  url: string;
  enabled: boolean;
};

type Header = {
  imgUrl: string;
  title: string;
};

type PaymentMethods = {
  label: string;
  active: boolean;
  comments?: string;
};

type DeliverMethods = {
  label: string;
  active: boolean;
  comments?: string;
};

type ItemCart = {
  label: string;
  price: number;
  quantity: number;
  category: string;
};

export type Template = {
  header: Header;
  sections: Sections[];
  combos: Combos[];
  contact: Contact[];
  layout: {
    bgColor: string;
    textsColor: string;
  };
  paymentMethods: PaymentMethods[];
  deliverMethods: DeliverMethods[];
  cart: ItemCart[];
};

export type Widget = {
  type: string;
  title: string;
  enabled: boolean;
  widgetHandler: string;
  id: string;
  data?: WidgetData;
};

export type ResizableItem = {
  id: number;
  size: number;
  img?: {
    localImg?: string;
    uploadImgUrl: string;
    storageId: Id<"_storage"> | string;
  };
  value?: string;
  textColor?: string;
  textAlign?: string;
  bgColor?: string;
  url?: string;
};

type WidgetData = {
  value?: string;
  url?: string;
  resizables?: ResizableItem[];
  textColor?: string;
  textAlign?: string;
  container?: {
    bgColor?: string;
    shadow?: string;
    border?: {
      type?: string;
      rounded?: string;
      color?: string;
      width?: string;
    };
  };
  img?: {
    localImg?: string;
    uploadImgUrl?: string;
    storageId?: Id<"_storage"> | string;
  };
};

export type BgVideoPlayerProps = {
  src: string;
  videoProps?: DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >;
  className?: string;
  style?: CSSProperties;
};

export type ReactiveTemplateProps = {
  user: string;
  component: string;
  test?: boolean;
};

export type MainPageProps = {
  params: { user: string; path?: string[] };
  searchParams: { [key: string]: string };
};

export type TemplateProps = {
  template: Doc<"templates">;
  userData: Doc<"users">;
};

export type ClassicViewProps = TemplateProps;

export type ContentResizeWidgetProps = {
  value?: string;
  image?: string;
  textColor?: string;
  placeholder?: string;
  textAlign?: string;
};
