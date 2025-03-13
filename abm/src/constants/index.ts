import { LayoutFeatures } from "@/interfaces";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSnapchat,
  IconBrandTiktok,
  IconBrandX,
  IconBuildingStore,
  IconMail,
  IconMotorbike,
} from "@tabler/icons-react";
import { VerificationStatus } from "@clerk/types/dist/index";

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
  "resizableWidget",
  "textWidget",
  "imgWidget",
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

export const statusClerk: { [key in VerificationStatus]: string } = {
  unverified: "No verificado",
  verified: "Verificado",
  transferable: "Transferible",
  failed: "Fallido",
  expired: "Expirado",
};

export const days: { [key: number]: string } = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miercoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

export const validWidgetsTypes = [
  "header",
  "combo",
  "social",
  "link",
  "img",
  "resizable",
];

export const validCombos = ["combo 1", "combo 2", "combo 3", "combo 4"];

export const icons = [
  {
    icon: IconBrandInstagram,
    name: "instagram",
  },
  {
    icon: IconBrandFacebook,
    name: "fecebook",
  },
  {
    icon: IconBrandX,
    name: "x",
  },
  {
    icon: IconBrandSnapchat,
    name: "snapchat",
  },
  {
    icon: IconBrandTiktok,
    name: "tiktok",
  },
  {
    icon: IconMail,
    name: "mail",
  },
];
