import { LayoutFeatures } from "@/interfaces";
import { IconBuildingStore, IconMotorbike } from "@tabler/icons-react";

export const paymentMethodsLabel = [
  "Efectivo",
  "Debito",
  "Credito",
  "Transferencia",
  "Crypto",
];

export const deliverMethodsLabel = [
  { label: "Retiro", icon: IconBuildingStore },
  { label: "Delivery", icon: IconMotorbike },
];

export const combosArr = Array.from({ length: 4 }, () => "");

export const estaticTemplates = [
  "contact",
  "paymentMethods",
  "deliverMethods",
  "linkWidget",
];

export const helperTexts: { [key: string]: string } = {
  username: "Sin espacios",
};

export const layoutCardsTexts = {
  ctaText: "Usar diseño",
  ctaLink: "/build",
};

export const layoutFeatures: {
  [key: string]: LayoutFeatures;
} = {
  classic: {
    name: "classic",
    tabs: [
      {
        title: "Inicio",
        value: "0",
      },
      {
        title: "Confirmacion",
        value: "1",
      },
    ],
    widgets: false,
  },
  empty: {
    name: "empty",
    tabs: [],
    widgets: true,
  },
};
