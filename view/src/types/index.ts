import { Id } from "../../convex/_generated/dataModel";

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

export type resizableItem = {
  id: number;
  size: number;
  img?: {
    localImg?: string;
    uploadImgUrl: string;
    storageId: Id<"_storage"> | string;
  };
  value?: string;
  textColor?: string;
  url?: string;
};

type WidgetData = {
  value?: string;
  url?: string;
  resizables?: resizableItem[];
  textColor?: string;
  img?: {
    localImg?: string;
    uploadImgUrl?: string;
    storageId?: Id<"_storage"> | string;
  };
};
